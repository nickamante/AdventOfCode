"use strict";
let helper = require('./helpers.js');

// Part 1
helper.withInput(2016, 15, (err, input) => {
    // Part 2, addition of a new disk
    input += 'Disc #7 has 11 positions; at time=0, it is at position 0.';
    
    let discStartingPositions = input.trim().split('\n').map(line => line.trim());
    let discs = [];
    let time = 0;

    for(let [index, position] of discStartingPositions.entries()){
        let match = position.match(/Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)./);
        let numPositions = parseInt(match[2]);
        let currentPosition = parseInt(match[3]);
        discs.push(new Disc(numPositions, currentPosition, index+1));
    }

    do {
        let doesButtonPressSucceed = discs.map(disc => disc.doesBallPassThroughAtTime(time)).reduce((a,b) => a && b);
        if (doesButtonPressSucceed) {
            console.log(`Press the button at time: ${time}`);
            break;
        }
        time++;
    } while(true);
});

class Disc {
    constructor(numPositions, currentPosition, distanceFromTop){
        this.numPositions = numPositions;
        this.currentPosition = currentPosition;
        this.distanceFromTop = distanceFromTop;
    }

    // tick(){
    //     this.currentPosition = (this.currentPosition + 1) % this.numPositions;
    // }

    doesBallPassThroughAtTime(time){
        return ((this.currentPosition + time + this.distanceFromTop) % this.numPositions) === 0;
    }
}