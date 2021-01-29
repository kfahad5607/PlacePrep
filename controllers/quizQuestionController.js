const QuizQuestion = require('../models/quizQuestionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createManyQuizQuestions = catchAsync(async (req, res) => {
    console.log('qqq', req.body.quizQuestions)
    const quizQuestions = await QuizQuestion.insertMany(req.body.quizQuestions);
    
    console.log('qqq', quizQuestions.map(qq => qq._id) )
    res.status(201).json({
        status: 'success',
        data: {
            data: quizQuestions
        }
    });
});

exports.createQuizQuestion = catchAsync(async (req, res) => {
    const quizQuestion = await QuizQuestion.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: quizQuestion
        }
    });
});

exports.updateQuizQuestion = catchAsync(async (req, res) => {
    const quizQuestion = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!quizQuestion) {
        return next(new AppError('No quiz question found with that ID.', 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: quizQuestion
        }
    });
});

exports.getQuizQuestion = catchAsync(async (req, res) => {
    const quizQuestion = await QuizQuestion.findById(req.params.id);

    if (!quizQuestion) {
        return next(new AppError('No quiz question found with that ID.', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: quizQuestion
        }
    });
});

exports.getAllQuizQuestions = catchAsync(async (req, res) => {
    const quizQuestions = await QuizQuestion.find({});

    res.status(200).json({
        status: 'success',
        results: quizQuestions.length,
        data: {
            quizQuestions
        }
    });
});

exports.deleteQuizQuestion = catchAsync(async (req, res) => {
    const quizQuestion = await QuizQuestion.findByIdAndDelete(req.params.id);

    if (!quizQuestion) {
        return next(new AppError('No quiz question found with that ID.', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
