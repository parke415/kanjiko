const Character = require('../models/character');

// DUMMY DATA
// const charOne = new Character;
// charOne.glyph = "渥";
// charOne.components = [{glyph: '水', role: 'semantic', form: '氵'}, {glyph: '屋', role: 'phonetic'}];
// charOne.strokes = 12;
// charOne.learned = false;
// charOne.variants = '沃沃';
// const meaning1 = {definition: 'drip', readings: [{language: 'Mandarin', sound: 'wu1', register: 'literary'}, {language: 'Cantonese', sound: 'uk1'}]};
// const meaning2 = {definition: 'canal', readings: [{language: 'Mandarin', sound: 'wo1', register: 'colloquial'}, {language: 'Cantonese', sound: 'uk1'}]};
// charOne.meanings = [meaning1, meaning2];
// const charTwo = new Character;
// charTwo.glyph = "威";
// charTwo.strokes = 9;
// charTwo.learned = true;
// const charThree = new Character;
// charThree.glyph = "䢎";
// charThree.strokes = 7;
// charThree.learned = true;
// const charactersTest = [charOne, charTwo, charThree];

module.exports = {
  index,
  show,
  new: newChar,
  create,
  // delete: deleteChar,
  // edit,
  // update,
  learnToggle
};

function index(req, res) {
  Character.find({}, (err, characters) => {
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
  const character = new Character(req.body);
  character.save(err => {
    if (err) return res.redirect('/characters/new');
    res.redirect(`/characters/${character._id}`);
  });
}

function learnToggle(req, res) {
  console.log("it gets here!!!!!");
  Character.findById(req.params.id, (err, character) => {
    character.learned = !character.learned;
    res.redirect(`/characters/${character._id}`);
  });
}