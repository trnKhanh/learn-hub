const Lesson = require("../models/Lessons.model");
const { validationResult, matchedData } = require("express-validator");

const getAllLessonsOfCourse = async (req, res) => {
    try {
        const lessons = await Lesson.getAll(req.params.course_id);
        if (!lessons.length) {
            res.status(404).json({
                message: "Not found lessons",
            });
        } else {
            res.status(200).json({
                message: "Retrieve lessons' information successfully",
                lessons: lessons,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: "Errors occur when getting lessons' information",
        });
    }
}

module.exports = { getAllLessonsOfCourse };
