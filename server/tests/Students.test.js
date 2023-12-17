const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let admin_id;
let student_admin_id;

const user_agent = request.agent(app);
const admin_agent = request.agent(app);
const student_admin_agent = request.agent(app);
beforeAll(async () => {
  try {
    const res = await user_agent
      .post("/signup")
      .send({
        username: "test",
        password: "Learnhub123!",
        email: "test@gmai.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.body.user_id).toBeDefined();
    user_id = res.body.user_id;
  } catch (err) {
    console.log(err);
  }

  try {
    let res = await admin_agent
      .post("/signup")
      .send({
        username: "admin",
        password: "Learnhub123!",
        email: "admin@gmail.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.body.user_id).toBeDefined();
    admin_id = res.body.user_id;
    await sql.query("INSERT INTO admins SET id=?", [admin_id]);
  } catch (err) {
    console.log(err);
  }

  try {
    let res = await student_admin_agent
      .post("/signup")
      .send({
        username: "student_admin",
        password: "Learnhub123!",
        email: "studentadmin@gmai.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.body.user_id).toBeDefined();
    student_admin_id = res.body.user_id;
    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=0, tutors_access=0, students_access=1, supporters_access=0",
      [student_admin_id],
    );
  } catch (err) {
    console.log(err);
  }

  expect(user_id).toBeDefined();
  expect(admin_id).toBeDefined();
  expect(student_admin_id).toBeDefined();
});

afterAll(async () => {
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["test"]);
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["admin"]);
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["student_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /students", () => {
  it("User applies to be a student", async () => {
    let res = await user_agent
      .post("/students")
      .send({
        membership: "GOLD",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.student.membership).toBe(null);
  });
  it("Student applies to be a student (duplicate)", async () => {
    let res = await user_agent
      .post("/students")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(409);
  });
});

describe("GET /students/:id", () => {
  it("Get student by id", async () => {
    let res = await request(app).get(`/students/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.student.membership).toBe(null);
  });
  it("Get student by unknown id", async () => {
    let res = await request(app).get(`/students/111111111`);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /students", () => {
  it("Get all students", async () => {
    let res = await request(app).get(`/students`);

    expect(res.statusCode).toBe(200);
    expect(res.body.students).toBeInstanceOf(Array);
  });
});

describe("PATCH /students/:id", () => {
  it("Update student by themselves", async () => {
    let res = await user_agent.patch(`/students/${user_id}`).send({
      membership: "GOLD",
    });

    expect(res.statusCode).toBe(401);
  });
  it("Update student by id", async () => {
    let res = await student_admin_agent
      .patch(`/students/${user_id}`)
      .send({
        membership: "GOLD",
      })

    expect(res.statusCode).toBe(200);
    expect(res.body.students[0].membership).toBe("GOLD");
  });
  it("Update student with invalid fields", async () => {
    let res = await student_admin_agent
      .patch(`/students/${user_id}`)
      .send({
        abc: 0,
      })

    expect(res.statusCode).toBe(400);
  });
  it("Update student by unknown id", async () => {
    let res = await student_admin_agent
      .patch(`/students/11111123`)
      .send({
        membership: "GOLD",
      })

    expect(res.statusCode).toBe(404);
  });
  it("Update student to unknown membership", async () => {
    let res = await student_admin_agent
      .patch(`/students/${user_id}`)
      .send({
        membership: "DIAMOND",
      })

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
    let res = await student_admin_agent
      .delete(`/students/${user_id}`)

    expect(res.statusCode).toBe(200);
  });
  it("Delete student by unknown id", async () => {
    let res = await student_admin_agent
      .delete(`/students/${user_id}`)

    expect(res.statusCode).toBe(404);
  });
});
