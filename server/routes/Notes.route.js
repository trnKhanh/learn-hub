//only student learn the course can add note
// 1 student 1 course ==> 1 note

const noteController = require('../controllers/Notes.controller');
const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/Auth.middleware');
const { validateNotesAccessPermission } = require('../middlewares/Notes.middleware');

const {
    createNoteScheme,
    updateNoteScheme,
} = require('../middlewares/validators/Notes.validator');

router.get(
    '/', 
    [validateToken],
    noteController.getAllNotes
); //student get all notes of all the courses he/she has been learning

router.get(
    '/:course_id',
    [validateToken, validateNotesAccessPermission],
    noteController.getNotesOfCourseId
); //student get note by id

router.post(
    '/:course_id',
    [validateToken, validateNotesAccessPermission, createNoteScheme],
    noteController.createNote,
); //student create note

router.patch(
    '/:course_id',
    [validateToken, validateNotesAccessPermission, updateNoteScheme],
    noteController.updateNoteByCourseId,
); //student update note

router.delete(
    '/:course_id',
    [validateToken, validateNotesAccessPermission],
    noteController.deleteNoteByCourseId,
); //student delete note

module.exports = router;