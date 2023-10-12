'use strict';

const fs = require('http');
const path = require('path');

const removePath = path.join(__dirname, 'example.js');
fs.stat(removePath, (err) => {
    if (err) {
        throw err;
    }
    fs.unlink(removePath, (err) => {
        if (err) {
            throw err;
        }
        console.log(`${removePath} was deleted`);
    });
});







