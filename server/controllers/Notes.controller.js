const Note = require("../models/Notes.model");

const {validationResult, matchedData} = require("express-validator");

//get all notes of all the courses the student has been learning
const getAllNotes = async (req, res) => {
    try {
        const student_id = req.user.id;
        const notes = await Note.findAll(student_id);
        if (!notes.length) {
            res.status(404).json({
                message: "Not found notes",
            });
        } else {
            res.status(200).json({
                message: "Retrieve note's information successfully",
                notes: notes,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when getting note's information",
        });
    }
};

//get notes of a specific course
const getNotesOfCourseId = async (req, res) => {
    try {
        const note = await Note.getNotesOfCourse({
            course_id: req.params.course_id, 
            student_id: req.user.id
        });

        if (!note) {
            res.status(404).json({
                message: "Not found notes",
            });
        } else {
            res.status(200).json({
                message: "Retrieve note's information successfully",
                note: note,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when getting note's information",
        });
    }
};

const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send(errors);
        return;
    }

    const data = matchedData(req);
    data.course_id = req.params.course_id;
    data.student_id = req.user.id;

    try {
        const newNote = new Note(data);
        const note = await Note.create(newNote);

        res.status(201).json({
            message: "Create note successfully",
            note: note,
        });
    } catch (err) {
        console.log(err);

        if(err.code == "ER_DUP_ENTRY") {
            res.status(409).json({
                message: "Note already exists",
            });
            return;
        }

        res.status(500).json({
            message: "Errors occur when creating note",
        });
    }
};

const updateNoteByCourseId = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send(errors);
        return;
    }

    const data = matchedData(req);
    if(!Object.keys(data).length) {
        res.status(400).json({
            message: "No data to update",
        });
        return;
    }

    try {
        const note = await Note.updateByCourseId({course_id: req.params.course_id, student_id: req.user.id}, data);

        if(!note) {
            res.status(404).json({
                message: "Not found note",
            });
            return;
        }
        else {
            res.status(200).json({
                message: "Update note successfully",
                note: note,
            });
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Errors occur when updating note",
        });
    }
};

const deleteNoteByCourseId = async (req, res) => {
    try {
        const note = await Note.deleteByCourseId({course_id: req.params.course_id, student_id: req.user.id});

        if(!note) {
            res.status(404).json({
                message: "Not found note",
            });
        }
        else {
            res.status(200).json({
                message: "Delete note successfully",
                note: note,
            });
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Errors occur when deleting note",
        });
    }
}

module.exports = { 
    getAllNotes,
    getNotesOfCourseId,
    createNote,
    updateNoteByCourseId,
    deleteNoteByCourseId,
};