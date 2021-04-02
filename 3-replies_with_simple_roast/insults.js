const axios = require('axios');

async function getInsult(name) {
    const api_url = `https://insults.tr00st.co.uk/phrases/so/action_and_target/?target=${name}&pronoun=they`;
    const response = await axios.get(api_url);
    return response.data;
}

module.exports = {
        getInsult: getInsult
}