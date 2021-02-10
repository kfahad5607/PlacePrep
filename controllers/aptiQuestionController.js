const AptiQuestion = require("../models/aptiQuestionModel");

exports.getQuestion = async (req, res) => {
    const question = await AptiQuestion.findById(req.params.id);

    if (!question) {
        return res.status(404).json({
            status: "fail",
            error: "question not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            data: question,
        },
    });
};

exports.getAllQuestions = async (req, res) => {
    const questions = await AptiQuestion.find({});

    res.status(200).json({
        status: "success",
        results: questions.length,
        data: {
            data: questions,
        },
    });
};

exports.createQuestion = async (req, res) => {
    const question = await AptiQuestion.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: question,
        },
    });
};

exports.updateQuestion = async (req, res) => {
    const question = await AptiQuestion.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!question) {
        return res.status(404).json({
            status: "fail",
            error: "question not found",
        });
    }

    res.status(201).json({
        status: "success",
        data: {
            data: question,
        },
    });
};

exports.deleteQuestion = async (req, res) => {
    await AptiQuestion.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
};
