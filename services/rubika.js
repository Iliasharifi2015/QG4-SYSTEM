const axios = require("axios");

const TOKEN = process.env.RUBIKA_BOT_TOKEN;

const api = axios.create({
    baseURL: `https://botapi.rubika.ir/v3/${TOKEN}`,
    timeout: 10000
});

async function sendMessage(chatId, text) {
    const { data } = await api.post("/sendMessage", {
        chat_id: chatId,
        text
    });

    return data;
}

async function getUpdates(limit = 10) {
    const { data } = await api.post("/getUpdates", {
        limit
    });

    return data;
}

module.exports = {
    sendMessage,
    getUpdates
};
