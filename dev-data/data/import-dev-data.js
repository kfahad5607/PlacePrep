const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const AptiQuestion = require("../../models/aptiQuestionModel");


dotenv.config({ path: './../../config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
// .connect(process.env.DATABASE_LOCAL, {
    .connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log("Database connected"))

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'))
const questions = JSON.parse(fs.readFileSync(`${__dirname}/aptiQuestions.json`,'utf-8'))
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`,'utf-8'))

const importData = async () => {
    try {
        // await Tour.create(tours)
        // await User.create(users, { validateBeforeSave: false})
        await AptiQuestion.create(questions)
        console.log("Data inserted successfully")
    } catch (err) {
        console.log(err)
    }
    process.exit()
}
const deleteData = async () => {
    try {
        // await Tour.deleteMany()
        await AptiQuestion.deleteMany()
        // await Review.deleteMany()
        console.log("Data deleted successfully")
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] === '--import') {
    importData()
}else if (process.argv[2] === '--delete') {
    deleteData()
}

console.log(process.argv)