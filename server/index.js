require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

// Use users router
const authRouter = require("./routes/Auth.route");
app.use("/", authRouter);

// Use users router
const usersRouter = require("./routes/Users.route");
app.use("/users", usersRouter);

// User tutors router
const tutorsRouter = require("./routes/Tutors.route");
app.use("/tutors", tutorsRouter);

// Use courses router
const coursesRouter = require("./routes/Courses.route");
app.use("/courses", coursesRouter);

app.listen(process.env.PORT, () =>
  console.log(`Example app is listening on port ${process.env.PORT}.`),
);
