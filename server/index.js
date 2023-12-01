const express = require("express");
const app = express();
app.use(express.json())

// Use user router
const userRouter = require("./routes/User.route.js");
app.use("/users", userRouter);

const authMiddleWare = require("./middlewares/Auth.middleware.js");
app.get("/", authMiddleWare, (req, res) => {
  res.send("SUCCESS");
})

app.listen(3001, () => console.log('Example app is listening on port 3000.'));
