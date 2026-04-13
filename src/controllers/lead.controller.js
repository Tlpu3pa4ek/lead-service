const { sendTelegramMessage } = require('../services/telegram.service');
const { saveToSheets } = require('../services/sheets.service');

const createLead = async (req, res) => {
    try {
        const { name, phone, source } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone required' });
        }

        const message = `
📥 Новая заявка:
Имя: ${name}
Телефон: ${phone}
Источник: ${source || 'не указан'}
        `;

        const lead = { name, phone, source };

        const sheetId = process.env.GOOGLE_SHEET_ID?.trim();

        const tasks = [sendTelegramMessage(message)];
        if (sheetId) {
            tasks.push(saveToSheets(lead));
        } else {
            console.warn(
                '[lead] Telegram sent; Google Sheets skipped — GOOGLE_SHEET_ID is empty in .env. Paste the spreadsheet ID from the URL (between /d/ and /edit).'
            );
        }

        await Promise.all(tasks);

        return res.status(200).json({ success: true });
    } catch (error) {
        const details = error.response?.data ?? error.errors ?? error.message;
        console.error('Lead error:', details);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createLead };