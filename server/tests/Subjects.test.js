const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let admin_id;
let subject_id;

const normalUser_agent = request.agent(app);
const admin_agent = request.agent(app);

beforeAll(async () => {
    try {
      let res = await normalUser_agent
        .post("/signup")
        .send({
          username: "hmduc",
          password: "@Duck12345",
          email: "hmd@gmail.com",
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
          password: "@Admin12345",
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
  
    expect(user_id).toBeDefined();
    expect(admin_id).toBeDefined();
});
  
afterAll(async () => {
    try {
        await sql.query("DELETE FROM users WHERE username=?", ["hmduc"]);
    }
    catch (err) {
        console.log(err);
    }

    try {
        await sql.query("DELETE FROM users WHERE username=?", ["admin"]);
    }
    catch (err) {
        console.log(err);
    }

    await sql.end();
});

describe("POST /subjects", () => {
    it("No permission to create subject", async () => {
        let res = await normalUser_agent
          .post("/subjects")
          .send({
            name: "Math",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(401);
    });

    it("Create subject fail, because name is empty", async () => {
        let res = await admin_agent
          .post("/subjects")
          .send({
            name: "",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(422);
    });

    it("Create subject successfully", async () => {
        let res = await admin_agent
          .post("/subjects")
          .send({
            name: "Math",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(201);
        expect(res.body.subject.id).toBeDefined();
        subject_id = res.body.subject.id;
    });
});

describe("GET /subjects", () => {
    it("Get all subjects", async () => {
        let res = await request(app).get(`/subjects`);

        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.subjects).toBeInstanceOf(Array);
    });
});

describe("GET /subjects/:id", () => {
    it("Get subject by id", async () => {
        let res = await request(app).get(`/subjects/${subject_id}`);

        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.subject).toBeDefined();
    });

    it("Get subject by id (not found)", async () => {
        let res = await request(app).get(`/subjects/${subject_id + 1}`);

        console.log(res.body);
        expect(res.status).toBe(404);
    });
});

describe("PATCH /subjects/:id", () => {
    it("No permission to update subject", async () => {
        let res = await normalUser_agent
          .patch(`/subjects/${subject_id}`)
          .send({
            name: "Music",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(401);
    });

    it("Update subject fail, because name is empty", async () => {
        let res = await admin_agent
          .patch(`/subjects/${subject_id}`)
          .send({
            name: "",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(422);
    });

    it("Update subject successfully", async () => {
        let res = await admin_agent
          .patch(`/subjects/${subject_id}`)
          .send({
            name: "Math",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(200);
        expect(res.body.subject).toBeDefined();
    });

    it("Update subject (not found subject id)", async () => {
        let res = await admin_agent
          .patch(`/subjects/${subject_id + 1}`)
          .send({
            name: "Math",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(404);
    });
});

describe("DELETE /subjects/:id", () => {
    it("No permission to delete subject", async () => {
        let res = await normalUser_agent
          .delete(`/subjects/${subject_id}`)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(401);
    });

    it("Delete subject successfully", async () => {
        let res = await admin_agent
          .delete(`/subjects/${subject_id}`)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(200);
    });

    it("Delete subject (not found subject id)", async () => {
        let res = await admin_agent
          .delete(`/subjects/${subject_id}`)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.status).toBe(404);
    });
});