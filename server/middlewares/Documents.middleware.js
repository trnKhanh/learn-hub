// Models
const Lesson = require("../models/Lessons.model");

const getLesson = async (req, res, next) => {
  const lesson_id = req.params.lesson_id;

  try {
    const lesson = await Lesson.findOne({ id: lesson_id });
    if (!lesson) {
      res.status(404).json({
        message: "Lesson not found",
      });
      return;
    }

    req.lesson = lesson;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when retrieving lesson",
    });
  }
};

module.exports = {
  getLesson,
};
