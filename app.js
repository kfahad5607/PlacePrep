const express = require('express');
const onlineJudgeroutes = require('./routes/onlineJudgeRoutes');
const questionRouter = require('./routes/questionRoutes');
const quizQuestionRouter = require('./routes/quizQuestionRoutes');
const quizRouter = require('./routes/quizRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Parsing the data into body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/quizQuestions', quizQuestionRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/onlineJudge', onlineJudgeroutes);


// IF NO ROUTES GOT MATCHED( matlab agar kisine galat url daala tab )
// should be at the end of all the routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);


// app.get('/run1', (req, res) => {
//     exec('g++ ./main1.cpp -o main', (err, stdout, stderr) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('output', stdout);
//         }
//     });

//     res.json({
//         data: 'running...'
//     });
// });

// app.get('/run2', (req, res) => {

//     exec('.\\main.exe < ./onlineJudge/input.txt ', (err, stdout, stderr) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('output', stdout);
//         }
//     });

//     res.json({
//         data: 'running...'
//     });
// });

module.exports = app;