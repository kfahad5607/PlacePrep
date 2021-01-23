const express = require('express');
const router = express.Router();
const solutionTesterPython = require('./tester/solutionTesterPython');
const solutionTesterCPP = require('./tester/solutionTesterCPP');
const solutionTesterJava = require('./tester/solutionTesterJava');


router.get('/', async (req, res) => {

    let ser = "['serv', 'serv2', 'srv3', 'serv5']";
    let ser1 = '[ "[1,2,3]",   [5,6,5,"k",8], [78,87,   12,45,23]       ]';

    console.log(typeof { name: 'fahad', age: 21 } === typeof [1, 23]);
    res.send('Testing Routes');
});

// c cpp py java
let lang = 'cpp';
let extension = 'cpp';

// two-sum lcs reverse-string prime-no palindrome palindrome-in-range search-ele-in-linked-list p1 p2 p3
let questionName = 'prime-no';

let file = `./onlineJudge/questions/${questionName}/${lang}/solution.${extension}`;
let testcaseFile = `./onlineJudge/questions/${questionName}/testcase.txt`;

router.get('/run', async (req, res) => {
    // const data = await solutionTesterPython(file, testcaseFile, 2);
    // const data = await solutionTesterJava(file, testcaseFile, 2);
    const data = await solutionTesterCPP(file, testcaseFile, 1);

    res.json({
        data
    });
});

module.exports = router;