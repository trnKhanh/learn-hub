const ShoppingCart = require("../models/ShoppingCarts.model");

const addCourseToCart = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  try {
    const shopping_cart = await ShoppingCart.addCourse(req.user.id, req.params.id);
    res.status(201).json({
      message: "ShoppingCart has been created",
      shopping_cart: shopping_cart,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "Course has already in user's cart",
      });
      return;
    }
    if (err.code.includes("ER_NO_REFERENCED")) {
      res.status(404).json({
        message: "Course id not existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when adding course to cart",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const course_ids = await ShoppingCart.findAll({
      student_id: req.user.id,
    });
    res.status(200).json({
      message: "Retrieve shopping cart's information successfully",
      course_ids: course_ids,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting all shopping carts' information",
    });
  }
};

// Update shopping_cart information
const removeCourseFromCart = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  try {
    const course_ids = await ShoppingCart.removeCourse(
      req.user.id,
      req.params.id,
    );
    if (!course_ids) {
      res.status(404).json({
        message: "No course in carts",
      });
    } else {
      res.status(200).json({
        message: "ShoppingCart has been updated",
        course_ids: course_ids,
      });
    }
  } catch (err) {
    console.log(err);

    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "ShoppingCart with the same name has existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when updating shopping cart",
    });
  }
};

const removeAllCourseFromCart = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const course_ids = await ShoppingCart.removeAllCourses(req.user.id);
    if (!course_ids) {
      res.status(404).json({
        message: "Not found cart",
      });
    } else {
      res.status(200).json({
        message: "All courses have been removed from cart",
        course_ids: course_ids,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when deleting shopping_carts",
    });
  }
};
module.exports = {
  addCourseToCart,
  getCart,
  removeCourseFromCart,
  removeAllCourseFromCart,
};
