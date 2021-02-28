const mongoose = require('mongoose');

const codeSubmissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
    },
    language: {
        type: String,
    },
    userSolution: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// codeSubmissionSchema.index(
//     {
//         user: 1,
//         quiz: 1
//     },
//     {
//         unique: true
//     }
// );

const CodeSubmission = mongoose.model('CodeSubmission', codeSubmissionSchema);

module.exports = CodeSubmission;