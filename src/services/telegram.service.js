const axios = require('axios');

const sendTelegramMessage = async (text) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await axios.post(url, {
        chat_id: chatId,
        text,
    });
};

module.exports = { sendTelegramMessage };