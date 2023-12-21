const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Use users router
const authRouter = require("./routes/Auth.route");
app.use("/", authRouter);

// Use users router
const usersRouter = require("./routes/Users.route");
app.use("/users", usersRouter);

const adminsRouter = require("./routes/Admins.route");
app.use("/admins", adminsRouter);

const tutorsRouter = require("./routes/Tutors.route");
app.use("/tutors", tutorsRouter);

const studentsRouter = require("./routes/Students.route");
app.use("/students", studentsRouter);

const supportersRouter = require("./routes/Supporters.route");
app.use("/supporters", supportersRouter);

const coursesRouter = require("./routes/Courses.route");
app.use("/courses", coursesRouter);

const lessonsRouter = require("./routes/Lessons.route");
app.use("/courses/:course_id/lessons", lessonsRouter);

const categoriesRouter = require("./routes/Subjects.route");
app.use("/subjects", categoriesRouter);

const documentRouter = require("./routes/Documents.route");
app.use("/courses/:course_id/lessons/:lesson_id/documents", documentRouter);

const examsRouter = require("./routes/Exams.route");
app.use("/courses/:course_id/lessons/:lesson_id/exams", examsRouter);

module.exports = app;
