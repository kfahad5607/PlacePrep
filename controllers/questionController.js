const Question = require('../models/questionModel');

exports.createQuestion = async (req, res) => {
    const question = await Question.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: question
        }
    });
};

exports.updateQuestion = async (req, res) => {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!question) {
        return res.status(404).json({
            status: 'fail',
            error: 'question not found'
        });
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: question
        }
    });
};

exports.getQuestion = async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        return res.status(404).json({
            status: 'fail',
            error: 'question not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: question
        }
    });
};

exports.getAllQuestions = async (req, res) => {
    const questions = await Question.find({});

    res.status(200).json({
        status: 'success',
        results: questions.length,
        data: {
            questions
        }
    });
}


exports.deleteQuestion = async (req, res) => {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
        return res.status(404).json({
            status: 'fail',
            error: 'No question found with that id'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}
