const sql = require("../database/db");

class Subject {
    static queryFields = `id, name`;

    static getAll = async () => {
        const [rows, fields] = await sql.query(
            `SELECT ${Subject.queryFields} FROM subjects`,
        );
        //console.log("Get all courses: ", { results: rows });
        return rows;
    };

    static getSubjectsOfCourse = async (courseId) => {
        const [rows, fields] = await sql.query(
            `SELECT ${Subject.queryFields} FROM courses_subjects c, subjects s WHERE c.subject_id = s.id and c.course_id=?`,
            [courseId],
        );
        return rows;
    };

}

module.exports = Subject;