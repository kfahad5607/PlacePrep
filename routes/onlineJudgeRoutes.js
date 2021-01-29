const express = require('express');
const router = express.Router();
const solutionTesterC = require('../onlineJudge/tester/solutionTesterC');
const solutionTesterPython = require('../onlineJudge/tester/solutionTesterPython');
const solutionTesterCPP = require('../onlineJudge/tester/solutionTesterCPP');
const solutionTesterJava = require('../onlineJudge/tester/solutionTesterJava');

router.get('/', async (req, res) => {

    let ser = "['serv', 'serv2', 'srv3', 'serv5']";
    let ser1 = '[ "[1,2,3]",   [5,6,5,"k",8], [78,87,   12,45,23]       ]';

    console.log(typeof { name: 'fahad', age: 21 } === typeof [1, 23]);
    res.send('Testing Routes');
});

// c cpp python java
let lang = 'python';
let extension = 'py';
// two-sum lcs reverse-string prime-no palindrome palindrome-in-range search-ele-in-linked-list p1 p2 p3
let questionName = 'palindrome-in-range';

let noOfInputs = 2;

let file = `./onlineJudge/questions/${questionName}/${lang}/solution.${extension}`;
let testcaseFile = `./onlineJudge/questions/${questionName}/testcase.txt`;

router.get('/run', async (req, res) => {
    let data;
    if (lang == 'c') {
        data = await solutionTesterC(file, testcaseFile, noOfInputs);
    }
    else if (lang == 'cpp') {
        data = await solutionTesterCPP(file, testcaseFile, noOfInputs);
    }
    else if (lang == 'java') {
        data = await solutionTesterJava(file, testcaseFile, noOfInputs);
    }
    else if (lang == 'python') {
        data = await solutionTesterPython(file, testcaseFile, noOfInputs);
    }
    else {
        data = 'Unexpected language!';
    }

    res.json({
        data
    });
});

module.exports = router;