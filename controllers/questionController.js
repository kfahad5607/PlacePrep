const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createQuestion = catchAsync(async (req, res) => {
    const question = await Question.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: question
        }
    });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!question) {
        return next(new AppError('No coding question found with that ID.', 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: question
        }
    });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findOne({ slug: req.params.slug });

    if (!question) {
        return next(new AppError('No coding question found with that ID.', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: question
        }
    });
});

exports.getAllQuestions = catchAsync(async (req, res) => {
    const questions = await Question.find({});

    res.status(200).json({
        status: 'success',
        results: questions.length,
        data: {
            questions
        }
    });
});


exports.deleteQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
        return next(new AppError('No coding question found with that ID.', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
