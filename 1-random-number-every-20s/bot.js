/*
Twitter bot #1
Tweets a random number once every 10s.
author : @shameekbaranwal
*/

console.log('This bot is running.');

let Twit = require('twit');
let config = require('../config');
let T = new Twit(config);
console.log('Twit has been initialized.');

function postRandomNumber() {
    let number = Math.floor(Math.random() * 100);
    let params = {
        status : `Here you go, another random number: ${number}`
    }
    T.post('statuses/update', params, tweeted);
    function tweeted(err, data, response) {
        if (err) {
            console.error(err);
        } else {
            console.log(`I tweeted another random number!`);
            console.log(data.text);
        }
    }
}

postRandomNumber();
setInterval(postRandomNumber, 10 * 1000);