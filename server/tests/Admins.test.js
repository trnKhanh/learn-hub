const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const sql = require("../database/db");

const user_agent = request.agent(app);
const root_agent = request.agent(app);
const admin_agent = request.agent(app);

let user_id;
let root_id;
let admin_id;

beforeAll(async () => {
  try {
    const res = await user_agent.post("/signup").send({
      username: "test",
      password: "Learnhub123!",
      email: "test@gmail.com",
    });
    expect(res.body.user_id).toBeDefined();
    user_id = res.body.user_id;
  } catch (err) {
    console.log(err);
  }
  try {
    const res = await admin_agent.post("/signup").send({
      username: "admin",
      password: "Learnhub123!",
      email: "admin@gmail.com",
    });
    expect(res.body.user_id).toBeDefined();
    admin_id = res.body.user_id;
    await sql.query("INSERT INTO admins SET id=?", [admin_id]);
  } catch (err) {
    console.log(err);
  }

  try {
    const res = await root_agent.post("/signup").send({
      username: "root",
      password: "Learnhub123!",
      email: "root@gmail.com",
    });
    expect(res.body.user_id).toBeDefined();
    root_id = res.body.user_id;

    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=1, tutors_access=1, students_access=1, supporters_access=1",
      [root_id],
    );
  } catch (err) {
    console.log(err);
  }
  expect(user_id).toBeDefined();
  expect(root_id).toBeDefined();
  expect(admin_id).toBeDefined();
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
    await sql.query("DELETE FROM users WHERE username=?", ["root"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /admins", () => {
  it("Create admin by root", async () => {
    let res = await root_agent
      .post("/admins")
      .send({
        id: user_id,
        tutors_access: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.admin.tutors_access).toBe(1);
    expect(res.body.admin.students_access).toBe(0);
    expect(res.body.admin.courses_access).toBe(0);
  });
  it("Create admin by root (duplicate)", async () => {
    let res = await root_agent
      .post("/admins")
      .send({
        id: user_id,
        tutors_access: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(409);
  });
  it("Create admin not by root", async () => {
    let res = await admin_agent
      .post("/admins")
      .send({
        id: user_id,
        tutors_access: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /admins/:id", () => {
  it("Get admin by id", async () => {
    let res = await root_agent.get(`/admins/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.admin.id).toBe(user_id);
    expect(res.body.admin.tutors_access).toBe(1);
    expect(res.body.admin.students_access).toBe(0);
    expect(res.body.admin.courses_access).toBe(0);
  });
  it("Get admin by unknown id", async () => {
    let res = await root_agent.get(`/admins/12312321`);

    expect(res.statusCode).toBe(404);
  });
  it("Get admin not by root", async () => {
    let res = await admin_agent.get(`/admins/${user_id}`);

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /admins", () => {
  it("Get all admins", async () => {
    let res = await root_agent.get(`/admins`);

    expect(res.statusCode).toBe(200);
    expect(res.body.admins).toBeInstanceOf(Array);
  });
  it("Get all admins not by root", async () => {
    let res = await admin_agent.get(`/admins`);

    expect(res.statusCode).toBe(401);
  });
});

describe("PATCH /admins/:id", () => {
  it("Update admin by id", async () => {
    let res = await root_agent.patch(`/admins/${user_id}`).send({
      courses_access: 1,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.admins[0].courses_access).toBe(1);
  });
  it("Update admin with unknown fields", async () => {
    let res = await root_agent.patch(`/admins/${user_id}`).send({
      abc: 1,
    });

    expect(res.statusCode).toBe(400);
  });
  it("Update admin by unknown id", async () => {
    let res = await root_agent.patch(`/admins/123111111`).send({
      courses_access: 1,
    });

    expect(res.statusCode).toBe(404);
  });
  it("Update admin not by root", async () => {
    let res = await admin_agent.patch(`/admins/123111111`).send({
      courses_access: 1,
    });

    expect(res.statusCode).toBe(401);
  });
});

describe("DELETE /admins/:id", () => {
  it("Delete admin by id not by root", async () => {
    let res = await admin_agent.delete(`/admins/${user_id}`);

    expect(res.statusCode).toBe(401);
  });
  it("Delete admin by id", async () => {
    let res = await root_agent.delete(`/admins/${user_id}`);

    expect(res.statusCode).toBe(200);
  });
  it("Delete admin by unknown id", async () => {
    let res = await root_agent.delete(`/admins/${user_id}`);

    expect(res.statusCode).toBe(404);
  });
});
