const mongoose = require('mongoose');

const aptiQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "A Question must have a question"],
        unique: true,
        trim: true
    },
    // answers: [String],
    answers: {
        type: [String],
        required: [true, "Each question must have options"],
        validate: {
            validator: function(ans) {
              return ans.length == 4
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
        // default: 'Quants',
        enum: {
            values: ['Quants', 'Logical','Verbal', 'other'],
            message: 'category is either: Quants, Logical or Verbal'
        }
    },
    explanation: {
        type: String,
        default: 'No answer description available for this question'
    }
})

// company type questions?
const AptiQuestion = mongoose.model('aptiQuestion', aptiQuestionSchema)
module.exports = AptiQuestion