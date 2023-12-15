const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const sql = require("../database/db");

let user_id, token, tutor_id, tutor_token, course_admin_id, course_admin_token;
let course_1_id, course_2_id;
beforeAll(async () => {
  try {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "test",
        password: "Learnhub123!",
        email: "test@gmail.com",
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
        password: "Learnhub123!",
        email: "tutor@gmail.com",
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
    await createAdmin();
    let res = await request(app)
      .post("/signup")
      .send({
        username: "course_admin",
        password: "Learnhub123!",
        email: "courseadmin@gmail.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    course_admin_id = res.body.user_id;
    course_admin_token = res.body.accessToken;
    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=1, tutors_access=0, students_access=0, supporters_access=0",
      [course_admin_id],
    );
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
    await sql.query("DELETE FROM users where username='course_admin'");
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users where username='admin'");
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
      .send({
        discounted: 0.2,
      })
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.payment.id).toBeDefined();
    expect(res.body.payment.paid_at).toBeDefined();
    expect(res.body.payment.student_id).toBe(user_id);
    expect(res.body.payment.discounted).toBe(0.2);
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
describe("POST /users/payments", () => {
  it("Pay with invalid discounted amount", async () => {
    const res = await request(app)
      .post("/users/payments")
      .send({
        discounted: 2,
      })
      .set("accessToken", token);

    expect(res.statusCode).toBe(422);
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
describe("POST /courses/:id/register", () => {
  it("Register to course 1", async () => {
    const res = await request(app)
      .post(`/courses/${course_1_id}/register`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(200);
  });
});
describe("POST /courses/:id/register", () => {
  it("Register to course 1 (duplicate)", async () => {
    const res = await request(app)
      .post(`/courses/${course_1_id}/register`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(409);
  });
});
describe("POST /courses/:id/register", () => {
  it("Register to course 1 not by student", async () => {
    const res = await request(app)
      .post(`/courses/${course_1_id}/register`)
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(401);
  });
});
describe("GET /courses/:id/progress", () => {
  it("Get course 1 progress", async () => {
    const res = await request(app)
      .get(`/courses/${course_1_id}/progress`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.progress).toBeDefined();
  });
});

describe("POST /courses/:course_id/financialAids/", () => {
  it("Create financial aid for course 1 wrong field", async () => {
    const res = await request(app)
      .post(`/courses/${course_1_id}/financialAids`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(422);
  });
});
describe("POST /courses/:course_id/financialAids/", () => {
  it("Create financial aid for course 1", async () => {
    const res = await request(app)
      .post(`/courses/${course_1_id}/financialAids`)
      .send({
        essay: "Please I am poor.",
        amount: 100,
      })
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.financialAid.essay).toBe("Please I am poor.");
    expect(res.body.financialAid.amount).toBe(100);
  });
});
describe("POST /courses/:course_id/financialAids/", () => {
  it("Create financial aid for course 1 (duplicate)", async () => {
    const res = await request(app)
      .post(`/courses/${course_1_id}/financialAids`)
      .send({
        essay: "Please I am poor.",
        amount: 100,
      })
      .set("accessToken", token);

    expect(res.statusCode).toBe(409);
  });
});
describe("GET /courses/:course_id/financialAids/", () => {
  it("Get all financial aids for course 1 by student", async () => {
    const res = await request(app)
      .get(`/courses/${course_1_id}/financialAids`)
      .set("accessToken", token);

    expect(res.statusCode).toBe(401);
  });
});
describe("GET /courses/:course_id/financialAids/", () => {
  it("Get all financial aids for course 1 by owner", async () => {
    const res = await request(app)
      .get(`/courses/${course_1_id}/financialAids`)
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(200);
    expect(res.body.financialAids).toBeInstanceOf(Array);
    expect(res.body.financialAids.length).toBe(1);
    expect(res.body.financialAids[0].essay).toBe("Please I am poor.");
    expect(res.body.financialAids[0].amount).toBe(100);
    expect(res.body.financialAids[0].status).toBe("PENDING");
  });
});
describe("GET /courses/:course_id/financialAids/", () => {
  it("Get all financial aids for course 1 by course admin", async () => {
    const res = await request(app)
      .get(`/courses/${course_1_id}/financialAids`)
      .set("accessToken", course_admin_token);

    expect(res.statusCode).toBe(200);
    expect(res.body.financialAids).toBeInstanceOf(Array);
    expect(res.body.financialAids.length).toBe(1);
    expect(res.body.financialAids[0].essay).toBe("Please I am poor.");
    expect(res.body.financialAids[0].amount).toBe(100);
    expect(res.body.financialAids[0].status).toBe("PENDING");
  });
});
describe("GET /courses/:course_id/financialAids/:student_id", () => {
  it("Get financial aids for course 1 sent by specific student by course admin", async () => {
    const res = await request(app)
      .get(`/courses/${course_1_id}/financialAids/${user_id}`)
      .set("accessToken", course_admin_token);

    expect(res.statusCode).toBe(200);
    expect(res.body.financialAid.essay).toBe("Please I am poor.");
    expect(res.body.financialAid.amount).toBe(100);
    expect(res.body.financialAid.status).toBe("PENDING");
  });
});
describe("PATCH /courses/:course_id/financialAids/:student_id", () => {
  it("Update financial aid status for course 1 by owner (before admin)", async () => {
    const res = await request(app)
      .patch(`/courses/${course_1_id}/financialAids/${user_id}`)
      .send({
        status: "PASSED",
      })
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(401);
  });
});
describe("PATCH /courses/:course_id/financialAids/:student_id", () => {
  it("Update financial aid status for course 1 by course admin", async () => {
    const res = await request(app)
      .patch(`/courses/${course_1_id}/financialAids/${user_id}`)
      .send({
        status: "PASSED",
      })
      .set("accessToken", course_admin_token);

    expect(res.statusCode).toBe(200);
    const [rows, fields] = await sql.query(
      `SELECT * FROM financial_aids WHERE course_id=? AND student_id=? AND status="ADMIN_PASSED"`,
      [course_1_id, user_id],
    );
    expect(rows.length).toBe(1);
  });
});
describe("PATCH /courses/:course_id/financialAids/:student_id", () => {
  it("Update financial aid status for course 1 by owner (after admin)", async () => {
    const res = await request(app)
      .patch(`/courses/${course_1_id}/financialAids/${user_id}`)
      .send({
        status: "PASSED",
      })
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(200);
    const [rows, fields] = await sql.query(
      `SELECT * FROM financial_aids WHERE course_id=? AND student_id=? AND status="TUTOR_PASSED"`,
      [course_1_id, user_id],
    );
    expect(rows.length).toBe(1);
  });
});
describe("POST /courses/:course_id/financialAids/", () => {
  it("Create financial aid for course 2", async () => {
    const res = await request(app)
      .post(`/courses/${course_2_id}/financialAids`)
      .send({
        essay: "Please I am poor.",
        amount: 100,
      })
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.financialAid.essay).toBe("Please I am poor.");
    expect(res.body.financialAid.amount).toBe(100);
  });
});
describe("PATCH /courses/:course_id/financialAids/:student_id", () => {
  it("Update financial aid status for course 2 by course admin (deny)", async () => {
    const res = await request(app)
      .patch(`/courses/${course_2_id}/financialAids/${user_id}`)
      .send({
        status: "DENIED",
      })
      .set("accessToken", course_admin_token);

    expect(res.statusCode).toBe(200);
    const [rows, fields] = await sql.query(
      `SELECT * FROM financial_aids WHERE course_id=? AND student_id=? AND status="ADMIN_DENIED"`,
      [course_2_id, user_id],
    );
    expect(rows.length).toBe(1);
  });
});
describe("PATCH /courses/:course_id/financialAids/:student_id", () => {
  it("Update financial aid status for course 2 by owner after admin denied", async () => {
    const res = await request(app)
      .patch(`/courses/${course_2_id}/financialAids/${user_id}`)
      .send({
        status: "DENIED",
      })
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(401);
  });
});
