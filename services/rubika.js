const axios = require("axios");

const TOKEN = process.env.RUBIKA_BOT_TOKEN;

const api = axios.create({
    baseURL: `https://botapi.rubika.ir/v3/${TOKEN}`,
    timeout: 10000
});

async function sendMessage(chatId, text) {

    try {

        const { data } = await api.post("/sendMessage", {
            chat_id: chatId,
            text: text
        });

        return data;

    } catch (err) {

        console.error("Rubika Error:", err.response?.data || err.message);

        throw err;

    }

}

module.exports = {

    sendMessage

};
