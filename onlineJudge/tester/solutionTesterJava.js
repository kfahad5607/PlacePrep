const { exec } = require("child_process");
const fs = require('fs');
const { remove_linebreaks,
    from2dTo1dArr,
    arraysEqual,
    isJSON,
    is2dArray,
    replace1QTo2Q } = require('../utils/helperFunctions');

const testCodeJava = async (file, testcaseFile, noOfInputs) => {
    try {
        await new Promise((resolve, reject) => {

            exec(`javac ${file}`, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                    reject(stderr);
                }
                resolve();
            })
        })
    } catch (err) {
        return {
            message: 'Error occured at Catch at compile time',
            error: err
        };

    }
    let results = [];
    const data = fs.readFileSync(testcaseFile, { encoding: 'utf8', flag: 'r' });
    let testcases = data.split('\n');
    // console.log('tt', typeof testcases[0]);
    // console.log('tt1', testcases);

    // console.log("ERROR K BADDD");
    let i;
    for (i = 0; i < testcases.length; i = i + noOfInputs + 1) {
        let inputArr = [];

        // Old code to handle array inputs
        for (let j = i; j < noOfInputs + i; j++) {
            let trimmedTestcaseInput = remove_linebreaks(testcases[j]);
            // Old way to check if the input string is an array
            // if (remove_linebreaks(testcases[j]).startsWith('[') && remove_linebreaks(testcases[j]).endsWith(']')) {
            // New way to check if the input string is an array
            if (isJSON(trimmedTestcaseInput) && JSON.parse(trimmedTestcaseInput).constructor === Array) {
                // Old way to convert input string to an array
                // let strToArrInput = stringArrayToArray(testcases[j]);

                // New way to convert input string to an array
                let strToArrInput = JSON.parse(trimmedTestcaseInput);
                if (is2dArray(strToArrInput)) {
                    // console.log('2d array', strToArrInput);
                    inputArr.push(strToArrInput.length);
                    inputArr.push(strToArrInput[0].length);
                    strToArrInput.forEach(arr => {
                        inputArr = inputArr.concat(arr);
                    });
                }
                else {
                    inputArr.push(strToArrInput.length);
                    inputArr = inputArr.concat(strToArrInput);
                    // console.log('Its an array', inputArr, strToArrInput);
                }
            }
            else {
                inputArr.push(trimmedTestcaseInput);
            }
        }
        let inputStr = inputArr.join('\n');
        //console.log('instrr', inputStr, ' end', inputArr);
        fs.writeFileSync('./onlineJudge/input.txt', inputStr);

        try {
            let classPath = file.replace('solution.java', '');
            const info = await new Promise((resolve, reject) => {
                exec(`java -cp ${classPath} solution < ./onlineJudge/input.txt `, (err, stdout, stderr) => {
                    if (err) {
                        //console.log('err1', stderr, 'end');
                        reject(stderr);
                    }
                    else if (stdout) {
                        let trimmedStdout = remove_linebreaks(stdout);
                        let trimmedTestcaseOutput = remove_linebreaks(testcases[i + noOfInputs]);
                        // Checking if the std output is an array
                        if (isJSON(replace1QTo2Q(trimmedStdout)) && JSON.parse(replace1QTo2Q(trimmedStdout)).constructor === Array) {
                            // let strToArrStdout = stringArrayToArray(stdout);
                            // let strToArrTestcaseOutput = stringArrayToArray(testcases[i + noOfInputs]);
                            if (isJSON(replace1QTo2Q(trimmedTestcaseOutput)) && JSON.parse(replace1QTo2Q(trimmedTestcaseOutput)).constructor === Array) {
                                let strToArrStdout = JSON.parse(replace1QTo2Q(trimmedStdout));
                                let strToArrTestcaseOutput = JSON.parse(replace1QTo2Q(trimmedTestcaseOutput));

                                if (is2dArray(strToArrStdout)) {
                                    if (is2dArray(strToArrTestcaseOutput)) {
                                        let oneDArrStdout = from2dTo1dArr(strToArrStdout);
                                        let oneDArrTestcaseOutput = from2dTo1dArr(strToArrTestcaseOutput);
                                        // console.log('std 2d array', oneDArrStdout);
                                        // console.log('test 2d array', oneDArrTestcaseOutput);
                                        console.log('test ', arraysEqual(oneDArrStdout, oneDArrTestcaseOutput));
                                        resolve(arraysEqual(oneDArrStdout, oneDArrTestcaseOutput));
                                    }
                                    else {
                                        reject('Testcase output is not a 2d array.');
                                    }
                                }
                                else {
                                    console.log(`Output no. ${i} -> ${trimmedStdout} `);
                                    console.log(`Testcase no. ${i} -> ${trimmedTestcaseOutput} `);
                                    console.log(`output and testcase arraya -> `, strToArrStdout, ' and ', strToArrTestcaseOutput);
                                    // console.log('array equals', arraysEqual(strToArrStdout, strToArrTestcaseOutput));
                                    resolve(arraysEqual(strToArrStdout, strToArrTestcaseOutput));
                                }
                            }
                            else {
                                reject('Testcase ouput is not an array.');
                            }
                        }
                        else {
                            // Old code
                            //results.push(trimmedStdout == trimmedTestcaseOutput);
                            console.log(`Output no. ${i} -> ${trimmedStdout} `);
                            console.log(`Testcase no. ${i} -> ${trimmedTestcaseOutput} `);
                            // console.log(`Result no. ${i} -> ${trimmedStdout == trimmedTestcaseOutput} `);
                            // console.log(`Result no. ${i} -> `, temp);
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
            console.log('Info = ', info);

        } catch (err) {
            return {
                message: 'Error occured at Catch Block',
                error: err
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

module.exports = testCodeJava;
