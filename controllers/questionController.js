const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const fs = require('fs');
const slugify = require('slugify');
const rimraf = require('rimraf');
const { remove_linebreaks } = require('../utils/helperFunctions');
const CodeSubmission = require('../models/codeSubmissionModel');

exports.createQuestion = catchAsync(async (req, res, next) => {
    let slug = slugify(req.body.title, { lower: true });

    req.body.author = req.user._id;
    // Adding slug
    req.body.slug = slug;
    const question = await Question.create(req.body);

    fs.mkdirSync(`onlineJudge/codeQuestions/${slug}`);
    fs.writeFileSync(`onlineJudge/codeQuestions/${slug}/testcase.txt`, remove_linebreaks(req.body.testcases));


    res.status(201).json({
        status: 'success',
        data: {
            data: question
        }
    });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
    req.body.slug = slugify(req.body.title, { lower: true });

    const oldQuestion = await Question.findById(req.params.id).select('-difficulty -description -testcases -solution -sampleInputs -hint -author -noOfInputs -title -__v');

    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!question) {
        return next(new AppError('No coding question found with that ID.', 404));
    }

    if (oldQuestion.slug !== req.body.slug) {
        fs.mkdirSync(`onlineJudge/codeQuestions/${req.body.slug}`);
        // Deletes the question folder
        rimraf.sync(`onlineJudge/codeQuestions/${oldQuestion.slug}`);
    }

    fs.writeFileSync(`onlineJudge/codeQuestions/${req.body.slug}/testcase.txt`, remove_linebreaks(req.body.testcases));

    res.status(200).json({
        status: 'success',
        data: {
            data: question
        }
    });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
    let question = await Question.findOne({ slug: req.params.slug });

    if (!question) {
        return next(new AppError('No coding question found with that ID.', 404));
    }

    // Optional
    let content = fs.readFileSync(`onlineJudge/codeQuestions/${req.params.slug}/testcase.txt`);

    question.testcases = content.toString();

    res.status(200).json({
        status: 'success',
        data: {
            data: question
        }
    });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
    let currentUserSubs;
    let filterObj = {};
    let questions;

    if (req.user.role === 'student') {
        let temp = await CodeSubmission.find({ user: req.user._id }).select('question -_id');
        currentUserSubs = temp.map(ele => ele.question);

        questions = await Question.find({
            _id: {
                $nin: currentUserSubs
            }
        }).select('-description -testcases -solution -noOfInputs -hint').populate({
            path: 'author',
            select: '-photo -email -currentTest -testWillEndAt -testStartedAt -__v'
        });
    }
    else if (req.user.role === 'faculty') {
        filterObj.author = req.user._id;
        questions = await Question.find(filterObj).select('-description -testcases -solution -noOfInputs -hint').populate({
            path: 'author',
            select: '-photo -email -currentTest -testWillEndAt -testStartedAt -__v'
        });
    } else {
        questions = await Question.find().select('-description -testcases -solution -noOfInputs -hint').populate({
            path: 'author',
            select: '-photo -email -currentTest -testWillEndAt -testStartedAt -__v'
        });
    }

    res.status(200).json({
        status: 'success',
        results: questions.length,
        data: {
            questions
        }
    });

    // const questions = await Question.find({});

    // res.status(200).json({
    //     status: 'success',
    //     results: questions.length,
    //     data: {
    //         questions
    //     }
    // });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
        return next(new AppError('No coding question found with that ID.', 404));
    }

    await CodeSubmission.deleteMany({ question: req.params.id });

    // Deletes the question folder
    rimraf.sync(`onlineJudge/codeQuestions/${question.slug}`);

    res.status(204).json({
        status: 'success',
        data: null
    });
});
