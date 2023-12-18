const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let admin_id;
let supporter_admin_id;

const user_agent = request.agent(app);
const admin_agent = request.agent(app);
const supporter_admin_agent = request.agent(app);

beforeAll(async () => {
  try {
    let res = await user_agent
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
    let res = await supporter_admin_agent
      .post("/signup")
      .send({
        username: "supporter_admin",
        password: "Learnhub123!",
        email: "supporteradmin@gmai.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.body.user_id).toBeDefined();
    supporter_admin_id = res.body.user_id;
    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=0, tutors_access=0, students_access=0, supporters_access=1",
      [supporter_admin_id],
    );
  } catch (err) {
    console.log(err);
  }

  expect(user_id).toBeDefined();
  expect(admin_id).toBeDefined();
  expect(supporter_admin_id).toBeDefined();
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
    await sql.query("DELETE FROM users WHERE username=?", ["supporter_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /supporters", () => {
  it("Create supporter to unknown role", async () => {
    let res = await supporter_admin_agent
      .post("/supporters")
      .send({
        id: user_id,
        role: "ABC",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(422);
  });
  it("Create supporter not by supporter_admin", async () => {
    let res = await admin_agent
      .post("/supporters")
      .send({
        id: user_id,
        role: "SOCIAL",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
  });
  it("Create supporter by supporter_admin", async () => {
    let res = await supporter_admin_agent
      .post("/supporters")
      .send({
        id: user_id,
        role: "SOCIAL",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.supporter.role).toBe("SOCIAL");
  });
  it("Create supporter by supporter_admin (duplicate)", async () => {
    let res = await supporter_admin_agent
      .post("/supporters")
      .send({
        id: user_id,
        role: "SOCIAL",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(409);
  });
});

describe("GET /supporters/:id", () => {
  it("Get supporter by id not by supporter_admin", async () => {
    let res = await request(app).get(`/supporters/${user_id}`);

    expect(res.statusCode).toBe(401);
  });
  it("Get supporter by unknown id", async () => {
    let res = await supporter_admin_agent.get(`/supporters/111111111`);

    expect(res.statusCode).toBe(404);
  });
  it("Get supporter by id", async () => {
    let res = await supporter_admin_agent
      .get(`/supporters/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.supporter.role).toBe("SOCIAL");
  });
});

describe("GET /supporters", () => {
  it("Get all supporters not by supporter_admin", async () => {
    let res = await request(app).get(`/supporters`);

    expect(res.statusCode).toBe(401);
  });
  it("Get all supporters", async () => {
    let res = await supporter_admin_agent.get(`/supporters`);

    expect(res.statusCode).toBe(200);
    expect(res.body.supporters).toBeInstanceOf(Array);
  });
});

describe("PATCH /supporters/:id", () => {
  it("Update supporter by id", async () => {
    let res = await supporter_admin_agent
      .patch(`/supporters/${user_id}`)
      .send({
        role: "TECHNICAL",
      })

    expect(res.statusCode).toBe(200);
    expect(res.body.supporters[0].role).toBe("TECHNICAL");
  });
  it("Update supporter with invalid fields", async () => {
    let res = await supporter_admin_agent
      .patch(`/supporters/${user_id}`)
      .send({
        abc: 0,
      })

    expect(res.statusCode).toBe(400);
  });
  it("Update supporter by unknown id", async () => {
    let res = await supporter_admin_agent
      .patch(`/supporters/11111123`)
      .send({
        role: "TECHNICAL",
      })

    expect(res.statusCode).toBe(404);
  });
  it("Update supporter to unknown role", async () => {
    let res = await supporter_admin_agent
      .patch(`/supporters/${user_id}`)
      .send({
        role: "FREE",
      })

    expect(res.statusCode).toBe(422);
  });
});

describe("DELETE /supporters/:id", () => {
  it("Delete supporter not by supporter_admin", async () => {
    let res = await user_agent
      .delete(`/supporters/${user_id}`)

    expect(res.statusCode).toBe(401);
  });
  it("Delete supporter by id", async () => {
    let res = await supporter_admin_agent
      .delete(`/supporters/${user_id}`)

    expect(res.statusCode).toBe(200);
  });
  it("Delete supporter by unknown id", async () => {
    let res = await supporter_admin_agent
      .delete(`/supporters/${user_id}`)

    expect(res.statusCode).toBe(404);
  });
});
