"use strict";
let helper = require('./helpers.js');



// Part 1
helper.xwithInput(2016, 9, (err, input) => {
    //input = 'ADVENT';
    //input = 'A(1x5)BC';
    //input = '(3x3)XYZ';
    //input = 'A(2x2)BCD(2x2)EFG';
    //input = '(6x1)(1x3)A';
    //input = 'X(8x2)(3x3)ABCY';
    let compressedInput = input.trim();

    var decompressedText = decompress(compressedInput);
    console.log(decompressedText.length);
});

function decompress(input){
    var output = [];
    for(let i = 0; i < input.length; i++){
        if (input[i] === '('){ // market start
            let markerEnd = input.indexOf(')', i);
            let marker = input.substr(i+1, (markerEnd-i)-1);
            let [numChars, repetitions] = marker.split('x').map(i => parseInt(i));

            let charsToBeRepeated = input.substr(markerEnd+1, numChars);

            output.push(charsToBeRepeated.repeat(repetitions));

            i = markerEnd + numChars;
        } else {
            output.push(input[i]);
        }
    }

    return output.join('');
}

// Part 2
helper.withInput(2016, 9, (err, input) => {
    //input = 'X(8x2)(3x3)ABCY';
    //input = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN';
    let compressedInput = input.trim();

    console.log(lengthDecompressed(compressedInput));
});

function lengthDecompressed(input){
    let length = 0;

    for(let i = 0; i < input.length; i++){
        if (input[i] === '('){ // market start
            let markerEnd = input.indexOf(')', i);
            let marker = input.substr(i+1, (markerEnd-i)-1);
            let [numChars, repetitions] = marker.split('x').map(i => parseInt(i));

            let charsToBeRepeated = input.substr(markerEnd+1, numChars);

            length += (lengthDecompressed(charsToBeRepeated) * repetitions);

            i = markerEnd + numChars;
        } else {
            length++;
        }
    }

    return length;
}