"use strict";
let helper = require('./helpers.js');

// Part 1
helper.withInput(2016, 3, (err, input) => {
    let validCount = 0, invalidCount =0;
    let triangles = input.trim().split('\n').map(line => line.trim().split(/\W+/).map(side => parseInt(side)));
    let isTriangleValid = [];
    for(let t of triangles){
        if((t[0] + t[1] > t[2]) && (t[1] + t[2] > t[0]) && (t[0] + t[2] > t[1])) {
            isTriangleValid.push(true);
            validCount++;
        } else {
            isTriangleValid.push(false);
            invalidCount++;
        }
    }


    console.log(`Total: ${validCount+invalidCount}`);
    console.log(`Valid: ${validCount}`);
    console.log(`Invalid: ${invalidCount}`);

});

// Part 2
helper.withInput(2016, 3, (err, input) => {
    let validCount = 0, invalidCount =0;
    let triangleInput = input.trim().split('\n').map(line => line.trim().split(/\W+/).map(side => parseInt(side)));
    let triangles = [];
    for(let col = 0; col < 3; col++){
        for(let i = 0; i < triangleInput.length; i+=3){
            triangles.push([ triangleInput[i][col], triangleInput[i+1][col], triangleInput[i+2][col] ])
        }
    }

    let isTriangleValid = [];
    for(let t of triangles){
        if((t[0] + t[1] > t[2]) && (t[1] + t[2] > t[0]) && (t[0] + t[2] > t[1])) {
            isTriangleValid.push(true);
            validCount++;
        } else {
            isTriangleValid.push(false);
            invalidCount++;
        }
    }


    console.log(`Total: ${validCount+invalidCount}`);
    console.log(`Valid: ${validCount}`);
    console.log(`Invalid: ${invalidCount}`);

});
