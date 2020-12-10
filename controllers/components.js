const Character = require('../models/character');

module.exports = {
  create,
  delete: deleteComp
};

function create(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    character.components.push(req.body);
    character.save(err => res.redirect(`/characters/${character._id}`));
  });
}

function deleteComp(req, res) {
  Character.findById(req.params.id, (err, character) => {
    if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    character.components = [];
    character.save(err => res.redirect(`/characters/${character._id}`));
  });
}