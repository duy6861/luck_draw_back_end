// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin'); // <-- thêm dòng này
const adminController = require('../controllers/adminController');

router.get('/summary', authAdmin, adminController.getSummary);   // <-- thêm authAdmin
router.get('/draws', authAdmin, adminController.getAllDraws);   // <-- thêm authAdmin

module.exports = router;