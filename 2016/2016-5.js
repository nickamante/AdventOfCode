"use strict";
let helper = require('./helpers.js');
let md5 = require('js-md5');

// Part 1
helper.xwithInput(2016, 5, (err, input) => {
    //input = 'abc';
    input = input.trim();
    let password = [];
    let currentCharIndex = 0;
    let index = 0;

    do {
        if(index % 1000000 === 0){ console.log(index); }
        let hash = md5(input + index);
        if (/^00000/.test(hash)){
            console.log(`Found: ${index} with hash: ${hash}`);
            password[currentCharIndex] = hash[5];
            currentCharIndex++;
        }
        index++;
    } while (password.length < 8);
    console.log(`Password is ${password.join('')}`);
});

// Part 2
helper.withInput(2016, 5, (err, input) => {
    //input = 'abc';
    input = input.trim();
    let password = ['_','_','_','_','_','_','_','_'];
    let currentCharCount = 0;
    let index = 0;


    do {
        //if(index % 1000000 === 0){ console.log(`CurrentIndex: ${index}`); }

        let hash = md5(input + index);
        if (/^00000[0-7]/.test(hash)){
            if (password[hash[5]] === '_') {
                password[hash[5]] = hash[6];
                console.log(`${password.join('')}   | From: ${index} with hash: ${hash}`);

                currentCharCount++;
            }
        }

        index++;
    } while (currentCharCount < 8);

    console.log(`Password is ${password.join('')}`);
});