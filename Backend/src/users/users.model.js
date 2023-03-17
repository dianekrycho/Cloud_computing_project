const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    select: false, // By default, this field is not selected
  },
  role: { type: String },
});

// Hook, always called before saving an instance of the model.
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// Create a method attached to model. Can be called on any model instance.
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  if (!user.password) {
    return false;
  }
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
