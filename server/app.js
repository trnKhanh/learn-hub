require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cors());
app.use(cookieParser());

var cors = require('cors')
app.use(cors())

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

module.exports = app;
