const axios = require('axios');
const ApiError = require('../utils/ApiError');

const rasa_server_url = process.env.rasa_server_url;
console.log('rasa_server_url: ', rasa_server_url);

async function makeRasaRequest(data) {
    try {
        const response = await axios.post(rasa_server_url, data, {});
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new ApiError(error);
    }
}

module.exports = { makeRasaRequest };