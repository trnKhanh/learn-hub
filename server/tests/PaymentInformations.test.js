const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const sql = require("../database/db");

let user_id;
const user_agent = request.agent(app);
beforeAll(async () => {
  try {
    const res = await user_agent
      .post("/signup")
      .send({
        username: "test",
        password: "Learnhub123!",
        email: "test@gmail.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.body.user_id).toBeDefined();
    user_id = res.body.user_id;

    await user_agent.post("/students");
  } catch (err) {
    console.log(err);
  }
  expect(user_id).toBeDefined();
});

afterAll(async () => {
  try {
    await sql.query("DELETE FROM users where username='test'");
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /users/paymentInformations", () => {
  it("Create first paymentInformations", async () => {
    const res = await user_agent.post("/users/paymentInformations").send({
      card: "123456789",
      expire_date: "2024-02-12",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.payment_information.card).toBe("123456789");
    expect(res.body.payment_information.expire_date).toBe("2024-02-12");
  });
});

describe("POST /users/paymentInformations", () => {
  it("Create second paymentInformations", async () => {
    const res = await user_agent.post("/users/paymentInformations").send({
      card: "987654321",
      expire_date: "2024-02-12",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.payment_information.card).toBe("987654321");
    expect(res.body.payment_information.expire_date).toBe("2024-02-12");
  });
});

describe("GET /users/paymentInformations", () => {
  it("Get all paymentInformations", async () => {
    const res = await user_agent.get("/users/paymentInformations");

    expect(res.statusCode).toBe(200);
    expect(res.body.payment_informations).toBeInstanceOf(Array);
    expect(res.body.payment_informations.length).toBe(2);
  });
});

describe("DELETE /users/paymentInformations", () => {
  it("Delete first paymentInformation", async () => {
    const res = await user_agent.delete("/users/paymentInformations").send({
      card: "123456789",
    });

    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /users/paymentInformations", () => {
  it("Delete second paymentInformation", async () => {
    const res = await user_agent.delete("/users/paymentInformations").send({
      card: "987654321",
    });

    expect(res.statusCode).toBe(200);
  });
});
