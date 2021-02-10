const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log('ERROR:', err.name, err.message);
    console.log('Shutting Down...');
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require("./app");


// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE_LOCAL;

mongoose
    .connect(process.env.DATABASE_LOCAL, {   //local database k liye 
    // .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    }).then(() => console.log("Connection Successful!"));
// console.log(process.env);


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`App Running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('ERROR:', err.name, err.message);
    console.log('Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

