const Character = require('../models/character');

module.exports = {
  index,
  show,
  new: newChar,
  create,
  edit,
  update,
  delete: deleteChar,
  learnToggle,
};

function index(req, res) {
  Character.find({user: req.user._id}, (err, characters) => {
    let learnedChars = 0;
    characters.forEach(character => {if (character.learned) learnedChars++});
    res.render(`characters/index`, {title: 'Character List', characters, learnedChars});
  });
}

function show(req, res) {
  Character.findById(req.params.id, (err, character) => res.render(`characters/show`, {title: 'Character Details', character, user: req.user._id}));
}

function newChar(req, res) {
  res.render(`characters/new`, {title: 'New Character'});
}

function create(req, res) {
  req.body.user = req.user._id;
  const character = new Character(req.body);
  Character.find({user: req.user._id, glyph: character.glyph}, (err, duplicate) => {
    if (err || duplicate.length) return res.redirect(`/characters/new`);
    character.save(err => {
      if (err) return res.redirect(`/characters/new`);
      res.redirect(`/characters/${character._id}`);
    });
  });
}

function edit(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    res.render(`characters/edit`, {title: 'Edit Character', character});
  });
}

function update(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    Object.assign(character, req.body);
    character.save(err => {
      if (err) return res.redirect(`/characters/new`);
      res.redirect(`/characters/${character._id}`);
    });
  });
}

function deleteChar(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    character.remove();
    res.redirect(`/characters`);
  });
}

function learnToggle(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    character.learned = !character.learned;
    character.save(err => {
      if (character.learned) {
        res.redirect(`/characters`);
      } else {
        res.redirect(`/characters/${character._id}`);
      }
    });
  });
}