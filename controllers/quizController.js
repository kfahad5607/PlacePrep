const Quiz = require('../models/quizModel');
const QuizQuestion = require('../models/quizQuestionModel');
const QuizSubmission = require('../models/quizSubmissionModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createQuiz = catchAsync(async (req, res, next) => {
    const quizQuestions = await QuizQuestion.insertMany(req.body.questions);

    // Filtering out only quiz questions IDs
    req.body.questions = quizQuestions.map(qq => qq._id);

    // Adding author
    req.body.author = req.user;
    const quiz = await Quiz.create(req.body);
    // console.log('reeq', req.body)

    res.status(201).json({
        status: 'success',
        data: {
            data: quiz
        }
    });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
    let quizQuestions;
    let updateObj;

    if (req.body.questions) {
        quizQuestions = req.body.questions;
        // Here updateObj will have all the properties of req.body
        // except for questions property
        let { questions, ...copyObj } = req.body;
        updateObj = { ...copyObj };
    }

    console.log('quizques', req.body, updateObj);

    const quiz = await Quiz.findByIdAndUpdate(req.params.id, updateObj, {
        new: true,
        runValidators: true
    });
    if (!quiz) {
        return next(new AppError('No quiz found with that ID.', 404));
    }

    quizQuestions.map(async (qq) => {
        await QuizQuestion.findByIdAndUpdate(qq._id, qq);
    });

    res.status(200).json({
        status: 'success',
        data: {
            data: quiz
        }
    });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        return next(new AppError('No quiz found with that ID.', 404));
    }

    if (quiz.active) {
        return res.status(200).json({
            status: 'success',
            data: {
                data: quiz
            }
        });
    }
    else if (!quiz.active) {
        return res.status(200).json({
            status: 'success',
            message: 'Quiz has been stopped.'
        });
    }
    // else if (quiz.active == 'null') {
    //     if (currentTime < quiz.startTime) {
    //         return res.status(200).json({
    //             status: 'success',
    //             message: 'quiz has not started.'
    //         });
    //     }
    //     else if (currentTime > quiz.endTime) {
    //         return res.status(200).json({
    //             status: 'success',
    //             message: 'quiz has ended.'
    //         });
    //     }
    //     res.status(200).json({
    //         status: 'success',
    //         data: {
    //             data: quiz
    //         }
    //     });
    // }
    // console.log('c1', Date(quiz.endTime));
    // console.log('c2', quiz.startTime > currentTime);
    // console.log('c3', currentTime > quiz.endTime);


    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         data: quiz
    //     }
    // });
});

exports.getAllQuizzes = catchAsync(async (req, res, next) => {
    const quizzes = await Quiz.find({});

    res.status(200).json({
        status: 'success',
        results: quizzes.length,
        data: {
            quizzes
        }
    });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
        return next(new AppError('No quiz found with that ID.', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.submitQuiz = catchAsync(async (req, res, next) => {
    // req.body.userAnswers req.body.quizId
    // console.log('req', req.user);
    const quiz = await Quiz.findById(req.params.id)
        .select('duration questions questionWeightage')
        .populate({
            path: 'questions',
            select: 'correctAnswer'
        });

    if (!quiz) {
        return next(new AppError('No quiz found with that ID.', 404));
    }

    const quizQuesWCorrectAns = quiz.questions;
    const { userAnswers } = req.body;

    let score = 0;

    const data = userAnswers.map((ans, i) => {
        if (ans.correctAnswer == quizQuesWCorrectAns[i].correctAnswer) {
            score = score + quiz.questionWeightage;
            return true;
        }
        return false;
    });

    let submissionObj = {
        quiz: req.params.id,
        score,
        userAnswers,
        user: req.user
    };

    // Checking if quiz submission time has passed 
    // if ((Date.now() - req.user.testStartedAt) / 1000 > (quiz.duration * 60 + 10)) {
    if (Date.now() - req.user.testWillEndAt > 1000) {
        submissionObj.valid = false;
    }

    await QuizSubmission.create(submissionObj);

    // setting testStartedAt, testWillEndAt, currentTest to null
    // const user =  await User
    // .findByIdAndUpdate(req.user._id,
    //     { testStartedAt: null, testWillEndAt: null, currentTest: null },
    //     { new: true, runValidators: true });

    // if (!user) {
    //     return next(new AppError('No user found with that Id.', 404))
    // }

    res.status(200).json({
        status: 'success',
        message: 'Quiz has been submitted.',
        score
    });
});

exports.startQuiz = catchAsync(async (req, res, next) => {
    // let currentTime = new Date(Date.now() + 6000000) 

    // console.log('curr', new Date(Date.now() + 6000000).toLocaleString('en-IN',
    // { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }))
    // console.log('curr1', new Date(Date.now()).toLocaleString('en-IN',
    //     { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }));


    const quiz = await Quiz.findById(req.params.id).populate({
        path: 'questions',
        select: '-__v'
    });

    if (!quiz) {
        return next(new AppError('No quiz found with that ID.', 404));
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        testStartedAt: Date.now() + 10000,
        currentTest: req.params.id,
        testWillEndAt: Date.now() + (quiz.duration * 60000) + (20000)
    }, {
        new: true,
        runValidators: true
    });

    if (!user) {
        return next(new AppError('No user found with that ID.', 404));
    }

    //console.log('quiz', quiz);

    console.log('user.testStartedAt', user.testStartedAt.toLocaleString('en-IN',
        { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    console.log('user.testWillEndAt', user.testWillEndAt.toLocaleString('en-IN',
        { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    res.status(200).json({
        status: 'success',
        message: 'Quiz started',
        quiz
    });
});