const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let admin_id;
let tutor_admin_id;

const user_agent = request.agent(app);
const admin_agent = request.agent(app);
const tutor_admin_agent = request.agent(app);

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
    const res = await admin_agent
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
    const res = await tutor_admin_agent
      .post("/signup")
      .send({
        username: "tutor_admin",
        password: "Learnhub123!",
        email: "tutoradmin@gmai.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.body.user_id).toBeDefined();
    tutor_admin_id = res.body.user_id;
    await sql.query(
      "INSERT INTO admins SET id=?, courses_access=0, tutors_access=1, students_access=0, supporters_access=0",
      [tutor_admin_id],
    );
  } catch (err) {
    console.log(err);
  }

  expect(user_id).toBeDefined();
  expect(admin_id).toBeDefined();
  expect(tutor_admin_id).toBeDefined();
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
    await sql.query("DELETE FROM users WHERE username=?", ["tutor_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /tutors", () => {
  it("User applies to be a tutor", async () => {
    let res = await user_agent
      .post("/tutors")
      .send({
        verified: 1,
        admin_id: user_id,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.tutor.verified).toBe(0);
    expect(res.body.tutor.admin_id).toBe(null);
  });
  it("Tutor applies to be a tutor (duplicate)", async () => {
    let res = await user_agent
      .post("/tutors")
      .send({
        verified: 1,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

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
  it("Get tutor by unknown id", async () => {
    let res = await request(app).get(`/tutors/111111111`);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /tutors", () => {
  it("Get all tutors", async () => {
    let res = await request(app).get(`/tutors`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutors).toBeInstanceOf(Array);
  });
});

describe("PATCH /tutors/:id", () => {
  it("Update tutor by themselves", async () => {
    let res = await user_agent.patch(`/tutors/${user_id}`).send({
      verified: 1,
    });

    expect(res.statusCode).toBe(401);
  });
  it("Update tutor by id", async () => {
    let res = await tutor_admin_agent
      .patch(`/tutors/${user_id}`)
      .send({
        verified: 1,
      })

    expect(res.statusCode).toBe(200);
    expect(res.body.tutors[0].verified).toBe(1);
  });
  it("Update tutor with invalid fields", async () => {
    let res = await tutor_admin_agent
      .patch(`/tutors/${user_id}`)
      .send({
        abc: 0,
      })

    expect(res.statusCode).toBe(400);
  });
  it("Update tutor by unknown id", async () => {
    let res = await tutor_admin_agent
      .patch(`/tutors/11111123`)
      .send({
        verified: 1,
      })

    expect(res.statusCode).toBe(404);
  });

  it("Update tutor to unknown admin", async () => {
    let res = await tutor_admin_agent
      .patch(`/tutors/${user_id}`)
      .send({
        verified: 1,
        admin_id: user_id,
      })

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
    let res = await tutor_admin_agent
      .delete(`/tutors/${user_id}`)

    expect(res.statusCode).toBe(200);
  });
  it("Delete tutor by unknown id", async () => {
    let res = await tutor_admin_agent
      .delete(`/tutors/${user_id}`)

    expect(res.statusCode).toBe(404);
  });
});
