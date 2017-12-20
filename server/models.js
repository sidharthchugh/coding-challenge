const mongoose = require("mongoose");

const questionnaireSchema = mongoose.Schema({
  email: { type: String, required: true },
  age: { type: String, required: true },
  parties: { type: String},
  beerConsumption: { type: String, required: true }
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = { Questionnaire };
