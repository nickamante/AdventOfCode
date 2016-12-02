"use strict";
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
  request(`${year}/day/${day}/input`, function(error, response, body){
    callback(error, body);
  });
}