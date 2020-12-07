const Character = require('../models/character');

module.exports = {
  create,
  delete: deleteComp
};

function create(req, res) {
  Character.findById(req.params.id, function(err, character) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    character.components.push(req.body);
    character.save(err => res.redirect(`/characters/${character._id}`));
  });
}

function deleteComp(req, res, next) {
  Character.findOne({'components._id': req.params.id}).then(character => {
    const component = character.components.id(req.params.id);
    if (!component.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
    component.remove();
    character.save().then(() => res.redirect(`/characters/${character._id}`)).catch(err => next(err));
  });
}