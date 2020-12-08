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
    res.render('characters/index', {title: 'Character List', characters, learnedChars});
  });
}

function show(req, res) {
  Character.findById(req.params.id, (err, character) => {
    res.render('characters/show', {title: `Character Details`, character});
  });
}

function newChar(req, res) {
  res.render('characters/new', {title: 'New Character'});
}

function create(req, res) {
  req.body.user = req.user._id;
  const character = new Character(req.body);
  character.save(err => {
    if (err) return res.redirect('/characters/new');
    res.redirect(`/characters/${character._id}`);
  });
}

function edit(req, res) {
  Character.findById(req.params.id, (err, character) => {
    res.render(`characters/edit`, {title: 'Edit Character', character});
  });
}

function update(req, res) {
  Character.findByIdAndUpdate(req.params.id, req.body, function(err, oldChar) {
      res.redirect(`/characters/${req.params.id}`);
  })
}

function deleteChar(req, res) {
  Character.findByIdAndDelete(req.params.id, function(err, deletedChar) {
      res.redirect('/characters');
  })
}

function learnToggle(req, res) {
  // DEBUGGING
  console.log("it gets here!!!!!");
  Character.findById(req.params.id, (err, character) => {
    character.learned = !character.learned;
    character.save(err => {res.redirect(`/characters`)});
  });
}