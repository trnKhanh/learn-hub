const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

class Note {
    constructor(note) {
        this.course_id = note.course_id;
        this.student_id = note.student_id;
        this.content = note.content;
    }

    static queryFields = `course_id, student_id, content`;

    static create = async (newNote) => {
        const con = await sql.getConnection();
        try {
            await con.beginTransaction();

            const [res, _] = await sql.query(
                `INSERT INTO notes SET ?`,
                newNote,
            );

            const [rows, fields] = await sql.query(
                `SELECT ${Note.queryFields} 
                FROM notes 
                WHERE course_id=? and student_id=?`,
                [newNote.course_id, newNote.student_id],
            );

            await con.commit();
            sql.releaseConnection(con);

            console.log("Created note: ", {
                newNote: rows[0],
                results: res,
            });
            return rows[0];
        }
        catch (err) {
            await con.rollback();
            sql.releaseConnection(con);

            throw err;
        }
    };

    static findAll = async (student_id) => {
        const [rows, fields] = await sql.query(
            `SELECT ${Note.queryFields} 
            FROM notes
            WHERE student_id=?`,
            student_id,
        );
        console.log("Get all notes: ", { results: rows });
        return rows;
    };

    static getNotesOfCourse = async (filters) => {
        const { filterKeys, filterValues } = formatFilters(filters);
        const [rows, fields] = await sql.query(
            `SELECT ${Note.queryFields} 
            FROM notes 
            WHERE ${filterKeys}`,
            filterValues,
        );

        if(rows.length) {
            console.log("Found notes: ", { filters: filters, results: rows[0] });
            return rows[0];
        }
        else {
            console.log("Found no notes: ", { filters: filters });
            return null;
        }
    };

    static updateByCourseId = async (filters, columns) => {
        const { filterKeys, filterValues } = formatFilters(filters);
        const con = await sql.getConnection();
        try {
            await con.beginTransaction();

            const [res, _] = await sql.query(
                `UPDATE notes SET ? 
                WHERE ${filterKeys}`,
                [columns, ...filterValues],
            );

            const [rows, fields] = await sql.query(
                `SELECT ${Note.queryFields} 
                FROM notes 
                WHERE ${filterKeys}`,
                filterValues,
            );

            await con.commit();
            sql.releaseConnection(con);

            console.log("Updated note: ", {
                filters: filters,
                newNote: rows[0],
                results: res,
            });

            if(res.affectedRows == 0) return null;
            else return rows[0];
        }
        catch (err) {
            await con.rollback();
            sql.releaseConnection(con);

            throw err;
        }
    };

    static deleteByCourseId = async (filters) => {
        const { filterKeys, filterValues } = formatFilters(filters);
        const con = await sql.getConnection();
        
        try {
            await con.beginTransaction();

            const [res, _] = await sql.query(
                `DELETE FROM notes 
                WHERE ${filterKeys}`,
                filterValues,
            );

            await con.commit();
            sql.releaseConnection(con);

            console.log("Deleted note: ", {
                filters: filters,
                results: res,
            });

            if(res.affectedRows == 0) return null;
            else return res;
        }
        catch (err) {
            await con.rollback();
            sql.releaseConnection(con);

            throw err;
        }
    };
};

module.exports = Note;