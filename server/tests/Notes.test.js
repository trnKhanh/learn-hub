const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils");
const { randomUUID } = require("crypto");
const sql = require("../database/db");
const Learn_Courses = require("../models/Learn_Courses.model");

let user_id1;
let user_id2;

let course_id1;
let course_id2;
let tutor_id;
let course_admin_id;

const normalUser_agent1 = request.agent(app);
const normalUser_agent2 = request.agent(app);
const course_admin_agent = request.agent(app);
const tutor_agent = request.agent(app);

beforeAll(async () => {
    //create students
    try {
      let res = await normalUser_agent1
        .post("/signup")
        .send({
          username: "hmduc6",
          password: "@Duck12345",
          email: "hmd6@gmail.com",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(res.body.user_id).toBeDefined();
      user_id1 = res.body.user_id;
      await sql.query("INSERT INTO students SET id=?, membership=?", [user_id1, "PREMIUM"]);
    } catch (err) {
      console.log(err);
    }
  
    try {
        let res = await normalUser_agent2
            .post("/signup")
            .send({
            username: "hmduc7",
            password: "@Duck12345",
            email: "hmd7@gmail.com",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.body.user_id).toBeDefined();
        user_id2 = res.body.user_id;
        await sql.query("INSERT INTO students SET id=?, membership=?", [user_id2, "PREMIUM"]);
    } catch (err) {
        console.log(err);
    }

    expect(user_id1).toBeDefined();
    expect(user_id2).toBeDefined();

    //create tutor and admin
    try {
        const res = await tutor_agent
            .post("/signup")
            .send({
                username: "tutor",
                password: "Learnhub123!",
                email: "tutor@gmail.com",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.body.user_id).toBeDefined();
        tutor_id = res.body.user_id;
        await sql.query("INSERT INTO tutors SET id=?, verified=1", [tutor_id]);
    } 
    catch (err) {
        console.log(err);
    }

    try {
        const res = await course_admin_agent
          .post("/signup")
          .send({
            username: "course_admin",
            password: "Learnhub123!",
            email: "courseadmin@gmail.com",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(res.body.user_id).toBeDefined();
        course_admin_id = res.body.user_id;

        await sql.query(
          "INSERT INTO admins SET id=?, courses_access=1, tutors_access=0, students_access=0, supporters_access=0",
          [course_admin_id],
        );
    } 
    catch (err) {
        console.log(err);
    }

    expect(tutor_id).toBeDefined();
    expect(course_admin_id).toBeDefined();

    //create courses
    try{
        let res = await course_admin_agent
            .post("/courses")
            .send({
                name: "test_course1",
                description: "This is testing1",
                difficulty: "BEGINNER",
                duration: 100,
                owner_id: tutor_id,
                price: 200,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.body.course).toBeDefined();
        course_id1 = res.body.course.id;
    }
    catch (err) {
        console.log(err);
    }

    try{
        let res = await course_admin_agent
            .post("/courses")
            .send({
                name: "test_course2",
                description: "This is testing2",
                difficulty: "BEGINNER",
                duration: 100,
                owner_id: tutor_id,
                price: 200,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.body.course).toBeDefined();
        course_id2 = res.body.course.id;
    }
    catch (err) {
        console.log(err);
    }

    expect(course_id1).toBeDefined();
    expect(course_id2).toBeDefined();

    //create learn_courses
    try{
        await sql.query("INSERT INTO learn_courses SET course_id=?, student_id=?", [course_id1, user_id1]);
        await sql.query("INSERT INTO learn_courses SET course_id=?, student_id=?", [course_id2, user_id2]);
    }
    catch (err) {
        console.log(err);
    }
    const learn_course = await Learn_Courses.findOne({
        course_id: course_id1,
        student_id: user_id1
    });
    expect(learn_course.course_id).toBe(course_id1);
});

afterAll(async () => {
    // delete students
    try {
        await sql.query("DELETE FROM users WHERE username=?", ["hmduc6"]);
        await sql.query("DELETE FROM users WHERE username=?", ["hmduc7"]);
    }
    catch (err) {
        console.log(err);
    }

    //delete tutor and admin
    try {
        await sql.query("DELETE FROM users WHERE username=?", ["tutor"]);        
        await sql.query("DELETE FROM users WHERE username=?", ["course_admin"]);        
    }
    catch (err) {
        console.log(err);
    }

    // delete courses
    try {
        await sql.query("DELETE FROM courses WHERE name=?", ["test_course1"]);
        await sql.query("DELETE FROM courses WHERE name=?", ["test_course2"]);
    }
    catch (err) {
        console.log(err);
    }

    await sql.end();
});

describe("POST /notes", () => {
    it("No permission to create note, because student does not have permission to learn the course", async () => {
        let res = await normalUser_agent1
          .post(`/notes/${course_id2}`)
          .send({
            content: "This is a note"
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
          
        expect(res.status).toBe(401);
    });

    it("Create a new note for user1", async () => {
        const res = await normalUser_agent1
            .post(`/notes/${course_id1}`)
            .send({
                content: "This is a note user 1",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        console.log(res.status.message);
        expect(res.statusCode).toBe(201);
        expect(res.body.note.content).toBe("This is a note user 1");
    });

    it("Create a new note for user2", async () => {
        const res = await normalUser_agent2
            .post(`/notes/${course_id2}`)
            .send({
                content: "This is a note user 2",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(201);
        expect(res.body.note.content).toBe("This is a note user 2");
    });
});

describe("GET /notes", () => {
    it("Get all notes (user in the course)", async () => {
        let res = await normalUser_agent1
            .get(`/notes`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.notes[0].content).toBe("This is a note user 1");
    });
});

describe("GET /notes/:id", () => {
    it("Get note by id (user in the course)", async () => {
        let res = await normalUser_agent1
            .get(`/notes/${course_id1}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.note.content).toBe("This is a note user 1");
    });

    it("Get note by id (user not in the course)", async () => {
        let res = await normalUser_agent1
            .get(`/notes/${course_id2}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(401);
    });
});

describe ("PATCH /notes/:id", () => {
    it("Update note fail, because user not in the course", async () => {
        let res = await normalUser_agent1
            .patch(`/notes/${course_id2}`)
            .send({
                content: "This is an updated note user 2",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(401);
    });

    it("Update note fail, because not have content", async () => {
        let res = await normalUser_agent1
            .patch(`/notes/${course_id1}`)
            .send({
                skjfhs: "sdkhfd",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(422);
    });

    it("Update note successfully", async () => {
        let res = await normalUser_agent1
            .patch(`/notes/${course_id1}`)
            .send({
                content: "This is an updated note user 1",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.note.content).toBe("This is an updated note user 1");
    });
});

describe("DELETE /notes/:id", () => {
    it("Delete note fail, because user not in the course", async () => {
        let res = await normalUser_agent1
            .delete(`/notes/${course_id2}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(401);
    });

    it("Delete note successfully", async () => {
        let res = await normalUser_agent1
            .delete(`/notes/${course_id1}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
    });

    it("Delete note fail, because note not found", async () => {
        let res = await normalUser_agent1
            .delete(`/notes/${course_id1}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(res.status).toBe(404);
    });
});