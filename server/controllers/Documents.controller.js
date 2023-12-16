const Document = require("../models/Documents.model");
const { validationResult, matchedData } = require("express-validator");

const getAllDocumentsOfCourse = async (req, res) => {
    try {
        const documents = await Document.getAll(req.params.course_id);
        if (!documents.length) {
            res.status(404).json({
                message: "Not found lessons",
            });
        } else {
            res.status(200).json({
                message: "Retrieve lessons' information successfully",
                documents: documents,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when getting lessons' information",
        });
    }
}

module.exports = { getAllDocumentsOfCourse };