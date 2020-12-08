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

// function deleteComp(req, res) {
//   Character.findOne({'components._id': req.params.componentId}, (err, character) => {
//     if (!character.user.equals(req.user._id)) return res.redirect(`/characters/${character._id}`);
//     character.components.remove(req.params.componentId);
//     character.save(err => res.redirect(`/characters/${character._id}`));
//   });
// }

function deleteComp(req, res) {
  Character.findById(req.params.id, (err, character) => {
    character.components = [];
    character.save(err => {
      res.redirect(`/characters/${character._id}`);
    })
  });
}