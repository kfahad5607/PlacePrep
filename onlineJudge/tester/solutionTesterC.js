const { exec } = require("child_process");
const fs = require('fs');
const { remove_linebreaks,
    from2dTo1dArr,
    arraysEqual,
    isJSON,
    is2dArray,
    replace1QTo2Q } = require('../../utils/helperFunctions');

const testCodeC = async (file, testcaseFile, inputFile, noOfInputs) => {

    let exeFile = file.replace('.c', '.exe').replace(/[/]+/gm, '\\');
    try {
        await new Promise((resolve, reject) => {
            exec(`g++ ${file} -o ${exeFile}`, (err, stdout, stderr) => {
                if (err) {
                    let newStderr = stderr.replace(/onlineJudge\/temp\/user-.*\/solution/gm, 'main');

                    reject(newStderr);
                }
                resolve();
            });
        });
    } catch (err) {
        return {
            message: 'code error',
            error: err,
            errorType: 'Compile-time Error'
        };
    }

    let results = [];
    const data = fs.readFileSync(testcaseFile, { encoding: 'utf8', flag: 'r' });
    let testcases = data.split('\n');
    let i;
    for (i = 0; i < testcases.length; i = i + noOfInputs + 1) {
        let inputArr = [];

        for (let j = i; j < noOfInputs + i; j++) {
            let trimmedTestcaseInput = remove_linebreaks(testcases[j]);

            if (isJSON(trimmedTestcaseInput) && JSON.parse(trimmedTestcaseInput).constructor === Array) {

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
        fs.writeFileSync(inputFile, inputStr);

        try {
            const info = await new Promise((resolve, reject) => {
                exec(`${exeFile} < ${inputFile}`, (err, stdout, stderr) => {
                    if (err) {
                        let newStderr = stderr.replace(/onlineJudge\/temp\/user-.*\/solution/gm, 'main');

                        reject(newStderr);
                    }
                    else if (stdout) {
                        let trimmedStdout = remove_linebreaks(stdout);
                        let trimmedTestcaseOutput = remove_linebreaks(testcases[i + noOfInputs]);

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
                                reject('Testcase ouput is not an array.');
                            }
                        }
                        else {
                            resolve(trimmedStdout == trimmedTestcaseOutput);

                        }
                    }
                    else {
                        reject('Neither err nor sdterr');
                    }
                });
            });
            if (!info) {
                return {
                    message: 'fail',
                    totalTestcasesRan: results.length + 1,
                    passed: results.length,
                    failedAt: results.length + 1,
                    failed: 1
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

    //console.log('res', results);
    let finalResults = {
        message: 'success',
        totalTestcasesRan: results.length,
        passed: results.length,
        failed: 0
    };
    return finalResults;
};

module.exports = testCodeC;