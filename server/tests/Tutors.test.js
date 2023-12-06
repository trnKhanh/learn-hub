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

describe("POST /tutors", () => {
  it("Create tutor to unknown admin", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .post("/tutors")
      .send({
        id: user_id,
        verified: 1,
        admin_id: user_id,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(422);
  });
});

describe("POST /tutors", () => {
  it("Create tutor not by tutor_admin", async () => {
    const accessToken = await getAccessToken("admin", "admin");

    let res = await request(app)
      .post("/tutors")
      .send({
        id: user_id,
        verified: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(401);
  });
});

describe("POST /tutors", () => {
  it("Create tutor by tutor_admin", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .post("/tutors")
      .send({
        id: user_id,
        verified: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(201);
    expect(res.body.tutor.verified).toBe(1);
    expect(res.body.tutor.profit).toBe(0);
  });
});

describe("POST /tutors", () => {
  it("Create tutor by tutor_admin (duplicate)", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .post("/tutors")
      .send({
        id: user_id,
        verified: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(409);
  });
});
describe("GET /tutors/:id", () => {
  it("Get tutor by id", async () => {
    let res = await request(app).get(`/tutors/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutor.id).toBe(user_id);
    expect(res.body.tutor.verified).toBe(1);
    expect(res.body.tutor.profit).toBe(0);
  });
});

describe("GET /tutors/:id", () => {
  it("Get tutor by unknown id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .get(`/tutors/111111111`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /tutors", () => {
  it("Get all tutors", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app).get(`/tutors`).set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutors).toBeInstanceOf(Array);
  });
});

describe("PATCH /tutors/:id", () => {
  it("Update tutor by id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .patch(`/tutors/${user_id}`)
      .send({
        verified: 0,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutors[0].verified).toBe(0);
  });
});

describe("PATCH /tutors/:id", () => {
  it("Update tutor with invalid fields", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .patch(`/tutors/${user_id}`)
      .send({
        abc: 0,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(400);
  });
});
describe("PATCH /tutors/:id", () => {
  it("Update tutor by unknown id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .patch(`/tutors/11111123`)
      .send({
        verified: 1,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
describe("PATCH /tutors/:id", () => {
  it("Update tutor to unknown admin", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .patch(`/tutors/${user_id}`)
      .send({
        verified: 1,
        admin_id: user_id,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(422);
  });
});

describe("DELETE /tutors/:id", () => {
  it("Delete tutor by id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .delete(`/tutors/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /tutors/:id", () => {
  it("Delete tutor by unknown id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "tutor_admin");

    let res = await request(app)
      .delete(`/tutors/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
