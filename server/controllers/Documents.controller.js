// Model
const Documents = require("../models/Documents.model");

class DocumentController {
  static async getAllDocuments(req, res) {
    const course_id = req.course.id;
    const lesson_id = req.lesson.id;

    try {
      const documents = await Documents.getAll({
        course_id: course_id,
        lesson_id: lesson_id,
      });

      res.status(200).json({
        message: "Retrieve all documents' information successfully",
        documents: documents,
        course: req.course,
        lesson: req.lesson,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when getting all documents' information",
      });
    }
  }

  static async getDocumentById(req, res) {
    const course_id = req.course.id;
    const lesson_id = req.lesson.id;
    const document_id = req.params.document_id;

    try {
      const document = await Documents.findOne({
        course_id: course_id,
        lesson_id: lesson_id,
        id: document_id,
      });

      if (!document) {
        res.status(404).json({
          message: "Document not found",
        });
        return;
      }

      res.status(200).json({
        message: "Retrieve document's information successfully",
        document: document,
        course: req.course,
        lesson: req.lesson,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when getting document's information",
      });
    }
  }
}

module.exports = DocumentController;
