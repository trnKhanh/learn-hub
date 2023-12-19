const Admin = require("../models/Admins.model");
const Course = require("../models/Courses.model");
const TeachCourse = require("../models/TeachCourses.model");

const validateLessonChangePermission = async (req, res, next) => {
    let course_id = req.course.id;
    let user_id = req.user.id;

    console.log(">>> validateLessonChangePermission: ", {
        course_id: course_id,
        user_id: user_id,
    });

    try {
        const teachCourse = await TeachCourse.findOne({
        tutor_id: user_id,
        course_id: course_id,
        });
        if (!teachCourse) {
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

module.exports = {
    validateLessonChangePermission,
    getCourse,
    validateLessonDeletePermission,
};