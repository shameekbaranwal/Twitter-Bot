/*
Twitter bot #5
Replies to the tweet that mentions @roastme_bot with
a random one-liner roast obtained from EvilInsults API.
author : @shameekbaranwal
*/

console.log('This bot is running.');

const insultAPI = require('./insults.js');
console.log('EvilInsults API is ready to use.')

const Twit = require('twit');
const config = require('./config.js');
const T = new Twit(config);
console.log('Twit has been initialized.');


function tweetBot(txt) {

    let params = {
        track: txt
    };

    let stream = T.stream('statuses/filter', params);
    console.log("Stream is now active.");

    //whenever this stream sees a tweet, do uponTweet(tweet).
    try {
        stream.on('tweet', uponTweet);
    } catch (error) {
        console.log("Detected a tweet, but could not reply. Error below\n" + error);
    }

    async function uponTweet(tweet) {
        console.log("A tweet was found!");
        console.log("Tweet was made by " + tweet.user.name + " @" + tweet.user.screen_name);
        console.log("Tweet text : " + tweet.text);

        let idOfTweet = tweet.id_str;
        let idOfTweeter = tweet.user.screen_name;
        let nameOfTweeter = tweet.user.name;


        let chars = "!,.;:=:?#$%^&*()[]{}";
        let firstName = nameOfTweeter.split(" ")[0];

        for (let ch of chars)
            firstName = firstName.split(ch)[0];

        let generatedInsult = await insultAPI.getInsult(firstName);

        let params = {
            in_reply_to_status_id: idOfTweet,
            status: `@${idOfTweeter} ${generatedInsult}`
        };

        T.post('statuses/update', params, tweeted);

        function tweeted(err, data, response) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Roasted @${idOfTweeter}!`);
                console.log(data.text);
            }
        }

    }
}

//the parameter will be searched for in every tweet that is made
//once the bot has started running.
tweetBot('@roastme_bot');