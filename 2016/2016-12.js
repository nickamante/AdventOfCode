"use strict";
let helper = require('./helpers.js');

// Part 1 & 2
helper.withInput(2016, 12, (err, input) => {
//     input = `cpy 41 a
// inc a
// inc a
// dec a
// jnz a 2
// dec a`;

    let instructions = input.trim().split('\n').map(line => line.trim());
    let registers = { "a": 0, "b": 0, "c": 1, "d": 0 };

    for(let i = 0; i < instructions.length; i++){
        let instruction = instructions[i];
        let params = instruction.split(" ");
        switch(params[0]){
            case 'cpy': {
                let value = parseInt(params[1]) || registers[params[1]];
                registers[params[2]] = value;
                break;
            }
            case 'inc':
                registers[params[1]]++;
                break;
            case 'dec':
                registers[params[1]]--;
                break;
            case 'jnz': {
                let value = parseInt(params[1]) || registers[params[1]];
                if (value !== 0){
                    i += parseInt(params[2]) - 1;
                }
                break;
            }
            default:
                throw new Error('Unknown Instruction');

        }

    }
    console.log(registers);

});