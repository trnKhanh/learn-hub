const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let token;
let tutor_admin_id;
let tutor_admin_token;
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
        username: "tutor_admin",
        password: "Learnhub123!",
        email: "tutoradmin@gmai.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    tutor_admin_id = res.body.user_id;
    tutor_admin_token = res.body.accessToken;
    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=0, tutors_access=1, students_access=0, supporters_access=0",
      [tutor_admin_id],
    );
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  let res = await request(app).delete("/users").set("accessToken", token);
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["tutor_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /tutors", () => {
  it("User applies to be a tutor", async () => {
    let res = await request(app)
      .post("/tutors")
      .send({
        verified: 1,
        admin_id: user_id,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", token);

    expect(res.statusCode).toBe(201);
    expect(res.body.tutor.verified).toBe(0);
    expect(res.body.tutor.admin_id).toBe(null);
  });
});

describe("POST /tutors", () => {
  it("Tutor applies to be a tutor (duplicate)", async () => {
    let res = await request(app)
      .post("/tutors")
      .send({
        verified: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", token);

    expect(res.statusCode).toBe(409);
  });
});

describe("GET /tutors/:id", () => {
  it("Get tutor by id", async () => {
    let res = await request(app).get(`/tutors/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutor.id).toBe(user_id);
    expect(res.body.tutor.verified).toBe(0);
    expect(res.body.tutor.profit).toBe(0);
  });
});

describe("GET /tutors/:id", () => {
  it("Get tutor by unknown id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

    let res = await request(app)
      .get(`/tutors/111111111`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /tutors", () => {
  it("Get all tutors", async () => {
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

    let res = await request(app).get(`/tutors`).set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutors).toBeInstanceOf(Array);
  });
});

describe("PATCH /tutors/:id", () => {
  it("Update tutor by themselves", async () => {
    const accessToken = await getAccessToken("test", "Learnhub123!");

    let res = await request(app)
      .patch(`/tutors/${user_id}`)
      .send({
        verified: 1,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(401);
  });
});

describe("PATCH /tutors/:id", () => {
  it("Update tutor by id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

    let res = await request(app)
      .patch(`/tutors/${user_id}`)
      .send({
        verified: 1,
      })
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutors[0].verified).toBe(1);
  });
});

describe("PATCH /tutors/:id", () => {
  it("Update tutor with invalid fields", async () => {
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

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
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

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
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

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
describe("GET /tutors/:id", () => {
  it("Get tutor by id after admin verified", async () => {
    let res = await request(app).get(`/tutors/${user_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutor.id).toBe(user_id);
    expect(res.body.tutor.verified).toBe(1);
    expect(res.body.tutor.profit).toBe(0);
  });
});

describe("DELETE /tutors/:id", () => {
  it("Delete tutor by id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

    let res = await request(app)
      .delete(`/tutors/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /tutors/:id", () => {
  it("Delete tutor by unknown id", async () => {
    const accessToken = await getAccessToken("tutor_admin", "Learnhub123!");

    let res = await request(app)
      .delete(`/tutors/${user_id}`)
      .set("accessToken", accessToken);

    expect(res.statusCode).toBe(404);
  });
});
