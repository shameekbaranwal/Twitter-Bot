const fetch = require('node-fetch');

async function getInsult(name) {
    const param = {
        method: 'GET',
    }
    const api_url = `https://insults.tr00st.co.uk/phrases/so/action_and_target/?target=${name}&pronoun=they`;

    const response = await fetch(api_url, param);
    const data = await response.json();
    return data;
}

module.exports = {
        getInsult: getInsult
}