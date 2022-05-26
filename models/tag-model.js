const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  name: String,
  logo: String,
});

const Tag = model("tag", tagSchema);
module.exports = Tag;
