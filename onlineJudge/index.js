const express = require('express');
const router = express.Router();
const solutionTester = require('./tester/solutionTesterPython');
const solutionTesterJava = require('./tester/solutionTesterJava');


router.get('/', async (req, res) => {

    let ser = "['serv', 'serv2', 'srv3', 'serv5']";
    let ser1 = '[ "[1,2,3]",   [5,6,5,"k",8], [78,87,   12,45,23]       ]';

    console.log(typeof { name: 'fahad', age: 21 } === typeof [1, 23]);
    res.send('Testing Routes');
});

// two-sum lcs reverse-string prime-no palindrome palindrome-in-range search-ele-in-linked-list p1 p2 p3
let questionName = 'search-ele-in-linked-list';
// let file = `./onlineJudge/questions/${questionName}/python/solution.py`;
let file = `./onlineJudge/questions/${questionName}/java/solution.java`;
let testcaseFile = `./onlineJudge/questions/${questionName}/testcase.txt`;

router.get('/run', async (req, res) => {
    // const data = await solutionTester(file, testcaseFile, 2);
    // res.json({
    //     data
    // });
    const data = await solutionTesterJava(file, testcaseFile, 2);
    res.json({
        data
    });
});

module.exports = router;