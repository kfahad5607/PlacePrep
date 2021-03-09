const mongoose = require('mongoose');
const slugify = require('slugify');

const aptiQuestionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: [true, "A Question must have a question"],
        trim: true
    },
    // answers: [String],
    answers: {
        type: [String],
        required: [true, "Each question must have options"],
        validate: {
            validator: function (ans) {
                return ans.length == 4;
            },
            message: "Options should be four"
        }
    },
    correctAnswer: {
        type: String,
        required: [true, "Each question must have correct answer"]
    },
    topic: {
        type: String,
        required: [true, "Each question must belong to particular topic"]
    },
    category: {
        type: String,
        default: 'quantitative analysis',
        enum: {
            values: ['quantitative analysis', 'logical reasoning', 'verbal ability', 'other topics'],
            message: 'category is either: quantitative analysis, logical reasoning, verbal ability or other topics'
        }
    },
    topicSlug: String,
    categorySlug: String,
    explanation: {
        type: String,
        default: 'No answer description available for this question'
    }
});

// aptiQuestionSchema.pre('save', function (next) {
//     console.log('presave')
//     this.topicSlug = slugify(this.topic, { lower: true });
//     this.categorySlug = slugify(this.category, { lower: true });
//     next();
// });

// company type questions?
const AptiQuestion = mongoose.model('aptiQuestion', aptiQuestionSchema);
module.exports = AptiQuestion;