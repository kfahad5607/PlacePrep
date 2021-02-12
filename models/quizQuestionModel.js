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
    topic: {
        type: String,
        required: [true, "Each question must belong to particular topic"]
    },
    correctAnswer: {
        type: String,
        select: false
        // required: [true, 'Correct option is required.']
    },
    category: {
        type: String,
        // default: 'Quants',
        enum: {
            values: ['Quants', 'Logical','Verbal', 'other'],
            message: 'category is either: Quants, Logical or Verbal'
        }
    },
    explanation: {
        type: String,
        default: 'No answer description available for this question'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);

module.exports = QuizQuestion;