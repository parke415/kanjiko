const Character = require('../models/character');

module.exports = {
  create,
  delete: deletePron
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

function deletePron(req, res) {
  Character.findById(req.params.id, (err, character) => {
    character.readings = [];
    character.save(err => {
      res.redirect(`/characters/${character._id}`);
    })
  });
}