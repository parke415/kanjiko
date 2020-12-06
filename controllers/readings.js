const character = require('../models/character');
const Character = require('../models/character');

module.exports = {
  create,
  delete: deleteOne
};

function create(req, res) {
  Character.findById(req.params.id, function(err, character) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    character.readings.push(req.body);
    character.save(err => res.redirect(`/characters/${character._id}`));
  });
}

function deleteOne(req, res, next) {
  Character.findOne({'readings._id': req.params.id}).then(character => {
    const reading = character.readings.id(req.params.id);
    if (!reading.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    reading.remove();
    character.save().then(() => res.redirect(`/characters/${character._id}`)).catch(err => next(err));
  });
}