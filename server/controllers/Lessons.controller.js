const { validationResult, matchedData } = require("express-validator");

// models
const Document = require("../models/Documents.model");
const Lesson = require("../models/Lessons.model");
const LessonManager = require("../models/LessonManager.model");
const Exam = require("../models/Exams.model");
const fs = require("fs");
const CHUNK_SIZE = 1024 * 1024;

class LessonsController {
  static async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
      return;
    }

    const data = matchedData(req);
    data.course_id = req.course.id;

    try {
      // create Lesson Object by Class Lesson
      const lesson = new Lesson(data);
      // Update to Database
      const new_lesson = await lesson.create();

      if (!new_lesson) {
        res.status(500).json({
          message: "Errors occur when creating new lesson",
        });
        return;
      }

      res.status(200).json({
        message: "Create lesson successfully",
        lesson: new_lesson,
        course: req.course,
      });
    } catch (err) {
      // console.log(err);
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).json({
          message: "This lesson is already existed",
        });
        return;
      }

      res.status(500).json({
        message: "Errors occur when creating new lesson",
      });
    }
  }

  static async getAllLessons(req, res) {
    //let lessonManager = new LessonManager(req.course.id);

    try {
      // const lessons = await lessonManager.findAll();
      const lessons = await new Lesson({
        course_id: req.course.id,
      }).findAll();

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

  static async getAllPublishedLessons(req, res) {
    // let lessonManager = new LessonManager(req.course.id);

    try {
      // const lessons = await lessonManager.findAll({
      //   isPublished: true,
      // });
      const lessons = await new Lesson({
        course_id: req.course.id,
      }).findAll({
        isPublished: true,
      });
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

  static async getLessonWithDocumentAndExamById(req, res) {
    const lesson_id = req.params.lesson_id;
    const course_id = req.course.id;
    // let lessonManager = new LessonManager(course_id, lesson_id);
    //console.log(req);
    try {
      const promises = [
        new Lesson({ course_id: course_id }).findOne({ id: lesson_id }),
        new Document({ lesson_id: lesson_id, course_id: course_id }).findAll(),
        new Exam({ lesson_id: lesson_id, course_id: course_id }).findAll(),
      ];
      let [lesson, documents, exams] = await Promise.all(promises);

      if (!lesson) {
        res.status(404).json({
          message: "Not found lesson",
        });
        return;
      }

      res.status(200).json({
        message: "Retrieve lesson's information successfully",
        lesson: lesson,
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

  static async update(req, res) {
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
      return;
    }

    const data = matchedData(req);
    if (req.file) {
      data.videoUrl = req.file.path;
    }
    if (!Object.keys(data).length) {
      res.status(400).json({
        message: "Must provide valid fields",
      });
      return;
    }

    const lesson_id = req.params.lesson_id;
    const course_id = req.params.course_id;

    data.id = lesson_id;
    data.course_id = course_id;

    try {
      // create Lesson Object by Class Lesson
      const lesson = new Lesson(data);

      // Update to Database
      const updated_lesson = await lesson.updateById(data);

      if (!updated_lesson) {
        res.status(404).json({
          message: "Not found lesson",
        });
        return;
      }

      res.status(200).json({
        message: "Update lesson successfully",
        lesson: updated_lesson,
        course: req.course,
      });
    } catch (err) {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).json({
          message: "This lesson is already existed",
        });
        return;
      }
      res.status(500).json({
        message: "Errors occur when updating lesson",
      });
    }
  }

  static async delete(req, res) {
    const lesson_id = req.params.lesson_id;
    const course_id = req.course.id;

    try {
      const deleted_lesson = await new Lesson({
        id: lesson_id,
        course_id: course_id,
      }).deleteById();

      if (!deleted_lesson) {
        res.status(404).json({
          message: "Not found lesson",
        });
        return;
      }

      res.status(200).json({
        message: "Delete lesson successfully",
        lesson: deleted_lesson,
        course: req.course,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Errors occur when deleting lesson",
      });
    }
  }

  static streamVideo = async (req, res) => {
    const range = req.headers.range;
    if (!range) {
      res.status(400).json({
        message: "Stream video require range headers",
      });
      return;
    }
    if (!range.startsWith("bytes=")) {
      res.status(400).json({
        message: "Invalid range headers",
      });
      return;
    }
    try {
      const videoPath = `./uploads/courses/${req.params.course_id}/lessons/${req.params.lesson_id}/video.mp4`;
      const parts = range.substring("bytes=".length).split("-");
      const start = parseInt(parts[0]);
      const end = parts[1].length > 1 ? parseInt(parts[1]) : start + CHUNK_SIZE;
      const contentLength = end - start + 1;
      console.log(parts);

      const videoSize = fs.statSync(videoPath).size;

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, {
        start,
        end,
      });

      videoStream.pipe(res);
    } catch (err) {
      console.log(err);
      if (err.code == "ENOENT") {
        res.status(404).json({
          message: "No file found with provided path",
        });
      }
    }
  };
}

module.exports = LessonsController;
