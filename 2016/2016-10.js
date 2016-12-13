"use strict";
let helper = require('./helpers.js');


let bots, outputs;

// Part 1 & 2
helper.withInput(2016, 10, (err, input) => {
//     input = `value 5 goes to bot 2
// bot 2 gives low to bot 1 and high to bot 0
// value 3 goes to bot 1
// bot 1 gives low to output 1 and high to bot 0
// bot 0 gives low to output 2 and high to output 0
// value 2 goes to bot 2`;
    let instructions = input.trim().split('\n').map(line => line.trim()).sort(); // sort alphabetically so value instructions are processed last

    bots = {};
    outputs = {};

    for(let instruction of instructions) {
        let params = instruction.split(" ");

        if (params[0] === 'bot') {
            let botNumber = parseInt(params[1]);
            let lowTargetType = params[5];
            let lowTarget = parseInt(params[6]);
            let highTargetType = params[10];
            let highTarget = parseInt(params[11]);

            bots[botNumber] = new Bot(botNumber, lowTargetType, lowTarget, highTargetType, highTarget);
        }

        // instructions are sorted, so this should always happen after the bot is created
        if (params[0] === 'value') {
            let chip = parseInt(params[1]);
            let botNumber = parseInt(params[5]);

            bots[botNumber].receive(chip);
        }
    }

    console.log("Outputs:", outputs);

});

class Bot{
    constructor(botNumber, lowTargetType, lowTarget, highTargetType, highTarget) {
        this.number = botNumber;
        this._chips = new Array(2);
        this.lowTargetType = lowTargetType;
        this.lowTarget = lowTarget;
        this.highTargetType = highTargetType;
        this.highTarget = highTarget;
    }

    receive(chip){
        if (this._chips[0] !== undefined && this._chips[1] !== undefined){
            throw new Error('Bot cannot hold any more chips');
        }

        if(this._chips[0] === undefined){
            this._chips[0] = chip;
        } else {
            this._chips[1] = chip;
            this._chips = this._chips.sort((a,b) => a-b);
            this._compareAndGiveChips();
        }
    }

    _compareAndGiveChips(){
        console.log(`bot ${this.number} gives low (${this._chips[0]}) to ${this.lowTargetType} ${this.lowTarget} and high (${this._chips[1]}) to ${this.highTargetType} ${this.highTarget}`);
        if(this.lowTargetType === 'bot') {
            bots[this.lowTarget].receive(this._chips[0]);
        } else if (this.lowTargetType === 'output') {
            outputs[this.lowTarget] = this._chips[0];
        }
        this._chips[0] = undefined;

        if(this.highTargetType === 'bot') {
            bots[this.highTarget].receive(this._chips[1]);
        } else if (this.highTargetType === 'output') {
            outputs[this.highTarget] = this._chips[1];
        }
        this._chips[1] = undefined;
    }
}