const Admin = require("../models/Admins.model");
const Course = require("../models/Courses.model");
const TeachCourse = require("../models/TeachCourses.model");
const LearnCourse = require("../models/LearnCourses.model");
const Lesson = require("../models/Lessons.model");

const validateLessonChangePermission = async (req, res, next) => {
  let course_id = req.course.id;
  let user_id = req.user.id;

  console.log(">>> validateLessonChangePermission: ", {
    course_id: course_id,
    user_id: user_id,
  });

  try {
    const teachCoursePromise = TeachCourse.findOne({
      tutor_id: user_id,
      course_id: course_id,
    });

    const owerCoursePromise = Course.findOne({
      owner_id: user_id,
      id: course_id,
    });

    const [teachCourse, owerCourse] = await Promise.all([
      teachCoursePromise,
      owerCoursePromise,
    ]);

    if (!teachCourse && !owerCourse) {
      res.status(403).json({
        message: "You don't have permission to change this course",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating permission",
    });
  }
};

const getCourse = async (req, res, next) => {
  let course_id = req.params.course_id;
  try {
    const course = await Course.findOne({ id: course_id });
    if (!course) {
      res.status(404).json({
        message: "Not found course",
      });
    } else {
      req.course = course;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting course's information",
    });
  }
};

const validateLessonDeletePermission = async (req, res, next) => {
  let course_id = req.course.id;
  let user_id = req.user.id;

  try {
    const admin_promise = Admin.findOne({
      id: user_id,
      courses_access: 1,
    });

    const creator_promise = Course.findOne({
      id: course_id,
      owner_id: user_id,
    });

    const [admin, creator] = await Promise.all([
      admin_promise,
      creator_promise,
    ]);

    if (!admin && !creator) {
      res.status(403).json({
        message: "You don't have permission to delete this Lesson",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating permission",
    });
  }
};

const validateLessonGetPermission = async (req, res, next) => {
  let course_id = req.course.id;
  let user_id = req.user.id;
  let lesson_id = req.params.lesson_id;

  try {
    const admin_promise = Admin.findOne({
      id: user_id,
      courses_access: 1,
    });

    const creator_promise = Course.findOne({
      id: course_id,
      owner_id: user_id,
    });

    const tutor_promise = TeachCourse.findOne({
      tutor_id: user_id,
      course_id: course_id,
    });

    const learner_promise = LearnCourse.findOne({
      student_id: user_id,
      course_id: course_id,
    });

    const is_free_promise = new Lesson({
      id: lesson_id,
      course_id: course_id,
    }).findOne({ is_free: 1 });

    const is_published_promise = new Lesson({
      id: lesson_id,
      course_id: course_id,
    }).findOne({ is_published: 1 });

    const [admin, creator, tutor, learner, is_free, is_published] =
      await Promise.all([
        admin_promise,
        creator_promise,
        tutor_promise,
        learner_promise,
        is_free_promise,
        is_published_promise,
      ]);

    // console.log(">>> validateLessonGetPermission: ", {
    //   admin: admin,
    //   creator: creator,
    //   tutor: tutor,
    //   learner: learner,
    //   is_free: is_free,
    //   is_published: is_published,
    // });

    if (admin || creator || tutor) {
      next();
    } else if (is_published && (learner || is_free)) {
      next();
    } else {
      res.status(403).json({
        message: "You don't have permission to get this Lesson",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating permission",
    });
  }
};

module.exports = {
  validateLessonChangePermission,
  getCourse,
  validateLessonDeletePermission,
  validateLessonGetPermission,
};
