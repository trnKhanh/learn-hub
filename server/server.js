const app = require("./app");

app.listen(process.env.PORT, () =>
  console.log(`Example app is listening on port ${process.env.PORT}.`),
);
