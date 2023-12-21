const Exam = require("../models/Exams.model");
const { validationResult, matchedData } = require("express-validator");
const sql = require("../database/db");

class ExamsController {
  static async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array()[0].msg,
      });
      return;
    }

    const data = matchedData(req);

    data.course_id = req.course.id;
    data.lesson_id = req.lesson.id;

    try {
      const exam = new Exam({
        course_id: req.course.id,
        lesson_id: req.lesson.id,
        name: data.name,
        percentage: data.percentage,
      });

      const newExam = await exam.create();
      if (newExam == null) {
        res.status(500).json({
          message: "Errors occur when creating exam",
        });
        return;
      }
      res.status(201).json({
        message: "Create exam successfully",
        exam: newExam,
        lesson: req.lesson,
        course: req.course,
      });
    } catch (errors) {
      if (errors.code == "ER_DUP_ENTRY") {
        res.status(409).json({
          message: "This lesson is already existed",
        });
        return;
      }

      if (errors.message == "Total percentage must be <= 1") {
        res.status(400).json({
          message: errors.message,
        });
        return;
      }

      console.log(errors);
      res.status(500).json({
        message: "Errors occur when creating exam",
      });
    }
  }

  static async getAll(req, res) {
    const course_id = req.course.id;
    const lesson_id = req.lesson.id;
    const validPublished = req.validPublished;

    try {
      const exams = await new Exam({
        course_id: course_id,
        lesson_id: lesson_id,
      }).findAll(!validPublished ? { "l.isPublished": 1 } : {});
      res.status(200).json({
        message: "Retrieve all exams' information successfully",
        exams: exams,
        course: req.course,
        lesson: req.lesson,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when retrieving exams",
      });
    }
  }

  static async getExamById(req, res) {
    const course_id = req.course.id;
    const lesson_id = req.lesson.id;
    const exam_id = req.params.exam_id;

    try {
      const exam = await Exam.findOne({
        course_id: course_id,
        lesson_id: lesson_id,
        id: exam_id,
      });

      if (!exam) {
        res.status(404).json({
          message: "Exam not found",
        });
        return;
      }

      res.status(200).json({
        message: "Retrieve exam's information successfully",
        exam: exam,
        course: req.course,
        lesson: req.lesson,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when retrieving exam",
      });
    }
  }

  static async update(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array()[0].msg,
      });
      return;
    }

    const data = matchedData(req);

    // console.log(">>> Exams.controller > update: ", req.body);

    if (Object.keys(data).length == 0) {
      res.status(400).json({
        message: "No data to update",
      });
      return;
    }

    data.course_id = req.course.id;
    data.lesson_id = req.lesson.id;
    data.id = req.params.exam_id;
    console.log(">>> Exams.controller > update: ", data);

    try {
      const exam = await new Exam(data).updateById(data);
      if (exam == null) {
        res.status(500).json({
          message: "Errors occur when updating exam",
        });
        return;
      }

      res.status(201).json({
        message: "Update exam successfully",
        exam: exam,
        lesson: req.lesson,
        course: req.course,
      });
    } catch (errors) {
      console.log(errors);
      if (errors.code == "ER_DUP_ENTRY") {
        res.status(409).json({
          message: "This lesson is already existed",
        });
        return;
      }
      if (errors.message == "Total percentage must be <= 1") {
        res.status(400).json({
          message: errors.message,
        });
        return;
      }
      res.status(500).json({
        message: "Errors occur when updating exam",
      });
    }
  }

  static async delete(req, res) {
    const course_id = req.course.id;
    const lesson_id = req.lesson.id;
    const id = req.params.exam_id;

    try {
      const exam = await Exam.new({
        course_id: course_id,
        lesson_id: lesson_id,
        id: id,
      }).deleteById();
      if (!exam) {
        res.status(404).json({
          message: "Exam not found",
        });
        return;
      }
      res.status(200).json({
        message: "Delete exam successfully",
        exam: deletedExam,
        lesson: req.lesson,
        course: req.course,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when deleting exam",
      });
    }
  }
}

module.exports = ExamsController;
