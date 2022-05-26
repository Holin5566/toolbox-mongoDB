const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  uid: String,
  email: String,
  avatar: String,
  used: [
    {
      type: Schema.Types.ObjectId,
      ref: "tool",
    },
  ],
  interested: [
    {
      type: Schema.Types.ObjectId,
      ref: "tool",
    },
  ],
  creatAt: Date,
});

const User = model("user", userSchema);
module.exports = User;
