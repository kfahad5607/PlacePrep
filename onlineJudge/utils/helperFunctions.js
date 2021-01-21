exports.remove_linebreaks = (str) => {
    return str.replace(/(^["'`\n\r]|["'`\n\r]$)/mg, '').trim();
};

exports.replace1QTo2Q = (str) => {
    return str.replace(/[']+/gm, '"');
};

exports.is2dArray = (arr) => {
    if (arr[0] == undefined) {
        return false;
    }
    else if (arr[0].constructor === Array) {
        return true;
    }
};

exports.arraysEqual = (a, b) => {
    if (a.length != b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
};

exports.isJSON = (obj) => {
    try {
        JSON.parse(obj);
    } catch (e) {
        return false;
    }
    return true;
};

exports.stringArrayToArray = (strArr) => {
    let formattedStr = remove_linebreaks(strArr);
    return formattedStr
        .substring(1, formattedStr.length - 1)
        .split(',').map(el => el.trim());
};

exports.from2dTo1dArr = arr => {
    let temp = [];
    arr.forEach(el => {
        temp = temp.concat(el);
    });
    return temp;
};