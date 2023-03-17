const User = require("./users.model");
const { NotFoundError } = require("../custom-errors/not-found.error");
const jwt = require("jsonwebtoken");
const { DuplicateError } = require("../custom-errors/duplicate.error");

async function createOne(userData) {
  try {
    // Override/force `role` property
    const saneData = { ...userData, role: "user" };
    const user = new User(saneData);
    await user.save();
    // Return standardized user format given by findOne function
    return await findOne(user.id);
  } catch (e) {
    if (e.code === 11000) {
      throw new DuplicateError("Username already taken.");
    }
    throw e;
  }
}

async function findOne(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
}

// Only use this function for authentication purpose
async function findOneForAuth(username) {
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
}

async function updateOne(id, newData) {
  const user = await findOne(id);
  // Only allow password editing
  if (newData?.password) {
    user.password = newData.password;
    await user.save();
    return await findOne(id);
  }
  return user;
}

async function generateJwt(user) {
  return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET);
}

async function deleteOne(id) {
  const user = await findOne(id);
  return user.remove();
}

module.exports = {
  createOne,
  findOne,
  findOneForAuth,
  updateOne,
  generateJwt,
  deleteOne,
};
