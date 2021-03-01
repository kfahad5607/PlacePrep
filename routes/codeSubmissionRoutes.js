const express = require('express');
const codeSubmissionController = require('../controllers/codeSubmissionController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(codeSubmissionController.getAllCodeSubmissions);

router
    .route('/:id')
    .get(codeSubmissionController.getCodeSubmission)
    .delete(codeSubmissionController.deleteCodeSubmission)
    .patch(codeSubmissionController.updateCodeSubmission);


module.exports = router;
