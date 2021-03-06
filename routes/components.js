const express = require('express');
const router = express.Router();
const componentsCtrl = require('../controllers/components');
const isLoggedIn = require('../config/auth');

router.post('/characters/:id/components', isLoggedIn, componentsCtrl.create);
router.delete('/characters/:id/deleteComponents', isLoggedIn, componentsCtrl.delete);

module.exports = router;