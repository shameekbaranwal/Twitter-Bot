const axios = require('axios');

async function getInsult(name) {
    const api_url = `https://evilinsult.com/generate_insult.php?lang=en&type=text`;
    const response = await axios.get(api_url);
    let insult = response.data;
    insult = name + ", " + insult[0].toLowerCase() + insult.substring(1);
    return insult;
}

module.exports = {
        getInsult: getInsult
}