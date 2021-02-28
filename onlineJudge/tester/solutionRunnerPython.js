const { exec } = require("child_process");
const fs = require('fs');
const { remove_linebreaks,
    from2dTo1dArr,
    arraysEqual,
    isJSON,
    is2dArray,
    replace1QTo2Q } = require('../../utils/helperFunctions');

const testCodePython = async (file, testcaseFile, noOfInputs) => {
    let givenInput = '';
    let expectedOutput;
    let userOutput;
    let results = [];
    const data = fs.readFileSync(testcaseFile, { encoding: 'utf8', flag: 'r' });
    let testcases = data.split('\n');
    let i;
    for (i = 0; i < 1; i = i + noOfInputs + 1) {
        let inputArr = [];

        // Old code to handle array inputs
        for (let j = i; j < noOfInputs + i; j++) {
            let trimmedTestcaseInput = remove_linebreaks(testcases[j]);
            givenInput = givenInput + trimmedTestcaseInput + '\n';
            // Old way to check if the input string is an array
            // if (remove_linebreaks(testcases[j]).startsWith('[') && remove_linebreaks(testcases[j]).endsWith(']')) {
            // New way to check if the input string is an array
            if (isJSON(trimmedTestcaseInput) && JSON.parse(trimmedTestcaseInput).constructor === Array) {
                // Old way to convert input string to an array
                // let strToArrInput = stringArrayToArray(testcases[j]);

                // New way to convert input string to an array
                let strToArrInput = JSON.parse(trimmedTestcaseInput);
                if (is2dArray(strToArrInput)) {
                    inputArr.push(strToArrInput.length);
                    inputArr.push(strToArrInput[0].length);
                    strToArrInput.forEach(arr => {
                        inputArr = inputArr.concat(arr);
                    });
                }
                else {
                    inputArr.push(strToArrInput.length);
                    inputArr = inputArr.concat(strToArrInput);
                }
            }
            else {
                inputArr.push(trimmedTestcaseInput);
            }
        }
        let inputStr = inputArr.join('\n');
        fs.writeFileSync('./onlineJudge/input.txt', inputStr);

        try {
            const info = await new Promise((resolve, reject) => {
                exec(`python ${file}  < ./onlineJudge/input.txt `, (err, stdout, stderr) => {
                    if (err) {
                        let newStderr = stderr.replace(/onlineJudge\/temp\/user-.*\/solution/gm, 'main');

                        reject(newStderr);
                    }
                    else if (stdout) {
                        let trimmedStdout = remove_linebreaks(stdout);
                        let trimmedTestcaseOutput = remove_linebreaks(testcases[i + noOfInputs]);
                        // userOutput = trimmedStdout;
                        userOutput = stdout;
                        expectedOutput = trimmedTestcaseOutput;
                        // Checking if the std output is an array
                        if (isJSON(replace1QTo2Q(trimmedStdout)) && JSON.parse(replace1QTo2Q(trimmedStdout)).constructor === Array) {
                            if (isJSON(replace1QTo2Q(trimmedTestcaseOutput)) && JSON.parse(replace1QTo2Q(trimmedTestcaseOutput)).constructor === Array) {
                                let strToArrStdout = JSON.parse(replace1QTo2Q(trimmedStdout));
                                let strToArrTestcaseOutput = JSON.parse(replace1QTo2Q(trimmedTestcaseOutput));

                                if (is2dArray(strToArrStdout)) {
                                    if (is2dArray(strToArrTestcaseOutput)) {
                                        let oneDArrStdout = from2dTo1dArr(strToArrStdout);
                                        let oneDArrTestcaseOutput = from2dTo1dArr(strToArrTestcaseOutput);

                                        resolve(arraysEqual(oneDArrStdout, oneDArrTestcaseOutput));
                                    }
                                    else {
                                        reject('Testcase output is not a 2d array.');
                                    }
                                }
                                else {
                                    resolve(arraysEqual(strToArrStdout, strToArrTestcaseOutput));
                                }
                            }
                            else {
                                reject('Testcase output is not an array.');
                            }
                        }
                        else {
                            resolve(trimmedStdout == trimmedTestcaseOutput);
                        }
                    }
                    else {
                        reject('Empty file is being run!');
                    }
                });
            });
            if (!info) {
                return {
                    message: 'fail',
                    totalTestcasesRan: results.length + 1,
                    passed: results.length,
                    failedAt: results.length + 1,
                    failed: 1,
                    input: givenInput,
                    output: userOutput,
                    expected: expectedOutput
                };
            }
            results.push(info);

        } catch (err) {
            return {
                message: 'code error',
                error: err,
                errorType: 'Runtime Error'
            };
        }
    }

    console.log('res', givenInput);
    let finalResults = {
        message: 'success',
        totalTestcasesRan: results.length,
        passed: results.length,
        failed: 0,
        input: givenInput,
        output: userOutput,
        expected: expectedOutput
    };
    return finalResults;
};

module.exports = testCodePython;