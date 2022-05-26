const { Schema, model } = require("mongoose");

const persronSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
});

const Person = model("Person", persronSchema);
module.exports = Person;
