// routes/drawRoutes.js
const express = require('express');
const router = express.Router();
const drawController = require('../controllers/drawController');
const { ensureUniqueNameAndIP } = require('../middleware/ensureUniqueNameAndIP');

router.post('/', ensureUniqueNameAndIP, drawController.draw);

module.exports = router;