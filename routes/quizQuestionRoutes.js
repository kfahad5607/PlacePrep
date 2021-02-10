const express = require('express');
const quizQuestionController = require('../controllers/quizQuestionController');

const router = express.Router();

router
    .route('/')
    // .post(quizQuestionController.createQuizQuestion)
    .post(quizQuestionController.createManyQuizQuestions)
    .get(quizQuestionController.getAllQuizQuestions);

router
    .route('/:id')
    .get(quizQuestionController.getQuizQuestion)
    .patch(quizQuestionController.updateQuizQuestion)
    .delete(quizQuestionController.deleteQuizQuestion);

module.exports = router;