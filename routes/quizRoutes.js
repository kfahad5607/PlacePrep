const express = require('express');
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect);

router
    .route('/submit/:id')
    .post(quizController.submitQuiz);

router
    .route('/start/:id')
    .get(quizController.startQuiz);

router
    .route('/')
    .post(quizController.createQuiz)
    .get(quizController.getAllQuizzes);


router
    .route('/:slug')
    .get(quizController.getQuiz)
    // .patch(quizController.updateQuiz)
    // .delete(quizController.deleteQuiz);

router
    .route('/:id')
    .get(quizController.getQuiz)
    .patch(quizController.updateQuiz)
    .delete(quizController.deleteQuiz);


module.exports = router;