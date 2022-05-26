const { Schema, model } = require("mongoose");

const toolSchema = new Schema({
  name: String,
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  logo: String,
  content: String,
});

const Tool = model("tool", toolSchema);
module.exports = Tool;
