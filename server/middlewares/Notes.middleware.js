const Learn_Courses = require("../models/Learn_Courses.model");

const validateNotesAccessPermission = async (req, res, next) => {
    try {
        const learn_course = await Learn_Courses.findOne({
            course_id: req.params.course_id,
            student_id: req.user.id
        });
        if (!learn_course) {
            res.status(401).json({
                message: "No permission to access notes because you are not a student of this course",
            });
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when validating note permission",
        });
    }
};

module.exports = { validateNotesAccessPermission };