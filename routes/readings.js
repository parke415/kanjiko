const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');
const isLoggedIn = require('../config/auth');

router.post('/characters/:id/readings', isLoggedIn, readingsCtrl.create);
router.delete('/characters/:id/deleteReadings', isLoggedIn, readingsCtrl.delete);

module.exports = router;