const express = require('express');
const router = express.Router();

const { createLead } = require('../controllers/lead.controller');

router.post('/', createLead);

module.exports = router;