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
    const questions = await AptiQuestion.find({ categorySlug: req.query.categorySlug, topicSlug: req.query.topicSlug });

    res.status(200).json({
        status: "success",
        results: questions.length,
        data: {
            data: questions,
        }
    });
});

exports.createManyQuestions = catchAsync(async (req, res, next) => {
    req.body.aptiQuestions = req.body.aptiQuestions.map(ele => {
        ele.topicSlug = slugify(ele.topic, { lower: true });
        ele.categorySlug = slugify(ele.category, { lower: true });
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
    req.body.topicSlug = slugify(req.body.topic, { lower: true });
    req.body.categorySlug = slugify(req.body.category, { lower: true });
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

exports.deleteManyQuestions = catchAsync(async (req, res, next) => {
    await AptiQuestion.deleteMany({ category: req.query.category, topic: req.query.topic });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getAllDistinctVal = catchAsync(async (req, res, next) => {
    let distinctCategory = await AptiQuestion.distinct('category');
    if (distinctCategory.includes('other topics')) {
        distinctCategory = distinctCategory.filter(ele => ele !== 'other topics');
        distinctCategory.push('other topics');
    }
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