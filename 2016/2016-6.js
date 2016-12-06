"use strict";
let helper = require('./helpers.js');

// Part 1
helper.xwithInput(2016, 6, (err, input) => {
    let rawMessage = input.trim().split('\n').map(line => line.split(''));
    let rotatedMessage = new Array(rawMessage[0].length);

    for(let i = 0; i < rawMessage.length; i++){
        for (let j = 0; j < rawMessage[i].length; j++){
            if(rotatedMessage[j] === undefined) {
                rotatedMessage[j] = [];
            }

            rotatedMessage[j].push(rawMessage[i][j]);
        }
    }

    let decodedMessage = rotatedMessage.map(toMostFrequentLetter).join('');
    console.log(decodedMessage);

});

function toMostFrequentLetter(letters){
    let frequency = {};
    let max = 0;
    let mostFrequentLetter;

    for(let char of letters){
        if (frequency[char] === undefined){
            frequency[char] = 0;
        }

        frequency[char]++;
        if (frequency[char] > max) {
            max = frequency[char];
            mostFrequentLetter = char;
        }
    }

    return mostFrequentLetter;
}

// Part 2
helper.withInput(2016, 6, (err, input) => {
    let rawMessage = input.trim().split('\n').map(line => line.split(''));
    let rotatedMessage = new Array(rawMessage[0].length);

    for(let i = 0; i < rawMessage.length; i++){
        for (let j = 0; j < rawMessage[i].length; j++){
            if(rotatedMessage[j] === undefined) {
                rotatedMessage[j] = [];
            }

            rotatedMessage[j].push(rawMessage[i][j]);
        }
    }

    let decodedMessage = rotatedMessage.map(toLeastFrequentLetter).join('');
    console.log(decodedMessage);

});

function toLeastFrequentLetter(letters){
    let sortedLetters = letters.sort();

    let leastFrequentLetter;
    let leastFrequentLetterCount = 0;
    let currentLetter = sortedLetters[0];
    let currentLetterCount = 0;

    for(let char of sortedLetters){
        if(char === currentLetter){
            currentLetterCount++;
        } else {
             if(currentLetterCount < leastFrequentLetterCount || leastFrequentLetter === undefined){
                 leastFrequentLetterCount = currentLetterCount;
                 leastFrequentLetter = currentLetter;
             }

             currentLetter = char;
             currentLetterCount = 1;
        }
    }

    return leastFrequentLetter;
}