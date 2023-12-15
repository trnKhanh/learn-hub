const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let token;
let student_admin_id;
let student_admin_token;
beforeAll(async () => {
  let res = await request(app)
    .post("/signup")
    .send({
      username: "test",
      password: "Learnhub123!",
      email: "test@gmai.com",
    })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  user_id = res.body.user_id;
  token = res.body.accessToken;
  await createAdmin();
  try {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "student_admin",
        password: "Learnhub123!",
        email: "studentadmin@gmai.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    student_admin_id = res.body.user_id;
    student_admin_token = res.body.accessToken;
    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=0, tutors_access=0, students_access=1, supporters_access=0",
      [student_admin_id],
    );
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  let res = await request(app).delete("/users").set("accessToken", token);
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["student_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /students", () => {
  it("User applies to be a student", async () => {
    let res = await request(app)
      .post("/students")
      .send({
        membership: "GOLD",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.student.membership).toBe(null);
  });
});

describe("POST /students", () => {
  it("Student applies to be a student (duplicate)", async () => {
    let res = await request(app)
      .post("/students")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", token);

    expect(res.statusCode).toBe(409);
  });
});

describe("GET /students/:id", () => {
  it("Get student by id", async () => {
    let res = await request(app).get(`/students/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.student.membership).toBe(null);
  });
});

describe("GET /students/:id", () => {
  it("Get student by unknown id", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .get(`/students/111111111`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /students", () => {
  it("Get all students", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .get(`/students`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.students).toBeInstanceOf(Array);
  });
});

describe("PATCH /students/:id", () => {
  it("Update student by themselves", async () => {
    const accessToken = await getAccessToken("test", "Learnhub123!");

    let res = await request(app)
      .patch(`/students/${user_id}`)
      .send({
        membership: "GOLD",
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(401);
  });
});

describe("PATCH /students/:id", () => {
  it("Update student by id", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .patch(`/students/${user_id}`)
      .send({
        membership: "GOLD",
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.students[0].membership).toBe("GOLD");
  });
});

describe("PATCH /students/:id", () => {
  it("Update student with invalid fields", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .patch(`/students/${user_id}`)
      .send({
        abc: 0,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(400);
  });
});
describe("PATCH /students/:id", () => {
  it("Update student by unknown id", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .patch(`/students/11111123`)
      .send({
        membership: "GOLD",
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
describe("PATCH /students/:id", () => {
  it("Update student to unknown membership", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .patch(`/students/${user_id}`)
      .send({
        membership: "DIAMOND",
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(422);
  });
});
describe("GET /students/:id", () => {
  it("Get student by id after admin change membership", async () => {
    let res = await request(app).get(`/students/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.student.id).toBe(user_id);
    expect(res.body.student.membership).toBe("GOLD");
  });
});

describe("DELETE /students/:id", () => {
  it("Delete student by id", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .delete(`/students/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /students/:id", () => {
  it("Delete student by unknown id", async () => {
    const accessToken = await getAccessToken("student_admin", "Learnhub123!");

    let res = await request(app)
      .delete(`/students/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
