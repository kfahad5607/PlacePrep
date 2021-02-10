const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required.'],
        trim: true,
        unique: true
    },
    answers: {
        type: [String],
        required: [true, 'Each must have options.'],
        validate: {
            validator: function (ans) {
                console.log('val', ans);
                return ans.length == 4;
            },
            message: 'Exactly four options are allowed.'
        }
    },
    correctAnswer: {
        type: String,
        select: false
        // required: [true, 'Correct option is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);

module.exports = QuizQuestion;