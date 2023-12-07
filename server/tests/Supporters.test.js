const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let token;
let supporter_admin_id;
let supporter_admin_token;
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
  await createAdmin();
  try {
    let res = await request(app)
      .post("/signup")
      .send({
        username: "supporter_admin",
        password: "supporter_admin",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    supporter_admin_id = res.body.user_id;
    supporter_admin_token = res.body.accessToken;

    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=0, tutors_access=0, students_access=0, supporters_access=1",
      [supporter_admin_id],
    );
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  let res = await request(app).delete("/users").set("accessToken", token);
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["supporter_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /supporters", () => {
  it("Create supporter to unknown role", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .post("/supporters")
      .send({
        id: user_id,
        role: "ABC",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(400);
  });
});

describe("POST /supporters", () => {
  it("Create supporter not by supporter_admin", async () => {
    const accessToken = await getAccessToken("admin", "admin");

    let res = await request(app)
      .post("/supporters")
      .send({
        id: user_id,
        role: "SOCIAL",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(401);
  });
});

describe("POST /supporters", () => {
  it("Create supporter by supporter_admin", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .post("/supporters")
      .send({
        id: user_id,
        role: "SOCIAL",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(201);
    expect(res.body.supporter.role).toBe("SOCIAL");
  });
});

describe("POST /supporters", () => {
  it("Create supporter by supporter_admin (duplicate)", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .post("/supporters")
      .send({
        id: user_id,
        role: "SOCIAL",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(409);
  });
});
describe("GET /supporters/:id", () => {
  it("Get supporter by id", async () => {
    let res = await request(app).get(`/supporters/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.supporter.id).toBe(user_id);
    expect(res.body.supporter.role).toBe("SOCIAL");
  });
});

describe("GET /supporters/:id", () => {
  it("Get supporter by unknown id", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .get(`/supporters/111111111`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /supporters", () => {
  it("Get all supporters", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .get(`/supporters`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.supporters).toBeInstanceOf(Array);
  });
});

describe("PATCH /supporters/:id", () => {
  it("Update supporter by id", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .patch(`/supporters/${user_id}`)
      .send({
        role: "TECHNICAL",
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.supporters[0].role).toBe("TECHNICAL");
  });
});

describe("PATCH /supporters/:id", () => {
  it("Update supporter with invalid fields", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .patch(`/supporters/${user_id}`)
      .send({
        abc: 0,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(400);
  });
});
describe("PATCH /supporters/:id", () => {
  it("Update supporter by unknown id", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .patch(`/supporters/11111123`)
      .send({
        role: "TECHNICAL",
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
describe("PATCH /supporters/:id", () => {
  it("Update supporter to unknown role", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .patch(`/supporters/${user_id}`)
      .send({
        role: "FREE",
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /supporters/:id", () => {
  it("Delete supporter by id", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .delete(`/supporters/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /supporters/:id", () => {
  it("Delete supporter by unknown id", async () => {
    const accessToken = await getAccessToken(
      "supporter_admin",
      "supporter_admin",
    );

    let res = await request(app)
      .delete(`/supporters/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
