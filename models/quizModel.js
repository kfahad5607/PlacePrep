const mongoose = require('mongoose');
const QuizQuestion = require('../models/quizQuestionModel');
const slugify = require('slugify');

const quizSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    topic: {
        type: String,
        required: [true, "Each quiz must belong to particular topic"]
    },
    category: {
        type: String,
        enum: ['quants', 'logical', 'other'],
        default: 'quants'
    },
    title: {
        type: String,
        required: [true, 'Quiz title is required.'],
        unique: true,
        trim: true
    },
    questions: [{
        type: mongoose.Schema.ObjectId,
        ref: 'QuizQuestion'
    }],
    // startTime: {
    //     type: Date,
    //     default: '2021-01-26T17:25',
    // },
    // endTime: {
    //     type: Date,
    //     default: '2021-01-26T17:30',
    // },
    duration: {
        type: Number, // minutes
        default: 3
    },
    questionWeightage: {
        type: Number,
        default: 2
    },
    active: {
        type: Boolean,
        default: true
        // select: false
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        set: () => Date.now()
        // select: false
    }
});

quizSchema.post('findOneAndDelete', async function (doc) {
    await QuizQuestion.deleteMany({
        _id: {
            $in: doc.questions
        }
    });
});


quizSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

quizSchema.pre('findOneAndUpdate', function (next) {
    this.populate({
        path: 'questions',
        select: '-__v'
    });

    next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;