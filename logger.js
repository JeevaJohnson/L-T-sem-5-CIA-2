// logger.js

// ---------------------------------------------------------
// Task 1: Node.js Development Setup & Running Node.js Files
// ---------------------------------------------------------
console.log("Task Logger Started");

// ---------------------------------------------------------
// Task 2: Understanding How Node.js Works & Node.js Architecture
// ---------------------------------------------------------
/*
 * How V8 and libuv work together:
 * The V8 engine is responsible for compiling and executing JavaScript code synchronously.
 * When Node.js encounters an asynchronous operation (like reading a file or making a network request), 
 * V8 passes this operation to libuv. Libuv handles these asynchronous tasks in the background 
 * using a thread pool or OS-level APIs. Once the task is complete, libuv places the corresponding 
 * callback function into the task queue. The Event Loop then picks up this callback from the queue 
 * and pushes it back to V8's call stack for execution when the stack is empty.
 */
const fs = require('fs');

// Creating a dummy file for demonstration purposes
fs.writeFileSync('dummy.txt', 'This is some file content.');

// Demonstrating non-blocking behaviour
fs.readFile('dummy.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("File contents:", data);
});

console.log("This message prints immediately, before the file contents are logged.");

// ---------------------------------------------------------
// Task 5: Node Process Object, Command Line & Terminal I/O
// ---------------------------------------------------------
const readline = require('readline');

const taskArgument = process.argv[2];
if (taskArgument) {
    console.log("Task from argument:", taskArgument);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Do you want to save the task? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
        console.log("Task saved successfully!");
    } else {
        console.log("Task saving cancelled.");
    }
    rl.close();
});

// ---------------------------------------------------------
// Task 8: Asynchronous Programming & Callback Functions
// ---------------------------------------------------------
function saveTaskCallback(task, callback) {
    fs.appendFile('tasks.txt', task + '\n', (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

saveTaskCallback('Complete Node.js Assignment', (err) => {
    if (err) {
        console.error("Failure: Could not save the task.", err);
    } else {
        console.log("Success: Task saved using callback.");
    }
});

// ---------------------------------------------------------
// Task 9: Node Timers & Global Objects
// ---------------------------------------------------------
setTimeout(() => {
    console.log("Reminder: review your tasks");
}, 5000);

let tasksLoggedCount = 0;
const intervalId = setInterval(() => {
    tasksLoggedCount++;
    console.log(`Number of tasks logged so far: ${tasksLoggedCount}`);
}, 3000);

setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval cleared.");
}, 15000);

// ---------------------------------------------------------
// Task 10: JavaScript Promises — Introduction, Detail & Revisited
// ---------------------------------------------------------
const fsPromises = require('fs').promises;

function saveTaskPromise(task, filePath = 'tasks.txt') {
    return fsPromises.appendFile(filePath, task + '\n');
}

saveTaskPromise('Learn Promises in Node.js')
    .then(() => {
        console.log("Success: Task saved using Promise.");
    })
    .catch((err) => {
        console.error("Failure: Error saving task with Promise.", err);
    });

// ---------------------------------------------------------
// Task 11: Try/Catch Error Handling & Async-Await Concepts
// ---------------------------------------------------------
async function saveTaskAsync(task) {
    try {
        await saveTaskPromise(task);
        console.log("Success: Task saved using Async/Await.");
    } catch (error) {
        console.error("Failure: Caught error in async function.", error.message);
    }
}

saveTaskAsync('Master Async/Await');

async function triggerError() {
    try {
        await saveTaskPromise('This will fail', './non_existent_folder/tasks.txt');
    } catch (error) {
         console.error("Expected Failure: Catch block fired successfully due to bad path.", error.message);
    }
}

triggerError();

// ---------------------------------------------------------
// Task 13: Callback Examples & the Event Loop, Job Queue
// ---------------------------------------------------------
/*
 * Predicted Order:
 * 1. Synchronous Console Log
 * 2. Promise Resolved (Because Microtasks / Job Queue have higher priority)
 * 3. SetTimeout (Macrotasks / Callback Queue execute after Microtasks)
 */

console.log("1. Synchronous Console Log");

setTimeout(() => {
    console.log("3. SetTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("2. Promise Resolved");
});

// ---------------------------------------------------------
// Task 14: Recursive Functions, Event Loop Execution Flow & EventEmitter
// ---------------------------------------------------------
const EventEmitter = require('events');

const taskEmitter = new EventEmitter();

taskEmitter.on('taskAdded', (task) => {
    console.log(`New task added: ${task}`);
});

async function saveTaskAsyncWithEmitter(task) {
    try {
        await fsPromises.appendFile('tasks.txt', task + '\n');
        taskEmitter.emit('taskAdded', task);
    } catch (error) {
        console.error("Error saving task:", error);
    }
}

saveTaskAsyncWithEmitter('Implement EventEmitter');

// ---------------------------------------------------------
// Task 15: Node Modules — Types, Core/Local Modules & Import-Export
// ---------------------------------------------------------
const taskModule = require('./taskModule');

taskModule.saveTaskCallback('Task from local module (Callback)', (err) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Task saved using local module callback.");
    }
});

taskModule.saveTaskPromise('Task from local module (Promise)')
    .then(() => console.log("Task saved using local module promise."))
    .catch(err => console.error("Error:", err));
