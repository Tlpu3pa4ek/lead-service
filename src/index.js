const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.warn(
        'Warning: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing. Load .env from project root (see dotenv path in app.js).'
    );
}

if (!process.env.GOOGLE_SHEET_ID?.trim()) {
    console.warn(
        'Info: GOOGLE_SHEET_ID is empty — Telegram only until you set the spreadsheet ID in .env (URL fragment between /d/ and /edit).'
    );
}

const express = require('express');
const cors = require('cors');

const leadRoutes = require('./routes/lead.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/leads', leadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
