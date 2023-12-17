const Language = require("../models/Languages.model");
const { validationResult, matchedData } = require("express-validator");

const createLanguage = async (req , res) => {
    const errors = validationResult(req); //check validator
    if(!errors.isEmpty()) {
        res.status(422).send(errors);
        return;
    }

    const data = matchedData(req); //lay value trong req

    try {
        const newLanguage = new Language(data);
        const language = await Language.create(newLanguage);

        res.status(201).json({
            message: "Language has been created",
            language: language,
          });
    } catch (err) {
        console.log(err);

        if(err.code == "ER_DUP_ENTRY"){
            res.status(409).json({
                message: "This language is already exist",
            });
            return;   
        }
        res.status(500).json({
            message: "Errors occur when creating new language",
        });
    }
};

const getLanguage = async (req , res) => {
    try {
        const language = await Language.findOne({id: req.params.id});
        
        if(!language) {
            res.status(404).json({
                message: "Not found language",
            });
        }
        else {
            res.status(200).json({
                message: "Retrieve language successfully",
                language: language,
            });
        }
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "errors occur when getting language",
        });
    }
};

const getAllLanguages = async (req , res) => {
    try {
        const languages = await Language.getAll();
        
        res.status(200).json({
            message: "Retrieve language successfully",
            languages: languages,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when getting all languages",
        });
    }
};

const updateLanguage = async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).send(errors);
        return;
    }

    const data = matchedData(req);
    if(!Object.keys(data).length) { // neu data rong thi tra ve loi
        res.status(400).json({
            message: "Must provide valid fields",
        });
        return;
    }

    try {
        const languages = await Language.updateById(req.params.id , data);
        if(!languages) {
            res.status(404).json({
                message: "Not found language id",
            });
        }
        else {
            res.status(200).json({
                message: "Language has been updated",
                languages: languages,
            });
        }
    }
    catch {
        console.log(err);

        res.status(500).json({
            message: "Errors occur when updating language",
        });
    }
};

const deleteLanguageById = async (req , res) => {
    try {
        const language = await Language.deleteById(req.params.id);

        if(!language) {
            res.status(404).json({
                message: "Not found language id",
            });
        }
        else {
            res.status(200).json ({
                message: "Language has been deleted",
                language: languages
            });
        }
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Errors occur when deleting language",
        });
    }
};

module.exports = {
    createLanguage,
    getLanguage,
    getAllLanguages,
    updateLanguage,
    deleteLanguageById,
};