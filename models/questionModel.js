const mongoose = require('mongoose');
const slugify = require('slugify');

const questionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
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
    sampleInputs: {
        type: [Object]
    },
    solution: {
        type: String,
        trim: true
    },
    noOfInputs: {
        type: Number,
        required: [true, 'A question must have number of inputs.'],
    }

});

// questionSchema.pre('save', function (next) {
//     this.slug = slugify(this.title, { lower: true });
//     next();
// });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;