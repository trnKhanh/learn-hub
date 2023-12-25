const app = require("../app");
const request = require("supertest");
const { getAccessToken, createAdmin } = require("../utils/test.utils"); const { randomUUID } = require("crypto");
const sql = require("../database/db");
const { count } = require("console");

let tutor_id;
let u_tutor_id;
let course_admin_id;
let admin_id;
let course_id;

const tutor_agent = request.agent(app);
const u_tutor_agent = request.agent(app);
const course_admin_agent = request.agent(app);
const admin_agent = request.agent(app);

beforeAll(async () => {
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
  } catch (err) {
    console.log(err);
  }

  try {
    const res = await u_tutor_agent
      .post("/signup")
      .send({
        username: "u_tutor",
        password: "Learnhub123!",
        email: "u_tutor@gmail.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.body.user_id).toBeDefined();
    u_tutor_id = res.body.user_id;
    await sql.query("INSERT INTO tutors SET id=?, verified=0", [u_tutor_id]);
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
  } catch (err) {
    console.log(err);
  }
  expect(tutor_id).toBeDefined();
  expect(u_tutor_id).toBeDefined();
  expect(admin_id).toBeDefined();
  expect(course_admin_id).toBeDefined();
});

afterAll(async () => {
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["tutor"]);
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["u_tutor"]);
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["admin"]);
  } catch (err) {
    console.log(err);
  }
  try {
    await sql.query("DELETE FROM users WHERE username=?", ["course_admin"]);
  } catch (err) {
    console.log(err);
  }
  await sql.end();
});

describe("POST /courses", () => {
  it("Create course by course admin", async () => {
    let res = await course_admin_agent
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.course.name).toBe("test_course");
    expect(res.body.course.description).toBe("This is testing");
    expect(res.body.course.difficulty).toBe("BEGINNER");
    expect(res.body.course.duration).toBe(100);
    expect(res.body.course.owner_id).toBe(tutor_id);
    expect(res.body.course.price).toBe(200);
    expect(res.body.course.discount).toBe(null);
    course_id = res.body.course.id;
  });
  it("Create course by course_admin (duplicate)", async () => {
    let res = await course_admin_agent
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(409);
  });
  it("Create course by course admin, assigned course to unverified tutor", async () => {
    let res = await course_admin_agent
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: u_tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(422);
  });
  it("Create course not by course_admin", async () => {
    let res = await admin_agent
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        owner_id: tutor_id,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(401);
  });
});

describe("DELETE /courses/:id", () => {
  it("Delete course by id (course admin)", async () => {
    let res = await course_admin_agent.delete(`/courses/${course_id}`);

    expect(res.statusCode).toBe(200);
  });
});

