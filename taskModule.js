const fs = require('fs');
const fsPromises = fs.promises;

function saveTaskCallback(task, callback) {
    fs.appendFile('tasks.txt', task + '\n', (err) => {
        if (err) callback(err);
        else callback(null);
    });
}

function saveTaskPromise(task, filePath = 'tasks.txt') {
    return fsPromises.appendFile(filePath, task + '\n');
}

module.exports = {
    saveTaskCallback,
    saveTaskPromise
};
