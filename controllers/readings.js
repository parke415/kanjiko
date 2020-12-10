const Character = require('../models/character');

module.exports = {
  create,
  delete: deletePron
};

function create(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    character.readings.push(req.body);
    character.save(err => res.redirect(`/characters/${character._id}`));
  });
}

function deletePron(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    character.readings = [];
    character.save(err => res.redirect(`/characters/${character._id}`));
  });
}