/*
Twitter bot #2
Retweets whenever a tweet mentioning @roastme_bot is made.
author : @shameekbaranwal
*/

console.log('This bot is running.');

let Twit = require('twit');
let config = require('../config');
let T = new Twit(config);

console.log('Twit has been initialized.');

function tweetBot(txt) {

    let params = {
        track: txt
    };

    let stream = T.stream('statuses/filter', params);
    console.log("Stream activated.");

    //whenever this stream sees a tweet, execute uponTweet(tweet).
    stream.on('tweet', uponTweet);

    function uponTweet(tweet) {
        console.log("A tweet was found!");
        console.log("Tweet was made by " + tweet.user.name + " @" + tweet.user.screen_name);
        console.log("Tweet text : " + tweet.text);

        //get the ID of the tweet to be retweeted to.
        let id = tweet.id_str;
        let params = {
            id: id
        };

        T.post('statuses/retweet/:id', params, tweeted);

        function tweeted(err, data, response) {
            if (err) {
                console.error(err);
            } else {
                console.log("Retweeted!");
                console.log(data);
            }
        }

    }
}

//the parameter will be searched for in every tweet that is made
//once the bot has started running.
tweetBot('@roastme_bot');