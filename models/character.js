const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readingSchema = new Schema({
  language: {type: String, enum: ['Japanese', 'Mandarin', 'Cantonese', 'Taiwanese', 'Shanghainese', 'Hakka', 'Korean', 'Vietnamese', 'Middle Chinese', 'Old Chinese']},
  register: {type: String, enum: ['n/a', 'native', 'Sinoxenic', 'colloquial', 'literary'], default: 'n/a'},
  sound: {type: String, required: true}
}, {
  timestamps: true
});

const characterSchema = new Schema({
  glyph: {type: String, required: true},
  learned: {type: Boolean, default: false},
  semantic: [{type: Schema.Types.ObjectId, ref: 'Character'}],
  phonetic: [{type: Schema.Types.ObjectId, ref: 'Character'}],
  strokes: {type: Number, min: 1, max: 0, required: true},
  variants: {type: String, default: 'n/a'},
  meaning: {type: String, default: 'n/a'},
  readings: [readingSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Character', characterSchema);