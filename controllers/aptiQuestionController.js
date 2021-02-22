const AptiQuestion = require("../models/aptiQuestionModel");
const slugify = require('slugify');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getQuestion = catchAsync(async (req, res, next) => {
    const question = await AptiQuestion.findById(req.params.id);

    if (!question) {
        return next(new AppError('No question found with that ID.', 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            data: question,
        },
    });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
    const questions = await AptiQuestion.find({ slug: req.query.slug });

    res.status(200).json({
        status: "success",
        results: questions.length,
        data: {
            data: questions,
        }
    });
});

exports.createManyQuestions = catchAsync(async (req, res, next) => {
    console.log('qqq', req.body.aptiQuestions);
    req.body.aptiQuestions = req.body.aptiQuestions.map(ele => {
        ele.slug = slugify(ele.topic, { lower: true });
        return ele;
    });
    const aptiQuestions = await AptiQuestion.insertMany(req.body.aptiQuestions);

    res.status(201).json({
        status: 'success',
        data: {
            data: aptiQuestions
        }
    });
});

exports.createQuestion = catchAsync(async (req, res, next) => {
    const question = await AptiQuestion.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: question,
        }
    });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
    req.body.slug = slugify(req.body.topic, { lower: true });
    const question = await AptiQuestion.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!question) {
        return next(new AppError('No question found with that ID.', 404));
    }

    res.status(201).json({
        status: "success",
        data: {
            data: question,
        }
    });
});

exports.updateTopic = catchAsync(async (req, res, next) => {
    let newSlug = slugify(req.body.newTopic, { lower: true });
    await AptiQuestion.updateMany({ topic: req.body.oldTopic }, { topic: req.body.newTopic, slug: newSlug }, {
        runValidators: true
    });

    res.status(201).json({
        status: 'success'
    });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
    const question = await AptiQuestion.findByIdAndDelete(req.params.id);

    if (!question) {
        return next(new AppError('No question found with that ID.', 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getAllDistinctVal = catchAsync(async (req, res, next) => {
    let distinctCategory = await AptiQuestion.distinct('category');
    distinctCategory = distinctCategory.filter(ele => ele !== 'other topics');
    distinctCategory.push('other topics');
    const promises = distinctCategory.map(async (ele) => await AptiQuestion.distinct('topic', { category: ele }));

    const distinctTopicByCat = await Promise.all(promises);

    res.status(200).json({
        status: 'success',
        data: {
            distinctCategory,
            distinctTopicByCat
        }
    });
});