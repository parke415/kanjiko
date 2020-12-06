const Character = require('../models/character');

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
  const charOne = new Character;
  charOne.glyph = "喔";
  charOne.strokes = 12;
  charOne.learned = true;
  const charTwo = new Character;
  charTwo.glyph = "威";
  charTwo.strokes = 9;
  charTwo.learned = false;
  const charThree = new Character;
  charThree.glyph = "䢎";
  charThree.strokes = 7;
  charThree.learned = true;
  const charactersTest = [charOne, charTwo, charThree];
  let learnedChars = 0;
  charactersTest.forEach(character => {if (character.learned) learnedChars++});
  Character.find({}, (err, characters) => res.render('characters/index', {title: 'Characters', characters: charactersTest, learnedChars}));
}

function show(req, res) {
  Character.findById(req.params.id, (err, character) => {
    res.render('characters/show', {title: `Details of ${character.glyph}`, character});
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