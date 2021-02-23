const mongoose = require('mongoose');
const slugify = require('slugify');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [40, 'A question name must have less or equal than 40 characters'],
        minlength: [5, 'A question name must have more or equal than 5 characters']
    },
    slug: String,
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
            values: ['10', '20', '30'],
            message: 'Difficulty is either: 10, 20, 30'
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

questionSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;