describe("POST /courses", () => {
  it("Create course by verified tutor", async () => {
    let res = await tutor_agent
      .post("/courses")
      .send({
        name: "tutor_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.course.name).toBe("tutor_course");
    expect(res.body.course.description).toBe("This is testing");
    expect(res.body.course.difficulty).toBe("BEGINNER");
    expect(res.body.course.duration).toBe(100);
    expect(res.body.course.owner_id).toBe(tutor_id);
    expect(res.body.course.price).toBe(200);
    expect(res.body.course.discount).toBe(null);
    course_id = res.body.course.id;
  });
  it("Create course by verified tutor (duplicate)", async () => {
    let res = await tutor_agent
      .post("/courses")
      .send({
        name: "tutor_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(409);
  });
  it("Create course by unverified tutor", async () => {
    let res = await u_tutor_agent
      .post("/courses")
      .send({
        name: "test_course",
        description: "This is testing",
        difficulty: "BEGINNER",
        duration: 100,
        price: 200,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("accessToken", u_tutor_id);

    expect(res.statusCode).toBe(401);
  });
});

describe("GET /courses/:id", () => {
  it("Get course by id", async () => {
    let res = await request(app).get(`/courses/${course_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.course.name).toBe("tutor_course");
    expect(res.body.course.description).toBe("This is testing");
    expect(res.body.course.difficulty).toBe("BEGINNER");
    expect(res.body.course.duration).toBe(100);
    expect(res.body.course.owner_id).toBe(tutor_id);
    expect(res.body.course.price).toBe(200);
    expect(res.body.course.discount).toBe(null);
    expect(res.body.course.number_of_students).toBe(0);
    expect(res.body.course.languages).toBeInstanceOf(Array);
    expect(res.body.course.subjects).toBeInstanceOf(Array);
  });
  it("Get course by unknown id", async () => {
    let res = await request(app).get(`/courses/12312321`);

    expect(res.statusCode).toBe(404);
  });
});

describe("GET /courses", () => {
  it("Get all courses", async () => {
    let res = await request(app).get(`/courses`);

    expect(res.statusCode).toBe(200);
    expect(res.body.courses).toBeInstanceOf(Array);
  });
});

describe("PATCH /courses/:id", () => {
  it("Update course by id", async () => {
    let res = await tutor_agent.patch(`/courses/${course_id}`).send({
      price: 250,
      discount: 0.2,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.courses[0].name).toBe("tutor_course");
    expect(res.body.courses[0].description).toBe("This is testing");
    expect(res.body.courses[0].difficulty).toBe("BEGINNER");
    expect(res.body.courses[0].duration).toBe(100);
    expect(res.body.courses[0].owner_id).toBe(tutor_id);
    expect(res.body.courses[0].price).toBe(250);
    expect(res.body.courses[0].discount).toBe(0.2);
  });
  it("Update course not by owner", async () => {
    let res = await u_tutor_agent.patch(`/courses/${course_id}`).send({
      price: 250,
      discount: 0.2,
    });

    expect(res.statusCode).toBe(401);
  });
  it("Update course with unknown fields", async () => {
    let res = await tutor_agent.patch(`/courses/${course_id}`).send({
      abc: 1,
    });

    expect(res.statusCode).toBe(400);
  });
  it("Update course by unknown id", async () => {
    let res = await tutor_agent.patch(`/courses/123111111`).send({
      price: 200,
    });

    expect(res.statusCode).toBe(404);
  });
});

describe("POST /courses/:course_id/tutors/:tutor_id", () => {
  it("Add tutor to course (invalid profit)", async () => {
    const res = await tutor_agent
      .post(`/courses/${course_id}/tutors/${u_tutor_id}`)
      .send({
        profit_rate: 1.1,
      });

    expect(res.statusCode).toBe(422);
  });
  it("Add tutor to course with no permission", async () => {
    const res = await u_tutor_agent
      .post(`/courses/${course_id}/tutors/${u_tutor_id}`)
      .send({
        profit_rate: 0.1,
      });

    expect(res.statusCode).toBe(401);
  });
  it("Add tutor to course by owner", async () => {
    const res = await tutor_agent
      .post(`/courses/${course_id}/tutors/${u_tutor_id}`)
      .send({
        profit_rate: 0.1,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.teach_course).toBeDefined();
    expect(res.body.teach_course.course_id).toBe(course_id);
    expect(res.body.teach_course.tutor_id).toBe(u_tutor_id);
    expect(res.body.teach_course.profit_rate).toBe(0.1);
  });
  it("Add tutor to course (duplicate)", async () => {
    const res = await tutor_agent
      .post(`/courses/${course_id}/tutors/${u_tutor_id}`)
      .send({
        profit_rate: 0.1,
      });

    expect(res.statusCode).toBe(409);
  });
  it("Add tutor to course by course admin", async () => {
    const res = await course_admin_agent
      .post(`/courses/${course_id}/tutors/${tutor_id}`)
      .send({
        profit_rate: 0.9,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.teach_course).toBeDefined();
    expect(res.body.teach_course.course_id).toBe(course_id);
    expect(res.body.teach_course.tutor_id).toBe(tutor_id);
    expect(res.body.teach_course.profit_rate).toBe(0.9);
  });
});
describe("GET /courses/:course_id/tutors", () => {
  it("Get tutor list of course", async () => {
    const res = await request(app).get(`/courses/${course_id}/tutors/`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tutor_list).toBeInstanceOf(Array);
    expect(res.body.tutor_list.length).toBe(2);
  });
});
describe("PATCH /courses/:course_id/tutors/:tutor_id", () => {
  it("Update tutor profit rate by owner", async () => {
    const res = await tutor_agent
      .patch(`/courses/${course_id}/tutors/${u_tutor_id}`)
      .send({
        profit_rate: 0.2,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.teach_course).toBeDefined();
    expect(res.body.teach_course.profit_rate).toBe(0.2);
  });
  it("Update tutor invalid profit rate by owner", async () => {
    const res = await tutor_agent
      .patch(`/courses/${course_id}/tutors/${u_tutor_id}`)
      .send({
        profit_rate: 1.2,
      });

    expect(res.statusCode).toBe(422);
  });
  it("Update tutor invalid profit rate by course admin", async () => {
    const res = await course_admin_agent
      .patch(`/courses/${course_id}/tutors/${u_tutor_id}`)
      .send({
        profit_rate: 0.9,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.teach_course).toBeDefined();
    expect(res.body.teach_course.profit_rate).toBe(0.9);
  });
});

describe("DELETE /courses/:course_id/tutors/:tutor_id", () => {
  it("Delete tutor from course with no permission", async () => {
    const res = await u_tutor_agent.delete(
      `/courses/${course_id}/tutors/${tutor_id}`,
    );

    expect(res.statusCode).toBe(401);
  });
  it("Delete tutor from course by owner", async () => {
    const res = await tutor_agent.delete(
      `/courses/${course_id}/tutors/${u_tutor_id}`,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.teach_course).toBeDefined();
    expect(res.body.teach_course.course_id).toBe(course_id);
    expect(res.body.teach_course.tutor_id).toBe(u_tutor_id);

    const course_res = await request(app).get(`/courses/${course_id}/tutors`);
    expect(course_res.body.tutor_list.length).toBe(1);
  });
  it("Delete tutor from course by course admin", async () => {
    const res = await course_admin_agent.delete(
      `/courses/${course_id}/tutors/${tutor_id}`,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.teach_course).toBeDefined();
    expect(res.body.teach_course.course_id).toBe(course_id);
    expect(res.body.teach_course.tutor_id).toBe(tutor_id);
  });
  it("Delete unknown tutor from course", async () => {
    const res = await course_admin_agent.delete(
      `/courses/${course_id}/tutors/${tutor_id}`,
    );

    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /courses/:id", () => {
  it("Delete course not by owner", async () => {
    let res = await u_tutor_agent.delete(`/courses/${course_id}`);

    expect(res.statusCode).toBe(401);
  });
  it("Delete course by id", async () => {
    let res = await tutor_agent.delete(`/courses/${course_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.courses[0].name).toBe("tutor_course");
    expect(res.body.courses[0].description).toBe("This is testing");
    expect(res.body.courses[0].difficulty).toBe("BEGINNER");
    expect(res.body.courses[0].duration).toBe(100);
    expect(res.body.courses[0].owner_id).toBe(tutor_id);
    expect(res.body.courses[0].price).toBe(250);
    expect(res.body.courses[0].discount).toBe(0.2);
  });
  it("Delete course by unknown id", async () => {
    let res = await course_admin_agent.delete(`/courses/${tutor_id}`);

    expect(res.statusCode).toBe(404);
  });
});
