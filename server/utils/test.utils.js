const request = require("supertest");
const app = require("../app");
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

module.exports = { getAccessToken };
