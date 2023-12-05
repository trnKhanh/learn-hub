// const app = require("../app");
// const request = require("supertest");
// const { getAccessToken } = require("../utils/test.utils");
// const { randomUUID } = require("crypto");
// const sql = require("../models/db");
// const Course = require("../models/Courses.model");
//
// const uuid = randomUUID();
// beforeAll(() => {
//   sql.query("SELECT id FROM users WHERE username='tutor'", (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Initialize course data");
//       const course = new Course({
//         uuid: uuid,
//         name: "CS001",
//         description: "Default course",
//         difficulty: "BEGINNER",
//         duration: 200,
//         owner_id: res[0].id,
//         price: 104,
//       });
//       sql.query("INSERT INTO courses SET ?", [course], (err, res) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Initialize course data");
//         }
//       });
//     }
//   });
// });
//
// afterAll(() => {
//   sql.query("DELETE FROM courses WHERE uuid=?", [uuid], (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Clear course data");
//     }
//   });
// });
//
// describe("GET /courses/:id", () => {
//   test("Get course by id", async () => {
//     let res = await request(app).get(`/course/${uuid}`);
//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("CS001");
//   });
// });
//
// describe("POST /courses", () => {
//   test("Create course by verified tutor", async () => {
//     const accessToken = await getAccessToken("tutor", "tutor");
//     let res = await request(app)
//       .post("/courses")
//       .send({
//         name: "CS123",
//         description: "This is CS123",
//         difficulty: "BEGINNER",
//         duration: 100,
//         price: 50,
//       })
//       .set("accessToken", accessToken)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//
//     expect(res.statusCode).toBe(201);
//     expect(res.body.name).toBe("CS123");
//   });
// });
//
// describe("POST /courses", () => {
//   test("Create course by unverified tutor", async () => {
//     const accessToken = await getAccessToken(
//       "unverified_tutor",
//       "unverified_tutor",
//     );
//     let res = await request(app)
//       .post("/courses")
//       .send({
//         name: "CS123",
//         description: "This is CS123",
//         difficulty: "BEGINNER",
//         duration: 100,
//         price: 50,
//       })
//       .set("accessToken", accessToken)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//     expect(res.statusCode).toBe(401);
//   });
// });
//
// describe("PUT /courses/:id", () => {
//   test("Update course by id by owner", async () => {
//     const accessToken = await getAccessToken("tutor", "tutor");
//     let res = await request(app)
//       .put(`/course/${uuid}`)
//       .send({
//         name: "CS001",
//         description: "This is CS123",
//         difficulty: "ADVANCED",
//         duration: 100,
//         price: 50,
//       })
//       .set("accessToken", accessToken)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//     expect(res.statusCode).toBe(200);
//     expect(res.name).toBe("CS001");
//   });
// });
//
// describe("PUT /courses/:id", () => {
//   test("Update course by id not by owner", async () => {
//     const accessToken = await getAccessToken("u_tutor", "u_tutor");
//     let res = await request(app)
//       .put(`/course/${uuid}`)
//       .send({
//         name: "CS001",
//         description: "This is CS123",
//         difficulty: "ADVANCED",
//         duration: 100,
//         price: 50,
//       })
//       .set("accessToken", accessToken)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//     expect(res.statusCode).toBe(401);
//   });
// });
//
// describe("PATCH /courses/:id", () => {
//   test("Patch course by id by owner", async () => {
//     const accessToken = await getAccessToken("tutor", "tutor");
//     let res = await request(app)
//       .patch(`/course/${uuid}`)
//       .send({
//         description: "The description is changed",
//         price: 50,
//       })
//       .set("accessToken", accessToken)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//     expect(res.statusCode).toBe(200);
//     expect(res.description).toBe("The description is changed");
//   });
// });
//
// describe("PATCH /courses/:id", () => {
//   test("Patch course by id not by owner", async () => {
//     const accessToken = await getAccessToken("u_tutor", "u_tutor");
//     let res = await request(app)
//       .patch(`/course/${uuid}`)
//       .send({
//         description: "The description is changed",
//         price: 50,
//       })
//       .set("accessToken", accessToken)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//     expect(res.statusCode).toBe(401);
//   });
// });
