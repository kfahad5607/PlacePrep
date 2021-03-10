const Quiz = require('../models/quizModel');
const slugify = require('slugify');
const QuizQuestion = require('../models/quizQuestionModel');
const QuizSubmission = require('../models/quizSubmissionModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createQuiz = async (req, res, next) => {
    try {
        req.body.author = req.user._id;
        const quizQuestions = await QuizQuestion.insertMany(req.body.questions);

        // Filtering out only quiz questions IDs
        req.body.questions = quizQuestions.map(qq => qq._id);

        const quiz = await Quiz.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: quiz
            }
        });
    } catch (err) {
        await QuizQuestion.deleteMany({
            _id: {
                $in: req.body.questions
            }
        });

        res.status(400).json({
            status: 'fail',
            error: err.message
        });
    }

};

exports.updateQuiz = async (req, res, next) => {
    let newQuizQuesIDs;
    let newQuizQuestions;
    try {
        let quizQuestions;
        let updateObj = req.body;

        if (req.body.questions) {
            quizQuestions = req.body.questions;
            // Here updateObj will have all the properties of req.body
            // except for questions property
            let { questions, ...copyObj } = req.body;
            updateObj = { ...copyObj };
        }

        if (updateObj.title) {
            updateObj.slug = slugify(updateObj.title, { lower: true });
        }

        if (quizQuestions) {
            // Filtering any new questions
            newQuizQuestions = quizQuestions.filter((qq) => {
                if (!qq._id) {
                    return qq;
                }
            });
            // Inserting any new questions
            newQuizQuestions = await QuizQuestion.insertMany(newQuizQuestions);
            newQuizQuesIDs = newQuizQuestions.map(ele => ele._id);

            // Adding new questions ID's to existing ID's array
            updateObj.questions = [];
            // Filter is used to check if ele._id exists and 
            // Map is used to return only ele._id instead of ele
            updateObj.questions = [...quizQuestions.filter(ele => ele._id).map(ele => ele._id), ...newQuizQuestions.map(ele => ele._id)
            ];

            // Updating any old questions
            quizQuestions.forEach(async (qq) => {
                if (qq._id) {
                    await QuizQuestion.findByIdAndUpdate(qq._id, qq);
                }
            });
        }

        const quiz = await Quiz.findByIdAndUpdate(req.params.id, updateObj, {
            new: true,
            runValidators: true
        });

        if (!quiz) {
            return next(new AppError('No quiz found with that ID.', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: quiz
            }
        });
    } catch (err) {
        if (newQuizQuestions) {
            await QuizQuestion.deleteMany({
                _id: {
                    $in: newQuizQuesIDs
                }
            });
        }
        res.status(400).json({
            status: 'fail',
            error: err.message
        });
    }

};

exports.getQuiz = catchAsync(async (req, res, next) => {
    // const quiz = await Quiz.findById(req.params.id);
    // temporarily setting user

    const quiz = await Quiz.findOne({ slug: req.params.slug }).populate({
        path: 'questions',
        select: '-__v +correctAnswer'
    });

    if (!quiz) {
        return next(new AppError('No quiz found with that ID.', 404));
    }



    // if (quiz.active) {
    if ((req.user.role === 'faculty' || req.user.role === 'admin') || quiz.active) {
        if (req.query.check === 'true') {
            const submissions = await QuizSubmission.countDocuments({
                quiz: quiz._id
            });
            return res.status(200).json({
                status: 'success',
                data: {
                    data: quiz,
                    subCount: submissions
                }
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                data: quiz,
                subCount: 0
            }
        });
    }
    else if (!quiz.active) {
        return res.status(200).json({
            status: 'success',
            message: 'Quiz is deactivated'
        });
    }

});

exports.getAllQuizzes = catchAsync(async (req, res, next) => {
    let currentUserSubs;
    let filterObj = {};
    let quizzes;

    if (req.user.role === 'student') {
        let temp = await QuizSubmission.find({ user: req.user._id }).select('quiz -_id');
        currentUserSubs = temp.map(ele => ele.quiz);

        quizzes = await Quiz.find({
            _id: {
                $nin: currentUserSubs
            },
            active: true
        }).populate({
            path: 'author',
            select: '+name'
        });
    }
    else if (req.user.role === 'faculty') {
        filterObj.author = req.user._id;
        quizzes = await Quiz.find(filterObj).populate({
            path: 'author',
            select: '+name'
        });
    }
    else if (req.user.role === 'admin') {
        quizzes = await Quiz.find({}).populate({
            path: 'author',
            select: '+name'
        });
    }

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

    await QuizSubmission.deleteMany({ quiz: req.params.id });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.submitQuiz = catchAsync(async (req, res, next) => {
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
        if (ans.selectedAnswer == quizQuesWCorrectAns[i].correctAnswer) {
            score = score + quiz.questionWeightage;
            return true;
        }
        return false;
    });

    let submissionObj = {
        quiz: req.params.id,
        score,
        userAnswers,
        user: req.user._id
    };

    // console.log('validation', Date.now() - new Date(req.user.testWillEndAt) > 1000, Date.now() - new Date(req.user.testWillEndAt));
    // Checking if quiz submission time has passed 
    // if ((Date.now() - req.user.testStartedAt) / 1000 > (quiz.duration * 60 + 10)) {
    // console.log('timeup', Date.now(), new Date(req.user.testWillEndAt).getTime(), Date.now() - new Date(req.user.testWillEndAt).getTime());
    // console.log('timeup1', Date.now() - new Date(req.user.testWillEndAt).getTime() > 1000);
    if (Date.now() - new Date(req.user.testWillEndAt).getTime() > 1500) {
        submissionObj.valid = false;
    }
    let durInSec = Math.round((Date.now() - new Date(req.user.testStartedAt).getTime() - 500) / 1000);
    let durMin = Math.floor(durInSec / 60);
    let durSec = durInSec % 60;

    submissionObj.timeTaken = {};
    submissionObj.timeTaken.minutes = durMin;
    submissionObj.timeTaken.seconds = durSec;

    const quizSubmission = await QuizSubmission.create(submissionObj);


    const user = await User.findByIdAndUpdate(req.user._id, {
        testStartedAt: null,
        currentTest: null,
        testWillEndAt: null
    }, {
        new: true,
        // runValidators: true
    });

    // if (!user) {
    //     return next(new AppError('No user found with that Id.', 404))
    // }

    res.status(200).json({
        status: 'success',
        message: 'Quiz has been submitted.',
        data: {
            quizSubmission
        }
    });
});

exports.startQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id).populate({
        path: 'questions',
        select: '-__v'
    });

    if (!quiz) {
        return next(new AppError('No quiz found with that ID.', 404));
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        testStartedAt: Date.now() + 500,
        currentTest: req.params.id,
        testWillEndAt: Date.now() + (quiz.duration * 60000) + (500)
    }, {
        new: true,
        runValidators: true
    }).populate({
        path: 'currentTest',
        select: 'slug'
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
        data: {
            quiz: quiz,
            user: user
        }
    });
});