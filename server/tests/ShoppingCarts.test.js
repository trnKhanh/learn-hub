const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const sql = require("../database/db");

let user_id, token, tutor_id, tutor_token;
let course_1_id, course_2_id;
beforeAll(async () => {
  try {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "test",
        password: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    user_id = res.body.user_id;
    token = res.body.accessToken;

    await request(app).post("/students").set("accessToken", token);
  } catch (err) {
    console.log(err);
  }

  try {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "tutor",
        password: "tutor",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    tutor_id = res.body.user_id;
    tutor_token = res.body.accessToken;
    await sql.query("INSERT INTO tutors SET id=?, verified=1", [tutor_id]);
  } catch (err) {
    console.log(err);
  }
  try {
    let [res, _] = await sql.query("INSERT INTO courses SET ?", {
      name: "Course 1",
      description: "ABC",
      difficulty: "BEGINNER",
      duration: 100,
      owner_id: tutor_id,
      price: 100,
    });
    course_1_id = res.insertId;
  } catch (err) {
    console.log(err);
  }
  try {
    let [res, _] = await sql.query("INSERT INTO courses SET ?", {
      name: "Course 2",
      description: "ABC",
      difficulty: "BEGINNER",
      duration: 100,
      owner_id: tutor_id,
      price: 100,
    });
    course_2_id = res.insertId;
  } catch (err) {
    console.log(err);
  }
  expect(user_id).toBeDefined();
  expect(tutor_id).toBeDefined();
  expect(course_1_id).toBeDefined();
  expect(course_2_id).toBeDefined();
});

afterAll(async () => {
  try {
    await sql.query("DELETE FROM courses where name='Course 1'");
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM courses where name='Course 2'");
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users where username='tutor'");
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users where username='test'");
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /users/cart/:id", () => {
  it("Add course 1 to cart", async () => {
    const res = await request(app)
      .post(`/users/cart/${course_1_id}`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.shopping_cart.student_id).toBe(user_id);
    expect(res.body.shopping_cart.course_id).toBe(String(course_1_id));
  });
});

describe("POST /users/cart/:id", () => {
  it("Add course 2 to cart", async () => {
    const res = await request(app)
      .post(`/users/cart/${course_2_id}`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.shopping_cart.student_id).toBe(user_id);
    expect(res.body.shopping_cart.course_id).toBe(String(course_2_id));
  });
});

describe("POST /users/cart/:id", () => {
  it("Add course 2 to cart (not student)", async () => {
    const res = await request(app)
      .post(`/users/cart/${course_2_id}`)
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(401);
  });
});

describe("POST /users/cart/:id", () => {
  it("Add unknown course to cart", async () => {
    const res = await request(app)
      .post(`/users/cart/11111111`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /users/cart", () => {
  it("Get cart information", async () => {
    const res = await request(app).get(`/users/cart`).set("accessToken", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.course_ids).toBeInstanceOf(Array);
    expect(res.body.course_ids.length).toBe(2);
  });
});

describe("DELETE /users/cart/:id", () => {
  it("Delete one course", async () => {
    const res = await request(app)
      .delete(`/users/cart/${course_1_id}`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.course_ids[0].course_id).toBe(course_1_id);
  });
});

describe("DELETE /users/cart", () => {
  it("Delete all course", async () => {
    const res = await request(app)
      .delete(`/users/cart`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.course_ids[0].course_id).toBe(course_2_id);
  });
});

describe("POST /users/payments", () => {
  it("Pay 2 courses", async () => {
    await request(app)
      .post(`/users/cart/${course_1_id}`)
      .set("accessToken", token);
    await request(app)
      .post(`/users/cart/${course_2_id}`)
      .set("accessToken", token);

    const res = await request(app)
      .post("/users/payments")
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.payment.id).toBeDefined();
    expect(res.body.payment.paid_at).toBeDefined();
    expect(res.body.payment.student_id).toBe(user_id);
    expect(res.body.payment.courses).toBeInstanceOf(Array);
    expect(res.body.payment.courses.length).toBe(2);

    const [cart, _] = await sql.query(
      "SELECT * FROM shopping_carts WHERE student_id=?",
      [user_id],
    );
    expect(cart.length).toBe(0);
    const [paidCourses, __] = await sql.query(
      "SELECT * FROM payments_courses WHERE payment_id=?",
      [res.body.payment.id],
    );
    expect(paidCourses.length).toBe(2);
  });
});

describe("GET /users/payments", () => {
  it("Get all payments", async () => {
    const res = await request(app)
      .get("/users/payments")
      .set("accessToken", token);
    expect(res.statusCode).toBe(200);
    expect(res.body.payments).toBeInstanceOf(Array);

    let info_res = await request(app)
      .get(`/users/payments/${res.body.payments[0].id}`)
      .set("accessToken", token);
    expect(info_res.statusCode).toBe(200);
    expect(info_res.body.payment.courses.length).toBe(2);
    expect(info_res.body.payment.courses[0].price).toBeDefined();
    expect(info_res.body.payment.courses[0].discounted).toBeDefined();

    info_res = await request(app)
      .get(`/users/payments/${res.body.payments[0].id}`)
      .set("accessToken", tutor_token);
    expect(info_res.statusCode).toBe(401);
  });
});
describe("POST /users/cart/:id", () => {
  it("Add course 2 to cart", async () => {
    const res = await request(app)
      .post(`/users/cart/${course_2_id}`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(400);
  });
});
