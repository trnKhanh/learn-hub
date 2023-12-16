// Model
const Documents = require("../models/Documents.model");
const { validationResult, matchedData } = require("express-validator");

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

  static async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
      return;
    }

    const data = matchedData(req);
    data.course_id = req.course.id;
    data.lesson_id = req.lesson.id;

    if (req.file) {
      data.file = req.file.path;
    }

    try {
      const newDocument = await new Documents(data).create();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when creating new document",
      });
    }
  }

  static async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
      return;
    }

    const data = matchedData(req);
    if (req.file) data.file = req.file.path;

    if (!Object.keys(data).length) {
      res.status(400).json({
        message: "Must provide valid fields",
      });
      return;
    }

    data.course_id = req.course.id;
    data.lesson_id = req.lesson.id;
    data.id = req.params.document_id;

    try {
      const document = await new Documents(data).updateById();
      if (!document) {
        res.status(404).json({
          message: "Document not found",
        });
        return;
      }

      res.status(200).json({
        message: "Update document's information successfully",
        document: document,
        course: req.course,
        lesson: req.lesson,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when updating document's information",
      });
    }
  }

  static async delete(req, res) {
    const document_id = req.params.document_id;
    const course_id = req.course.id;
    const lesson_id = req.lesson.id;

    try {
      const deleted_document = await new Documents({
        id: document_id,
        course_id: course_id,
        lesson_id: lesson_id,
      }).deleteById();

      if (!deleted_document) {
        res.status(404).json({
          message: "Document not found",
        });
        return;
      }

      res.status(200).json({
        message: "Delete document successfully",
        document: deleted_document,
        course: req.course,
        lesson: req.lesson,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when deleting document",
      });
    }
  }
}

module.exports = DocumentController;
