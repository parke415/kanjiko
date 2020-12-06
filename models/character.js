const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readingSchema = new Schema({
  language: {type: String, enum: ['Japanese', 'Mandarin', 'Cantonese', 'Korean', 'Middle Chinese'], required: true},
  register: {type: String, enum: ['native', 'Sinoxenic', 'colloquial', 'literary']},
  sound: {type: String, required: true}
});

const meaningSchema = new Schema({
  definition: {type: String, required: true},
  readings: [readingSchema]
});

const componentSchema = new Schema({
  glyph: {type: String, required: true},
  role: {type: String, enum: ['Semantic', 'Phonetic', 'Phono-semantic'], required: true},
  form: {type: String}
})

const characterSchema = new Schema({
  glyph: {type: String, required: true, unique: true},
  learned: {type: Boolean, default: false},
  components: [componentSchema],
  strokes: {type: Number, min: 1, max: 99, required: true},
  variants: {type: String},
  meanings: [meaningSchema],
});

module.exports = mongoose.model('Character', characterSchema);