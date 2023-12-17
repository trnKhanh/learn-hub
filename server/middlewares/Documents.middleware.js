// Models
const Lesson = require("../models/Lessons.model");

const getLesson = async (req, res, next) => {
  const lesson_id = req.params.lesson_id;
  const course_id = req.params.course_id;

  try {
    const lesson = await new Lesson({
      id: lesson_id,
      course_id: course_id,
    }).findOne();

    if (!lesson) {
      res.status(404).json({
        message: "Lesson not found",
      });
      return;
    }

    req.lesson = {
      id: lesson.lesson_id,
      ...lesson,
    };

    console.log(" >>> Documents.middleware > getLesson > lesson: ", {
      lesson: req.lesson,
    });
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
