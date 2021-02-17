const express = require('express');
const quizSubmissionController = require('../controllers/quizSubmissionController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect);

router
    .route('/')
    .get(quizSubmissionController.getAllQuizSubmissions);

router
    .route('/:id')
    .get(quizSubmissionController.getQuizSubmission)
    .patch(quizSubmissionController.updateQuizSubmission)
    .delete(quizSubmissionController.deleteQuizSubmission);


module.exports = router;