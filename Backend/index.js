require("dotenv").config();
const express = require("express");
const locationsController = require("./src/locations/locations.controller");
const usersController = require("./src/users/users.controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./src/authentication/local.strategy");
require("./src/authentication/jwt.strategy");
const passport = require("passport");
const cors = require("cors");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  next();
});
app.use(bodyParser.json());
app.use(cors());

// Protect all /locations route with JWT Authentication
app.use(
  "/locations",
  passport.authenticate("jwt", { session: false }),
  locationsController
);
app.use("/users", usersController);

app.get("/", (req, res) => res.status(200).json({ message: "Hello World !" }));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Mongo Database");
  app.listen(port, () => {
    console.log(
      `API listening on port ${port}, visit http://localhost:${port}/`
    );
  });
}

main();
