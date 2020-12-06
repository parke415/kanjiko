const Character = require('../models/character');

// DUMMY DATA
const charOne = new Character;
charOne.glyph = "渥";
charOne.components = [{glyph: '水', role: 'Semantic', form: '氵'}, {glyph: '屋', role: 'Phonetic'}];
charOne.strokes = 12;
charOne.learned = false;
charOne.variants = '沃沃';
const meaning1 = {definition: 'drip', readings: [{language: 'Mandarin', sound: 'wu1', register: 'literary'}, {language: 'Cantonese', sound: 'uk1'}]};
const meaning2 = {definition: 'canal', readings: [{language: 'Mandarin', sound: 'wo1', register: 'colloquial'}, {language: 'Cantonese', sound: 'uk1'}]};
charOne.meanings = [meaning1, meaning2];
const charTwo = new Character;
charTwo.glyph = "威";
charTwo.strokes = 9;
charTwo.learned = true;
const charThree = new Character;
charThree.glyph = "䢎";
charThree.strokes = 7;
charThree.learned = true;
const charactersTest = [charOne, charTwo, charThree];

module.exports = {
  index,
  show,
  // new: newChar,
  // create,
  // delete: deleteChar
  // edit,
  // update
};

function index(req, res) {
  let learnedChars = 0;
  charactersTest.forEach(character => {if (character.learned) learnedChars++});
  Character.find({}, (err, characters) => res.render('characters/index', {title: 'Character List', characters: charactersTest, learnedChars}));
}

function show(req, res) {
  Character.findById(req.params.id, (err, character) => {
    res.render('characters/show', {title: `Character Details`, character: charOne});
  });
}

// function newFlight(req, res) {
//   res.render('flights/new', {title: 'New Flight', DEFAULT_DATE});
// }

// function create(req, res) {
//   const flight = new Flight(req.body);
//   flight.save(err => {
//     if (err) return res.redirect('/flights/new');
//     res.redirect('/flights');
//   });
// }