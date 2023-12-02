const express = require("express");
const app = express();
app.use(express.json())

// Use user router
const usersRouter = require("./routes/Users.route");
app.use("/users", usersRouter);

const coursesRouter = require("./routes/Courses.route");
app.use("/courses", coursesRouter);

app.get("/", (req, res) => {
  res.send("SUCCESS");
})

app.listen(3001, () => console.log('Example app is listening on port 3000.'));
