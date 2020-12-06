const Character = require('../models/character');

module.exports = {
  index,
  // show,
  // new: newChar,
  // create,
  // delete: deleteChar
  // edit,
  // update
};

function index(req, res) {
  Character.find({}, (err, characters) => res.render('characters/index', {title: 'Character List', characters}));
}

// function show(req, res) {
//   Flight.findById(req.params.id, (err, flight) => {
//     const unavailable = [];
//     flight.destinations.forEach(destination => unavailable.push(destination.airport));
//     const available = AIRPORTS.filter(airport => flight.airport !== airport && !unavailable.includes(airport));
//     Ticket.find({flight: flight._id}, function(err, tickets) {
//       res.render('flights/show', {title: `${flight.airline} Airlines — Flight ${flight.flightNo}`, flight, tickets, available, DEFAULT_DATE});
//     });
//   });
// }

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