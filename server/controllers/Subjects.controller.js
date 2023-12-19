const Subject = require("../models/Subjects.model");
const { validationResult, matchedData } = require("express-validator");

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.getAll();
        if (!subjects.length) {
            res.status(404).json({
                message: "Not found subjects",
            });
        } else {
            res.status(200).json({
                message: "Retrieve subject's information successfully",
                subjects: subjects,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when getting subject's information",
        });
    }
};

const getSubjectsOfCourseId = async (req, res) => {
    try {
        const subjects = await Subject.getSubjectsOfCourse(req.params.course_id);
        if (!subjects.length) {
            res.status(404).json({
                message: "Not found subjects",
            });
        } else {
            res.status(200).json({
                message: "Retrieve subject's information successfully",
                subjects: subjects,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when getting subject's information",
        });
    }
}

module.exports = {
    getAllSubjects,
    getSubjectsOfCourseId,
};
