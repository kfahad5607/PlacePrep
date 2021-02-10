const express = require("express");
const aptiQuestionController = require("../controllers/aptiQuestionController");

const router = express.Router();

router
    .route("/")
    .get(aptiQuestionController.getAllQuestions)
    .post(aptiQuestionController.createQuestion);

router
    .route("/:id")
    .get(aptiQuestionController.getQuestion)
    .patch(aptiQuestionController.updateQuestion)
    .delete(aptiQuestionController.deleteQuestion);


module.exports = router;
