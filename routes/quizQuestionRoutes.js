const express = require('express');
const quizQuestionController = require('../controllers/quizQuestionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    // .post(quizQuestionController.createQuizQuestion)
    .post(authController.restrictTo('faculty', 'admin'), quizQuestionController.createManyQuizQuestions)
    .get(quizQuestionController.getAllQuizQuestions);

router
    .route('/:id')
    .get(quizQuestionController.getQuizQuestion)
    .patch(authController.restrictTo('faculty', 'admin'), quizQuestionController.updateQuizQuestion)
    .delete(authController.restrictTo('faculty', 'admin'), quizQuestionController.deleteQuizQuestion);

module.exports = router;