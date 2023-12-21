const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");

let user_id;
let admin_id;
let language_id;

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
        username: "admin2",
        password: "@Admin12345",
        email: "admin2@gmail.com",
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
        await sql.query("DELETE FROM users WHERE username=?", ["admin2"]);
    }
    catch (err) {
        console.log(err);
    }

    await sql.end();
});

describe("POST /languages", () => {
    it("No permission to create language", async () => {
        let res = await normalUser_agent
            .post("/languages")
            .send({
                language_name: "English",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(401);
    });

    it("Create language fail, because language_name is empty", async () => {
        let res = await admin_agent
            .post("/languages")
            .send({
                language_name: "",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(422);
    });

    it("Create language successfully", async () => {
        let res = await admin_agent
            .post("/languages")
            .send({
                language_name: "English",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        
        expect(res.statusCode).toBe(201);
        expect(res.body.language).toBeDefined(); //co ton tai language
        language_id = res.body.language.id;
        console.log(language_id);
    });

    it("Create language (duplicate)", async () => {
        let res = await admin_agent
            .post("/languages")
            .send({
                language_name: "English",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(409);
    });
});

describe("GET /languages", () => {
    it("Get all languages", async () => {
        let res = await request(app).get(`/languages`);

        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.languages).toBeInstanceOf(Array);
    });
});

describe("GET /languages/:id", () => {
    it("Get language by id", async () => {
        
        let res = await request(app).get(`/languages/${language_id}`); //hmmm..
            
        console.log(res.body);
        expect(res.statusCode).toBe(200)
        expect(res.body.language.language_name).toBe("English");
    });

    it("Get language by id (not found language)", async () => {
        let res = await request(app).get(`/languages/${language_id+1}`); //hmmm..
            
        expect(res.statusCode).toBe(404);
    });
});

describe("PATCH /languages/:id", () => {
    it("No permission to update language", async () => {
        let res = await normalUser_agent
            .patch(`/languages/${language_id}`)
            .send({
                language_name: "Vietnamese",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(401);
    });

    it("Update language successfully", async () => {
        let res = await admin_agent
            .patch(`/languages/${language_id}`)
            .send({
                language_name: "Vietnamese",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.language[0].language_name).toBe("Vietnamese");
    });

    it("Update language (not found language id)", async () => {
        let res = await admin_agent
            .patch(`/languages/${language_id+1}`)
            .send({
                language_name: "Vietnamese",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(404);
    });

    it("Update language with invalid fields", async () => {
        let res = await admin_agent
            .patch(`/languages/${language_id}`)
            .send({
                abc: "3",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(422);
    });
});

describe("DELETE /languages/:id", () => {
    it("No permission to delete language", async () => {
        let res = await normalUser_agent
            .delete(`/languages/${language_id}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(401);
    });

    it("Delete language successfully", async () => {
        let res = await admin_agent
            .delete(`/languages/${language_id}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
    });

    it("Delete language (not found language)", async () => {
        let res = await admin_agent
            .delete(`/languages/${language_id+1}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(404);
    });
});