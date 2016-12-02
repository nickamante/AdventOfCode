"use strict";
let helper = require('./helpers.js');

helper.withInput(2016, 1, (err, input) => {
    console.time("withHash");
    const directions = input.split(',').map(dir => dir.trim());
    const headings = ["N", "E", "S", "W"];
    let currentHeading = 0;
    let x = 0, y = 0;

    let visited = { "0,0": true };

    console.log(`Facing: ${headings[currentHeading]}`);

    mainLoop:
    for(let step of directions) {
        let dir = step[0];
        let spaces = parseInt(step.substr(1, step.length));

        if(dir === "R"){
            currentHeading = (currentHeading + 1) % 4;
        }
        if(dir === "L"){
            currentHeading = ((currentHeading || 4) - 1 ); // haxin, because 0 == false in javascript we'll correctly roll back around
        }


        console.log(`Turning ${dir}, Facing: ${headings[currentHeading]}`);
        console.log(`Moving ${spaces} spaces`);

        for (let i = 0; i < spaces; i++) {
            switch (headings[currentHeading]) {
                case "N":
                    x++;
                    break;
                case "S":
                    x--;
                    break;
                case "E":
                    y++;
                    break;
                case "W":
                    y--;
                    break;
                default:
                    console.log('wtf');
                    break;
            }

            let currentLocation = `${x},${y}`;
            if(visited[currentLocation]){
                console.log(`We've been at ${currentLocation} before! `);
                break mainLoop;
            }

            visited[currentLocation] = true;
        }

        console.log(`Moved To: ${x},${y}`);
    }

    let blocksFromStart = Math.abs(x)+Math.abs(y);
    let directionFromStart = (x > 0 ? "N" : "S") + (y > 0 ? "E" : "W");
    console.log(`Your destination is ${blocksFromStart} blocks to the ${directionFromStart}`);
    console.timeEnd('withHash');
});

helper.xwithInput(2016, 1, (err, input) =>{
    console.time("withArray");
    const directions = input.split(',').map(dir => dir.trim());
    const headings = ["N", "E", "S", "W"];
    let currentHeading = 0;
    let x = 0, y = 0;

    let visited = [ "0,0" ];

    console.log(`Facing: ${headings[currentHeading]}`);

    mainLoop:
        for(let step of directions) {
            let dir = step[0];
            let spaces = parseInt(step.substr(1, step.length));

            if(dir === "R"){
                currentHeading = (currentHeading + 1) % 4;
            }
            if(dir === "L"){
                currentHeading = ((currentHeading || 4) - 1 ); // haxin, because 0 == false in javascript we'll correctly roll back around
            }


            console.log(`Turning ${dir}, Facing: ${headings[currentHeading]}`);
            console.log(`Moving ${spaces} spaces`);

            for (let i = 0; i < spaces; i++) {
                switch (headings[currentHeading]) {
                    case "N":
                        x++;
                        break;
                    case "S":
                        x--;
                        break;
                    case "E":
                        y++;
                        break;
                    case "W":
                        y--;
                        break;
                    default:
                        console.log('wtf');
                        break;
                }

                let currentLocation = `${x},${y}`;
                if(visited.indexOf(currentLocation) != -1){
                    console.log(`We've been at ${currentLocation} before! `);
                    break mainLoop;
                }

                visited.push(currentLocation);
            }

            console.log(`Moved To: ${x},${y}`);
        }

    let blocksFromStart = Math.abs(x)+Math.abs(y);
    let directionFromStart = (x > 0 ? "N" : "S") + (y > 0 ? "E" : "W");
    console.log(`Your destination is ${blocksFromStart} blocks to the ${directionFromStart}`);
    console.timeEnd("withArray");
});