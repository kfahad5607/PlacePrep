const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [40, 'A question name must have less or equal than 40 characters'],
        minlength: [5, 'A question name must have more or equal than 5 characters']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, 'Description must have more or equal than 10 characters']
    },
    difficulty: {
        type: String,
        required: [true, 'A question must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'hard'],
            message: 'Difficulty is either: easy, medium, hard'
        }
    },
    sampleInputs: [{
        id: Number,
        sampleInput: String,
        sampleOutput: String
    }],
    testcases: String,
    solution: { type: [String] },
    hint: {
        type: [String]
    },
    // javaMain: {
    //     type: String,
    //     default: 'java psvm'
    // },
    // cMain: {
    //     type: String,
    //     default: 'C int main'
    // },
    // cppMain: {
    //     type: String,
    //     default: 'Cpp int main'
    // },
    // pythonMain: {
    //     type: String,
    //     default: 'python main'
    // }

});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;