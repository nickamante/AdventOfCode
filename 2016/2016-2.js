"use strict";
let helper = require('./helpers.js');

// Part 1
helper.xwithInput(2016, 2, (err, input) => {
    //let input = `ULL\nRRDDD\nLURDL\nUUUUD`;
    let instructions = input.trim().split('\n');

    const keypad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    let pointer = [1,1];

    for(let line of instructions){
        for(let i = 0; i < line.length; i++){
            if (line[i] === "U" && pointer[0] > 0){
                pointer[0]--;
            }
            if (line[i] === "D" && pointer[0] < 2){
                pointer[0]++;
            }
            if (line[i] === "L" && pointer[1] > 0){
                pointer[1]--;
            }
            if (line[i] === "R" && pointer[1] < 2){
                pointer[1]++;
            }
        }
        console.log(`Press: ${keypad[pointer[0]][pointer[1]]}`)
    }
});

// Part 2
helper.withInput(2016, 2, (err, input) => {
    //let input = `ULL\nRRDDD\nLURDL\nUUUUD`;
    let instructions = input.trim().split('\n');

    const keypad = [
        [null, null,  1 , null, null],
        [null,  2  ,  3 ,  4  , null],
        [ 5  ,  6  ,  7 ,  8  ,  9  ],
        [null, "A" , "B", "C" , null],
        [null, null, "D", null, null]
    ];

    let pointer = [2,0];

    for(let line of instructions){
        for(let i = 0; i < line.length; i++){
            if (line[i] === "U" && pointer[0] > 0 && keypad[pointer[0]-1][pointer[1]] !== null){
                pointer[0]--;
            }
            if (line[i] === "D" && pointer[0] < 4 && keypad[pointer[0]+1][pointer[1]] !== null){
                pointer[0]++;
            }
            if (line[i] === "L" && pointer[1] > 0 && keypad[pointer[0]][pointer[1]-1] !== null){
                pointer[1]--;
            }
            if (line[i] === "R" && pointer[1] < 4 && keypad[pointer[0]][pointer[1]+1] !== null){
                pointer[1]++;
            }
        }
        console.log(`Press: ${keypad[pointer[0]][pointer[1]]}`)
    }
});