const express = require("express");
const aptiQuestionController = require("../controllers/aptiQuestionController");
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/getdistinctval', aptiQuestionController.getAllDistinctVal);
router.patch('/updatetopic', aptiQuestionController.updateTopic);

router
    .route("/")
    .get(aptiQuestionController.getAllQuestions)
    .post(authController.restrictTo('faculty', 'admin'), aptiQuestionController.createManyQuestions);

router
    .route("/:id")
    .get(aptiQuestionController.getQuestion)
    .patch(authController.restrictTo('faculty', 'admin'), aptiQuestionController.updateQuestion)
    .delete(authController.restrictTo('faculty', 'admin'), aptiQuestionController.deleteQuestion);


module.exports = router;
