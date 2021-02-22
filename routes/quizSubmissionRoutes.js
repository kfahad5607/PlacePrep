const express = require('express');
const quizSubmissionController = require('../controllers/quizSubmissionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(quizSubmissionController.getAllQuizSubmissions);

router
    .route('/:id')
    .get(quizSubmissionController.getQuizSubmission)
    .patch(authController.restrictTo('faculty', 'admin'), quizSubmissionController.updateQuizSubmission)
    .delete(authController.restrictTo('faculty', 'admin'), quizSubmissionController.deleteQuizSubmission);


module.exports = router;