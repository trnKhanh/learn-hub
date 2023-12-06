const app = require("../app");
const request = require("supertest");
const { getAccessToken } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let token;
beforeAll(async () => {
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
});

afterAll(async () => {
  let res = await request(app).delete("/users").set("accessToken", token);
  await sql.end();
});

describe("POST /admins", () => {
  it("Create admin by root", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .post("/admins")
      .send({
        id: user_id,
        tutors_access: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(201);
    expect(res.body.admin.tutors_access).toBe(1);
    expect(res.body.admin.students_access).toBe(0);
    expect(res.body.admin.courses_access).toBe(0);
  });
});

describe("POST /admins", () => {
  it("Create admin by root (duplicate)", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .post("/admins")
      .send({
        id: user_id,
        tutors_access: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(409);
  });
});

describe("POST /admins", () => {
  it("Create admin not by root", async () => {
    const accessToken = await getAccessToken("admin", "admin");

    let res = await request(app)
      .post("/admins")
      .send({
        id: user_id,
        tutors_access: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /admins/:id", () => {
  it("Get admin by id", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .get(`/admins/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.admin.id).toBe(user_id);
    expect(res.body.admin.tutors_access).toBe(1);
    expect(res.body.admin.students_access).toBe(0);
    expect(res.body.admin.courses_access).toBe(0);
  });
});

describe("GET /admins/:id", () => {
  it("Get admin by unknown id", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .get(`/admins/12312321`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /admins", () => {
  it("Get all admins", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app).get(`/admins`).set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.admins).toBeInstanceOf(Array);
  });
});

describe("PATCH /admins/:id", () => {
  it("Update admin by id", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .patch(`/admins/${user_id}`)
      .send({
        courses_access: 1,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.admins[0].courses_access).toBe(1);
  });
});

describe("PATCH /admins/:id", () => {
  it("Update admin with unknown fields", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .patch(`/admins/${user_id}`)
      .send({
        abc: 1,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(400);
  });
});

describe("PATCH /admins/:id", () => {
  it("Update admin by unknown id", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .patch(`/admins/123111111`)
      .send({
        courses_access: 1,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /admins/:id", () => {
  it("Delete admin by id", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .delete(`/admins/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /admins/:id", () => {
  it("Delete admin by unknown id", async () => {
    const accessToken = await getAccessToken("root", "root");

    let res = await request(app)
      .delete(`/admins/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});

