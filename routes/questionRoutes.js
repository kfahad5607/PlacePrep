const express = require('express');
const questionController = require('../controllers/questionController')

const router = express.Router();

router.route('/').get(questionController.getAllQuestions).post(questionController.createQuestion);
router.get('/:slug', questionController.getQuestion)
router
    .route('/:id')
    .patch(questionController.updateQuestion)
    .delete(questionController.deleteQuestion)

module.exports = router;