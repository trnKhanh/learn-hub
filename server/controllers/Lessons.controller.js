const express = require("express");
const Course = require("../models/Courses.model");
const Lessons = require("../models/Lessons.model");

class LessonsController {
  static async getCourse(req, res, next) {
    let course_id = req.params.course_id;
    try {
      const course = await Course.findOne({ id: course_id });
      if (!course) {
        res.status(404).json({
          message: "Not found course",
        });
      } else {
        req.body.course = course;
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when getting course's information",
      });
    }
  }

  static async getAllLessons(req, res) {
    let lessonManager = new Lessons(req.body.course.id);

    try {
      const lessons = await lessonManager.findAll();
      res.status(200).json({
        message: "Retrieve lessons' information successfully",
        lessons: lessons,
        course: req.body.course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Errors occur when getting all lessons' information",
      });
    }
  }

  static async getLesson(req, res) {
    let lesson_id = req.params.lesson_id;
    let lessonManager = new Lessons(req.body.course.id, lesson_id);

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
        course: req.body.course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Errors occur when getting lesson's information",
      });
    }
  }
}

module.exports = LessonsController;
