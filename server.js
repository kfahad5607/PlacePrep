const express = require('express');
const routes = require('./onlineJudge/index');
const path = require('path');
const { exec, spawn } = require('child_process');

const app = express();

// Parsing the data into body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.json({
        data: 'hello'

    });
});

app.use('/api', routes);

app.get('/run1', (req, res) => {
    exec('python ./routes/trial/solution.py < ./routes/trial/input.txt', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else {
            console.log('output', stdout);
        }
    });
    res.json({
        data: 'running...'
    });
});


app.get('/run2', (req, res) => {
    const child = spawn('python', ['./sol.py'], { shell: true });
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    res.json({
        data: 'running...'
    });
});

app.listen(4000, () => {
    console.log('Listening at Port 4000');
});