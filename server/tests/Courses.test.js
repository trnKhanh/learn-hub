const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let tutor_id;
let tutor_token;
let u_tutor_id;
let u_tutor_token;
let course_admin_id;
let course_admin_token;
let course_id;
beforeAll(async () => {
  try {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "tutor",
        password: "Learnhub123!",
        email: "tutor@gmail.com"
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    tutor_id = res.body.user_id;
    tutor_token = res.body.accessToken;
    await sql.query("INSERT INTO tutors SET id=?, verified=1", [tutor_id]);

    res = await request(app)
      .post("/signup")
      .send({
        username: "u_tutor",
        password: "Learnhub123!",
        email: "u_tutor@gmail.com"
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    u_tutor_id = res.body.user_id;
    u_tutor_token = res.body.accessToken;
    await sql.query("INSERT INTO tutors SET id=?, verified=0", [u_tutor_id]);
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
        email: "courseadmin@gmail.com"
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
});

afterAll(async () => {
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["tutor"]);
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["u_tutor"]);
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["course_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /courses", () => {
  it("Create course by course admin", async () => {
    const accessToken = await getAccessToken("course_admin", "Learnhub123!");

    let res = await request(app)
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(201);
    expect(res.body.course.name).toBe("test_course");
    expect(res.body.course.description).toBe("This is testing");
    expect(res.body.course.difficulty).toBe("BEGINNER");
    expect(res.body.course.duration).toBe(100);
    expect(res.body.course.owner_id).toBe(tutor_id);
    expect(res.body.course.price).toBe(200);
    expect(res.body.course.discount).toBe(null);
    course_id = res.body.course.id;
  });
});

describe("POST /courses", () => {
  it("Create course by course_admin (duplicate)", async () => {
    const accessToken = await getAccessToken("course_admin", "Learnhub123!");

    let res = await request(app)
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(409);
  });
});

describe("POST /courses", () => {
  it("Create course by course admin, assigned course to unverified tutor", async () => {
    const accessToken = await getAccessToken("course_admin", "Learnhub123!");

    let res = await request(app)
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: u_tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(422);
  });
});

describe("POST /courses", () => {
  it("Create course not by course_admin", async () => {
    const accessToken = await getAccessToken("admin", "Learnhub123!");

    let res = await request(app)
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(401);
  });
});

describe("DELETE /courses/:id", () => {
  it("Delete course by id (admin)", async () => {
    const accessToken = await getAccessToken("course_admin", "Learnhub123!");

    let res = await request(app)
      .delete(`/courses/${course_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
  });
});

describe("POST /courses", () => {
  it("Create course by verified tutor", async () => {
    let res = await request(app)
      .post("/courses")
      .send({
        name: "tutor_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(201);
    expect(res.body.course.name).toBe("tutor_course");
    expect(res.body.course.description).toBe("This is testing");
    expect(res.body.course.difficulty).toBe("BEGINNER");
    expect(res.body.course.duration).toBe(100);
    expect(res.body.course.owner_id).toBe(tutor_id);
    expect(res.body.course.price).toBe(200);
    expect(res.body.course.discount).toBe(null);
    course_id = res.body.course.id;
  });
});

describe("POST /courses", () => {
  it("Create course by verified tutor (duplicate)", async () => {
    let res = await request(app)
      .post("/courses")
      .send({
        name: "tutor_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(409);
  });
});

describe("POST /courses", () => {
  it("Create course by unverified tutor", async () => {
    let res = await request(app)
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", u_tutor_id);

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /courses/:id", () => {
  it("Get course by id", async () => {
    let res = await request(app).get(`/courses/${course_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.course.name).toBe("tutor_course");
    expect(res.body.course.description).toBe("This is testing");
    expect(res.body.course.difficulty).toBe("BEGINNER");
    expect(res.body.course.duration).toBe(100);
    expect(res.body.course.owner_id).toBe(tutor_id);
    expect(res.body.course.price).toBe(200);
    expect(res.body.course.discount).toBe(null);
  });
});

describe("GET /courses/:id", () => {
  it("Get course by unknown id", async () => {
    let res = await request(app).get(`/courses/12312321`);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /courses", () => {
  it("Get all courses", async () => {
    let res = await request(app).get(`/courses`);

    expect(res.statusCode).toBe(200);
    expect(res.body.courses).toBeInstanceOf(Array);
  });
});

describe("PATCH /courses/:id", () => {
  it("Update course by id", async () => {
    let res = await request(app)
      .patch(`/courses/${course_id}`)
      .send({
        price: 250,
        discount: 0.2,
      })
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(200);
    expect(res.body.courses[0].name).toBe("tutor_course");
    expect(res.body.courses[0].description).toBe("This is testing");
    expect(res.body.courses[0].difficulty).toBe("BEGINNER");
    expect(res.body.courses[0].duration).toBe(100);
    expect(res.body.courses[0].owner_id).toBe(tutor_id);
    expect(res.body.courses[0].price).toBe(250);
    expect(res.body.courses[0].discount).toBe(0.2);
  });
});

describe("PATCH /courses/:id", () => {
  it("Update course not by owner", async () => {
    let res = await request(app)
      .patch(`/courses/${course_id}`)
      .send({
        price: 250,
        discount: 0.2,
      })
      .set("accessToken", u_tutor_token);

    expect(res.statusCode).toBe(401);
  });
});
describe("PATCH /courses/:id", () => {
  it("Update course with unknown fields", async () => {
    let res = await request(app)
      .patch(`/courses/${course_id}`)
      .send({
        abc: 1,
      })
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(400);
  });
});

describe("PATCH /courses/:id", () => {
  it("Update course by unknown id", async () => {
    let res = await request(app)
      .patch(`/courses/123111111`)
      .send({
        price: 200,
      })
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /courses/:id", () => {
  it("Delete course not by owner", async () => {
    let res = await request(app)
      .delete(`/courses/${course_id}`)
      .set("accessToken", u_tutor_token);

    expect(res.statusCode).toBe(401);
  });
});
describe("DELETE /courses/:id", () => {
  it("Delete course by id", async () => {
    let res = await request(app)
      .delete(`/courses/${course_id}`)
      .set("accessToken", tutor_token);

    expect(res.statusCode).toBe(200);
    expect(res.body.courses[0].name).toBe("tutor_course");
    expect(res.body.courses[0].description).toBe("This is testing");
    expect(res.body.courses[0].difficulty).toBe("BEGINNER");
    expect(res.body.courses[0].duration).toBe(100);
    expect(res.body.courses[0].owner_id).toBe(tutor_id);
    expect(res.body.courses[0].price).toBe(250);
    expect(res.body.courses[0].discount).toBe(0.2);
  });
});

describe("DELETE /courses/:id", () => {
  it("Delete course by unknown id", async () => {
    const accessToken = await getAccessToken("course_admin", "Learnhub123!");

    let res = await request(app)
      .delete(`/courses/${tutor_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
