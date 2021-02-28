const CodeSubmission = require('../models/codeSubmissionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCodeSubmissions = catchAsync(async (req, res, next) => {
    let filterObj = {};
    if (req.query.user) {
        filterObj.user = req.query.user;
    }
    if (req.query.code) {
        filterObj.question = {
            _id: req.query.code
        };
    }
    const codeSubmissions = await CodeSubmission.find(filterObj).select('-userSolution').populate({
        path: 'question user',
        select: 'title name'
    });

    res.status(200).json({
        status: 'success',
        results: codeSubmissions.length,
        data: {
            codeSubmissions
        }
    });
});

exports.getCodeSubmission = catchAsync(async (req, res, next) => {
    const codeSubmission = await CodeSubmission.findById(req.params.id).populate({
        path: 'question',
        select: '-__v'
    });

    if (!codeSubmission) {
        return next(new AppError('No code submission found with that ID.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: codeSubmission
        }
    });
});


exports.updateCodeSubmission = catchAsync(async (req, res, next) => {
    const codeSubmission = await CodeSubmission.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!codeSubmission) {
        return next(new AppError('No code submission found with that ID.', 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: codeSubmission
        }
    });
});


exports.deleteCodeSubmission = catchAsync(async (req, res, next) => {
    const codeSubmission = await CodeSubmission.findByIdAndDelete(req.params.id);

    if (!codeSubmission) {
        return next(new AppError('No code submission found with that ID.', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});