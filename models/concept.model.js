const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConceptSchema = new Schema({
    name: {type: String, required: true, max: 100},
    position: {
      x: {type: Number, required: true},
      y: {type: Number, required: true},
      z: {type: Number, required: true},
    },
    fieldOfStudy: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Concept', ConceptSchema);
