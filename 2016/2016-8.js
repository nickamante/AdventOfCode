"use strict";
let helper = require('./helpers.js');



// Part 1/2
helper.withInput(2016, 8, (err, input) => {
    let cardInstructions = input.trim().split('\n').map(line => line.trim());

    // let screen = new Screen(7, 3);
    // console.log(screen.toString());
    // screen.rect(3,2);
    // console.log(screen.toString());
    // screen.rotateColumn(1, 1);
    // console.log(screen.toString());
    // screen.rotateRow(0, 4);
    // console.log(screen.toString());
    // screen.rotateColumn(1, 1);
    // console.log(screen.toString());

    let screen = new Screen(50, 6);
    for(let instruction of cardInstructions){
        let params = instruction.split(" ");
        if (params[0] === 'rect'){
            let [ cols, rows ] = params[1].split('x').map(i => parseInt(i));

            screen.rect(cols, rows)
        }
        if (params[0] === 'rotate'){
            let [ , index ] = params[2].split('=').map(i => parseInt(i));
            let num = parseInt(params[4]);

            if (params[1] === 'column'){
                screen.rotateColumn(index, num);
            } else if (params[1] === 'row'){
                screen.rotateRow(index, num);
            }
        }
    }
    console.log(screen.toString());
    console.log(`Lit Pixels: ${screen.countLitPixels()}`);
});

class Screen {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this.initDisplay();
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    toString(){
        let lines = [];
        for(let i = 0; i < this._height; i++){
            lines.push(this._display[i].map(pixel => pixel === 0 ? '_' : "#").join(''));
        }

        return lines.join('\n')+'\n';
    }


    initDisplay() {
        this._display = [];

        for(let i = 0; i < this._height; i++){
            let row = [];
            for(let j = 0; j < this._width; j++){
                row.push(0);
            }
            this._display.push(row);
        }
    }

    rect(cols, rows) {
        if (cols > this._width || rows > this._height){
            throw new Error('Cannot Draw Outside of Screen Area');
        }

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                this._display[i][j] = 1;
            }
        }
    }

    rotateColumn(colIndex, num) {
        if (colIndex > this._width - 1){
            throw new Error('Cannot Draw Outside of Screen Area');
        }

        let col = this._display.map(row => row[colIndex]); // clone the column

        for(let i = 0; i < this._height; i++){
            let targetRow = (i + num) % this._height;
            this._display[targetRow][colIndex] = col[i];
        }
    }

    rotateRow(rowIndex, num) {
        if (rowIndex > this._height - 1){
            throw new Error('Cannot Draw Outside of Screen Area');
        }

        let row = this._display[rowIndex].slice(); // clone the row

        for(let i = 0; i < this._width; i++){
            let targetCol = (i + num) % this._width;
            this._display[rowIndex][targetCol] = row[i];
        }
    }

    countLitPixels() {
        let sum = (a,b) => a + b;

        return this._display.map(row => row.reduce(sum)).reduce(sum);
    }
}