"use strict";
let helper = require('./helpers.js');
let md5 = require('js-md5');

// Part 1 & 2
helper.xwithInput(2016, 14, (err, input) => {
    let salt = input.trim();
    let index = 0;
    let hashQueue = [];
    let keys = [];

    do {
        let hash = md5(salt + index);

        // Part 2, Key Stretching
        for(let i = 0; i < 2016; i++){
            hash = md5(hash);
        }

        hashQueue.push(hash);

        if(index >= 1000) {
            let match = hashQueue[0].match(/(.)\1\1/);
            if (match) {
                let matchedChar = match[1];
                for (let i = 0; i < 1000; i++) {
                    let regex = new RegExp(`${matchedChar}{5}`);
                    if (regex.test(hashQueue[i+1])) {
                        keys.push({'index': index - 1000, 'key': hashQueue[0]});
                        break;
                    }
                }
            }

            hashQueue.shift();
        }

        index++;
    } while (keys.length < 64);

    console.log(keys);
});