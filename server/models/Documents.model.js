// models
const LessonManager = require("./LessonManager.model");

class Documents {
  constructor(document) {
    this.course_id = document.course_id || null;
    this.lesson_id = document.lesson_id || null;
    this.name = document.name || null;
    this.path = document.path || null;
  }

  static async getAll(document) {
    try {
      let lessonManager = new LessonManager(
        document.course_id,
        document.lesson_id
      );
      let documents = await lessonManager.findAllWithDocument();
      return documents;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  static async findOne(document) {
    try {
      let lessonManager = new LessonManager(
        document.course_id,
        document.lesson_id
      );
      let documents = await lessonManager.findAllWithDocument({
        id: document.id,
      });

      if (!documents.length) {
        return null;
      }
      return documents[0];
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }
}

module.exports = Documents;
