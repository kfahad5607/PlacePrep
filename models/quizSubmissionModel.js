const mongoose = require('mongoose');

const quizSubmissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    quiz: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quiz'
    },
    userAnswers: {
        type: [Object]
    },
    score: {
        type: Number,
        default: 30
    },
    timeTaken: {
        type: Object,
        default: {
            minutes: 0,
            seconds: 0
        }
    },
    valid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }

});

quizSubmissionSchema.index(
    {
        user: 1,
        quiz: 1
    },
    {
        unique: true
    }
);

const QuizSubmission = mongoose.model('QuizSubmission', quizSubmissionSchema);

module.exports = QuizSubmission;