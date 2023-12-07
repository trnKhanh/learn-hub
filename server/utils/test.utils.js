const request = require("supertest");
const app = require("../app");
const sql = require("../database/db");
const getAccessToken = async (username, password) => {
  const res = await request(app)
    .post("/login")
    .send({
      username: username,
      password: password,
    })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

  expect(res.body.accessToken).toBeDefined();
  const accessToken = res.body.accessToken;
  return accessToken;
};

const createAdmin = async () => {
  try {
    const res = await request(app)
      .post("/signup")
      .send({
        username: "admin",
        password: "admin",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    await sql.query("INSERT INTO admins SET id=?", [res.body.user_id]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAccessToken, createAdmin };
