const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readingSchema = new Schema({
  language: {type: String, enum: ['Japanese', 'Mandarin', 'Cantonese', 'Korean', 'Middle Chinese'], required: true},
  register: {type: String, enum: ['native', 'Sinoxenic', 'colloquial', 'literary']},
  sound: {type: String, required: true},
  definition: {type: Number, min: 1, max: 9}
});

const componentSchema = new Schema({
  glyph: {type: String, required: true},
  role: {type: String, enum: ['semantic', 'phonetic', 'phono-semantic'], required: true},
  form: {type: String}
})

const characterSchema = new Schema({
  glyph: {type: String, required: true, unique: true},
  learned: {type: Boolean, default: false},
  compound: {type: Boolean, required: true},
  components: [componentSchema],
  strokes: {type: Number, min: 1, max: 99, required: true},
  variants: {type: String},
  meanings: {type: String, required: true},
  readings: [readingSchema],
});

module.exports = mongoose.model('Character', characterSchema);