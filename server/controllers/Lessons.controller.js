const { validationResult, matchedData } = require("express-validator");

// models
const Lesson = require("../models/Lessons.model");
const LessonManager = require("../models/LessonManager.model");

class LessonsController {
  static async getAllLessons(req, res) {
    let lessonManager = new LessonManager(req.course.id);

    try {
      const lessons = await lessonManager.findAll();
      // console.log(
      //   ">>> LessonsController >> getAllLessons >> lessons: ",
      //   lessons
      // );
      res.status(200).json({
        message: "Retrieve lessons' information successfully",
        lessons: lessons,
        course: req.course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Errors occur when getting all lessons' information",
      });
    }
  }

  static async getLessonWithDocumentAndExam(req, res) {
    let lesson_id = req.params.lesson_id;
    let lessonManager = new LessonManager(req.course.id, lesson_id);

    try {
      const promises = [
        lessonManager.findAllWithDocument(),
        lessonManager.findAllWithExam(),
      ];
      let [documents, exams] = await Promise.all(promises);

      if (!documents.length) {
        res.status(404).json({
          message: "Not found lesson",
        });
        return;
      }

      const lesson_detail = {
        id: lesson_id,
        name: documents[0].lesson_name,
      };

      // Filter
      documents = documents.filter((document) => document.document_id !== null);
      exams = exams.filter((exam) => exam.exam_id !== null);

      res.status(200).json({
        message: "Retrieve lesson's information successfully",
        lesson: lesson_detail,
        documents: documents,
        exams: exams,
        course: req.course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Errors occur when getting lesson's information",
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
    // console.log(">>> LessonsController >> creatLess >> data: ", data);

    try {
      // create Lesson Object by Class Lesson
      const lesson = new Lesson({
        name: data.name,
        course_id: req.course.id,
        is_free: data.is_free,
        is_published: data.is_published,
      });

      if (await lesson.isExist()) {
        res.status(409).json({
          message: "Lesson with the same name has existed",
        });
        return;
      }

      // Update to Database
      const new_lesson = await lesson.create();

      res.status(200).json({
        message: "Create lesson successfully",
        lesson: new_lesson,
        course: req.course,
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({
        message: "Errors occur when creating new lesson",
      });
    }
  }
}

module.exports = LessonsController;
