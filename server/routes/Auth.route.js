const authController = require("../controllers/Auth.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  signupScheme,
  loginScheme,
} = require("../middlewares/validators/Auth.validator");

router.post("/signup", signupScheme, authController.signup);

router.post("/login", loginScheme, authController.login);

router.post("/logout", [validateToken], authController.logout);

router.post("/auth", [validateToken], (req, res) => {
  res.status(200).json({
    message: "This user is authenticated",
  });
});

module.exports = router;
