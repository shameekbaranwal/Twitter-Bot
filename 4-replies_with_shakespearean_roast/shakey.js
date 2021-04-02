const fs = require('fs');
var parse = require('csv-parse');


function generateInsult(callback) {
    
    //callback function, will be executed when the file has been read and data has to be parsed.
    function parseData(error, fileData) {
        if (error) {
            console.log("error at reading the file " + error);
        } else {
            const params = {
                columns: false,
                trim: true
            };
            parse(fileData, params, getInsult);
        }
    }
    
    //callback function, will be executed when the data has been parsed and the insult has to be generated.
    function getInsult(error, data) {  
        if (error) {
            console.log("error at parsing the CSV " + error);
        }  
        const size = data.length;
        let vowel = '';

        let rand = [], insult = [];
        for (let i = 0; i < 3; i++) {
            rand.push(Math.floor(Math.random() * size));
            insult.push(data[rand[i]][i]);
        }
        //to append valid vowel based on first letter of first word
        if ('aeiouAEIOU'.indexOf(insult[0][0]) === -1)
            vowel = 'a';
        else
            vowel = 'an';

        let generatedInsult = `thou art ${vowel} ${insult[0]} ${insult[1]} ${insult[2]}.`;
        callback(generatedInsult);
    }

    fs.readFile('./shakey.txt', parseData);
}


module.exports = {
    generateInsult: generateInsult
};