const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const CodeSubmission = require('../models/codeSubmissionModel');
const solutionTesterC = require('../onlineJudge/tester/solutionTesterC');
const solutionTesterPython = require('../onlineJudge/tester/solutionTesterPython');
const solutionTesterCPP = require('../onlineJudge/tester/solutionTesterCPP');
const solutionTesterJava = require('../onlineJudge/tester/solutionTesterJava');
const solutionRunnerC = require('../onlineJudge/tester/solutionRunnerC');
const solutionRunnerPython = require('../onlineJudge/tester/solutionRunnerPython');
const solutionRunnerCPP = require('../onlineJudge/tester/solutionRunnerCPP');
const solutionRunnerJava = require('../onlineJudge/tester/solutionRunnerJava');
const fs = require('fs');
const rimraf = require('rimraf');


exports.runCode = catchAsync(async (req, res, next) => {
    let { lang } = req.body;

    let ext = '.java';
    if (lang === 'text/x-csrc') {
        ext = '.c';
    }
    else if (lang === 'text/x-c++src') {
        ext = '.cpp';
    }
    else if (lang === 'text/x-python') {
        ext = '.py';
    }

    let testcaseFile = `onlineJudge/codeQuestions/${req.body.slug}/testcase.txt`;
    let file = `onlineJudge/temp/user-${req.body.slug}-${req.user._id}/solution${ext}`;
    fs.mkdirSync(`onlineJudge/temp/user-${req.body.slug}-${req.user._id}`);
    fs.writeFileSync(file, req.body.code);

    let { noOfInputs } = req.body;
    let data;
    if (lang === 'text/x-csrc') {
        data = await solutionRunnerC(file, testcaseFile, noOfInputs);
    }
    else if (lang === 'text/x-c++src') {
        data = await solutionRunnerCPP(file, testcaseFile, noOfInputs);
    }
    else if (lang === 'text/x-java') {
        data = await solutionRunnerJava(file, testcaseFile, noOfInputs);
    }
    else if (lang === 'text/x-python') {
        data = await solutionRunnerPython(file, testcaseFile, noOfInputs);
    }
    else {
        data = 'Unexpected language!';
    }

    rimraf.sync(`onlineJudge/temp/user-${req.body.slug}-${req.user._id}`);

    res.status(200).json({
        status: 'success',
        data
    });
});


exports.submitCode = catchAsync(async (req, res, next) => {
    let { lang } = req.body;
    let language;

    let ext = '.java';
    if (lang === 'text/x-csrc') {
        ext = '.c';
    }
    else if (lang === 'text/x-c++src') {
        ext = '.cpp';
    }
    else if (lang === 'text/x-python') {
        ext = '.py';
    }

    let testcaseFile = `onlineJudge/codeQuestions/${req.body.slug}/testcase.txt`;
    let file = `onlineJudge/temp/user-${req.body.slug}-${req.user._id}/solution${ext}`;
    fs.mkdirSync(`onlineJudge/temp/user-${req.body.slug}-${req.user._id}`);
    fs.writeFileSync(file, req.body.code);

    let { noOfInputs } = req.body;
    let data;
    if (lang === 'text/x-csrc') {
        data = await solutionTesterC(file, testcaseFile, noOfInputs);
        language = 'C';
    }
    else if (lang === 'text/x-c++src') {
        data = await solutionTesterCPP(file, testcaseFile, noOfInputs);
        language = 'C++';
    }
    else if (lang === 'text/x-java') {
        data = await solutionTesterJava(file, testcaseFile, noOfInputs);
        language = 'Java';
    }
    else if (lang === 'text/x-python') {
        data = await solutionTesterPython(file, testcaseFile, noOfInputs);
        language = 'Python';
    }
    else {
        data = 'Unexpected language!';
    }

    rimraf.sync(`onlineJudge/temp/user-${req.body.slug}-${req.user._id}`);

    let submissionObj = {
        question: req.params.id,
        user: req.user._id,
        language: language,
        userSolution: req.body.code,
        createdAt: Date.now()
    };

    if (data.message === 'success') {
        submissionObj.status = 'Accepted';
    }
    else if (data.message === 'fail') {
        submissionObj.status = 'Not Accepted';
    }
    else if (data.message === 'code error') {
        submissionObj.status = data.errorType;
    }

    const codeSubmission = await CodeSubmission.findOneAndUpdate({
        question: submissionObj.question,
        user: submissionObj.user
    }, submissionObj, {
        runValidators: true,
        new: true
    });

    console.log('data', data);

    res.status(200).json({
        status: 'success',
        data: {
            data,
            codeSubmission
        }
    });
});