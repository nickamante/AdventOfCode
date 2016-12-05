"use strict";
let helper = require('./helpers.js');

// Part 1
helper.xwithInput(2016, 4, (err, input) => {
    let rooms = input.trim().split('\n').map(parseRoomInfo);

    let sectorIdSum = 0;
    for(let room of rooms){
        let charCount = new Array(26);

        let roomChars = room.name.split('');
        for(let char of roomChars){
            if (char === '-') continue;
            let charIndex = char.charCodeAt(0) - 97;
            if (!charCount[charIndex]) charCount[charIndex] = { character: char, count: 0 };

            charCount[charIndex].count++;
        }

        let checksum = charCount.sort(sortByCountAndName).slice(0, 5).map(c => c.character).join('');
        room.isRoom = room.checksum === checksum;
        if(room.isRoom){
            sectorIdSum += room.sectorId;
        }
        console.log(`Checksum: ${room.checksum} | Computed: ${checksum} | Is Room: ${room.isRoom}`);
    }
    console.log(`SectorId Sum: ${sectorIdSum}`);
});

function sortByCountAndName(a, b){
    if(a.count === b.count) {
        return a.character.charCodeAt(0) - b.character.charCodeAt(0);
    }
    return b.count - a.count;
}

function parseRoomInfo(str){
    str = str.trim();
    let pattern = /([a-z-]+)-([0-9]+)\[([a-z]+)]/;
    let matches = str.match(pattern);

    return {
        name: matches[1],
        sectorId: parseInt(matches[2]),
        checksum: matches[3]
    }
}

// Part 2
helper.withInput(2016, 4, (err, input) => {
    let rooms = input.trim().split('\n').map(parseRoomInfo);

    for(let room of rooms){
        let charCount = new Array(26);

        let roomChars = room.name.split('');
        for(let char of roomChars){
            if (char === '-') continue;
            let charIndex = char.charCodeAt(0) - 97;
            if (!charCount[charIndex]) charCount[charIndex] = { character: char, count: 0 };

            charCount[charIndex].count++;
        }

        let checksum = charCount.sort(sortByCountAndName).slice(0, 5).map(c => c.character).join('');
        room.isRoom = room.checksum === checksum;
    }

    let decryptedRooms = rooms.filter(r => r.isRoom).map(decryptRoomName);
    console.log(decryptedRooms.find(r => r.decryptedRoomName.indexOf('north') !== -1));
});

function decryptRoomName(room){
    let decryptedRoomName = '';
    for(let i = 0; i < room.name.length; i++){
        if(room.name[i] === '-') {
            decryptedRoomName += " ";
            continue;
        }

        let char = room.name[i].charCodeAt(0) - 97;
        let shiftedChar =  (char + room.sectorId) % 26;
        decryptedRoomName += String.fromCharCode(shiftedChar + 97);
    }

    room.decryptedRoomName = decryptedRoomName;
    return room;
}