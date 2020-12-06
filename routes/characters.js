const express = require('express');
const router = express.Router();
const charactersCtrl = require('../controllers/characters');
const isLoggedIn = require('../config/auth');

router.get('/', charactersCtrl.index);
// router.get('/new', isLoggedIn, charactersCtrl.new);
// router.get('/:id', charactersCtrl.show);
// router.post('/', isLoggedIn, charactersCtrl.create);

module.exports = router;