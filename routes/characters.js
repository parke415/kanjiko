const express = require('express');
const router = express.Router();
const charactersCtrl = require('../controllers/characters');
const isLoggedIn = require('../config/auth');

router.get('/', charactersCtrl.index);
router.get('/new', isLoggedIn, charactersCtrl.new);
router.get('/:id', charactersCtrl.show);
router.post('/', isLoggedIn, charactersCtrl.create);
router.get('/:id/edit', isLoggedIn, charactersCtrl.edit);
router.put('/:id', isLoggedIn, charactersCtrl.update);
router.delete('/:id', isLoggedIn, charactersCtrl.delete);
router.put('/:id/learnToggle', isLoggedIn, charactersCtrl.learnToggle);

module.exports = router;