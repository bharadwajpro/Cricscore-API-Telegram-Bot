'use strict'

var tg = require('telegram-node-bot')(<API-Key-Here>)
var http = require("http");

var foo = '/csa?id=981017';
var options = {
  host: 'cricscore-api.appspot.com',
  path: foo
};

var callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var obj = JSON.parse(str);
    var score = obj[0].de + " | " + obj[0].si;
    console.log(score);

    tg.router.
        when(['score'], 'ScoreController')

    tg.controller('ScoreController', ($) => {
        tg.for('score', () => {
            $.sendMessage(score)
        })
    })


  });
}

setInterval(function(){
  http.request(options, callback).end();
}, 30000);
