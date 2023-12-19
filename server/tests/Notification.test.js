const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");


let user_id;
let user_id2;
let admin_id;
let id_notification;
let id_notification2;

const user_agent = request.agent(app);
const user_agent2 = request.agent(app);
const admin_agent = request.agent(app);

beforeAll(async () => {
    try {
      let res = await user_agent
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
        let res = await user_agent2
          .post("/signup")
          .send({
            username: "hmduc2",
            password: "@Duck123456",
            email: "hmd2@gmail.com",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.body.user_id).toBeDefined();
        user_id2 = res.body.user_id;
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
      expect(user_id2).toBeDefined();
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
        await sql.query("DELETE FROM users WHERE username=?", ["hmduc2"]);
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

describe("POST /notifications", () => {
    it("No permission to create new notification", async () => {
        try {
            let res = await user_agent
                .post("/notifications")
                .send({
                    user_id: user_id,
                    content: "test notification!!!!!!!!!!!"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(401);
        }
        catch (err) {
            console.log(err);
        }
    });

    it("Create new notification fail, because content is empty", async () => {
        try {
            let res = await admin_agent
                .post("/notifications")
                .send({
                    user_id: user_id,
                    content: ""
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(422);
        }
        catch (err) {
            console.log(err);
        }
    });

    it("Create new notification fail, because user_id is not exist", async () => {
        try {
            let res = await admin_agent
                .post("/notifications")
                .send({
                    user_id: user_id + 1,
                    content: "123"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(422);
        }
        catch (err) {
            console.log(err);
        }
    });

    it("Create new notification successfully", async () => {
        try {
            let res = await admin_agent
                .post("/notifications")
                .send({
                    user_id: user_id,
                    content: "test notification!!!!!!!!!!!"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(200);
            expect(res.body.notification).toBeDefined();
            id_notification = res.body.notification.id;
        }
        catch (err) {
            console.log(err);
        }
    });

    it("Create new notification successfully", async () => {
        try {
            let res = await admin_agent
                .post("/notifications")
                .send({
                    user_id: user_id2,
                    content: "test notification2!!!!!!!!!!!"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(200);
            expect(res.body.notification).toBeDefined();
            id_notification2 = res.body.notification.id;
        }
        catch (err) {
            console.log(err);
        }
    });
});

describe("GET /notifications", () => {
    it("User1 get all notifications of user1", async () => {
        try {
            let res = await user_agent
            .get("/notifications")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

            expect(res.statusCode).toBe(200);
            expect(res.body.notifications[0].content).toBe("test notification!!!!!!!!!!!");
        }
        catch (err) {
            console.log(err);
        }
    });

    it("User2 get all notifications of false user1", async () => {
        try {
            let res = await user_agent2
                .get("/notifications")
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");

            expect(res.statusCode).toBe(200);
            expect(res.body.notifications[0].content).not.toBe("test notification!!!!!!!!!!!");
        }
        catch (err) {
            console.log(err);
        }
    });
});

describe("PATCH /notifications/:id", () => {
    it("No permission to update notification", async () => {
        try {
            let res = await user_agent
                .patch(`/notifications/${id_notification}`)
                .send({
                    id: id_notification2,
                    status: "SEEN"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(401);
        }
        catch (err) {
            console.log(err);
        }
    });

    it("Update notification successfully", async () => {
        try {
            let res = await user_agent
                .patch(`/notifications/${id_notification}`)
                .send({
                    id: id_notification,
                    status: "SEEN"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(200);
            expect(res.body.notification[0].status).toBe("SEEN");
        }
        catch (err) {
            console.log(err);
        }
    });

    it("Update notification fail, because status not in ['SEEN', 'NOT SEEN']", async () => {
        try {
            let res = await user_agent
                .patch(`/notifications/${id_notification}`)
                .send({
                    id: id_notification,
                    status: "hmmmm"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(422);
            expect(res.body.notification[0].status).toBe("SEEN");
        }
        catch (err) {
            console.log(err);
        }
    });

    it("Update notification fail, because notification_id is not exist", async () => {
        try {
            let res = await admin_agent
                .patch(`/notifications/${test_notification.id + 1}`)
                .send({
                    content: "update notification"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");
            expect(res.statusCode).toBe(422);
        }
        catch (err) {
            console.log(err);
        }
    });
});