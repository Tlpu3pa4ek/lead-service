import path from 'path';
const { google } from 'googleapis';
const { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..', '..');

function resolveCredentialsPath() {
    const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!fromEnv) {
        return path.join(projectRoot, 'leadalertkz-0db29ed2fd96.json');
    }
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(projectRoot, fromEnv);
}

const auth = new google.auth.GoogleAuth({
    keyFile: resolveCredentialsPath(),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * @param {{ name: string, phone: string, source?: string }} lead
 */
const saveToSheets = async (lead) => {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID?.trim();
    if (!spreadsheetId) {
        throw new Error('GOOGLE_SHEET_ID is not set in .env');
    }

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [
                [
                    new Date().toLocaleString('ru-RU', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                    }),
                    lead.name,
                    lead.phone,
                    lead.source || '',
                ],
            ],
        },
    });
};

