const app = require("../app");
const request = require("supertest");
const { getAccessToken } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

afterAll(async () => {
  await sql.query("DELETE FROM users WHERE username='test'");
  await sql.end();
});
describe("POST /signup", () => {
  it("Sign up", async () => {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "test",
        password: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("test");
    expect(res.body.accessToken).toBeDefined();
  });
});

describe("POST /signup", () => {
  it("Sign up with existed username", async () => {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "test",
        password: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(409);
  });
});

describe("POST /login", () => {
  it("Log in", async () => {
    let res = await request(app)
      .post("/login")
      .send({
        username: "test",
        password: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("test");
    expect(res.body.accessToken).toBeDefined();
  });
});

describe("POST /login", () => {
  it("Log in with wrong password", async () => {
    let res = await request(app)
      .post("/login")
      .send({
        username: "test",
        password: "123456",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /users/:id", () => {
  it("Get user information by Id", async () => {
    let loginRes = await request(app)
      .post("/login")
      .send({
        username: "test",
        password: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    const user_id = loginRes.body.user_id;
    let res = await request(app)
      .get(`/users/${user_id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.password).not.toBeDefined();
    expect(res.body.user.username).toBe("test");
    expect(res.body.user.id).toBeDefined();
  });
});
describe("GET /users/:id", () => {
  it("Get user information by unknown Id", async () => {
    let res = await request(app)
      .get(`/users/112313131`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /users", () => {
  it("Get all users' information", async () => {
    let res = await request(app)
      .get(`/users`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    expect(res.statusCode).toBe(200);
    expect(res.body.users).toBeInstanceOf(Array);
  });
});

describe("PATCH /users", () => {
  it("Update user informations", async () => {
    const accessToken = await getAccessToken("test", "test");
    let res = await request(app)
      .patch("/users")
      .send({
        full_name: "test guy",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.users).toBeInstanceOf(Array);
    expect(res.body.users[0].full_name).toBe("test guy");
  });
});

describe("DELETE /users", () => {
  it("DELETE user", async () => {
    const accessToken = await getAccessToken("test", "test");
    let res = await request(app)
      .delete("/users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
  });
});

describe("POST /login", () => {
  it("Log in with unknown username", async () => {
    let res = await request(app)
      .post("/login")
      .send({
        username: "test",
        password: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(404);
  });
});
