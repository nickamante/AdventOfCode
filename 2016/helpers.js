"use strict";
var fs = require('fs');

var requestDefaults = {
    baseUrl: 'http://adventofcode.com/',
    headers: {
    'Cookie': 'FILL ME IN'
    }
};

var request = require('request').defaults(requestDefaults);


module.exports = {
    withInput: withInput,
    xwithInput: doNothing
};

function doNothing(){

}

function withInput(year, day, callback) {
    let inputFile = `${year}-${day}.input.txt`;

    let input;
    try {
        input = fs.readFileSync(inputFile);
        callback(null, input);
    } catch (ex) {
        fetchInputFromServer(year, day, function (err, input) {
            if (err) {
                callback(err);
            }

            fs.writeFileSync(inputFile, input);
            callback(null, input);
        });
    }
}

function fetchInputFromServer(year, day, callback){
    request(`${year}/day/${day}/input`, function(error, response, body){
        callback(error, body);
    });
}