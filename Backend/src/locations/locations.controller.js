// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require("express").Router();
const locationsService = require("./locations.service");
const authorizationMiddleware = require("../authorization/authorization.middleware");
const httpErrorHelper = require("../custom-errors/http-error.helper");

async function controllerCreateOneLocation(req, res) {
  const newLocation = await locationsService.createOne(req.body);
  return res.status(201).send(newLocation);
}

router.post(
  "/",
  authorizationMiddleware.canAccess(["admin"]),
  controllerCreateOneLocation
);

async function controllerGetAllLocations(req, res) {
  const limit = req.query.limit || 200;
  const offset = req.query.offset || 0;
  const locations = await locationsService.findAll(limit, offset);
  return res.status(200).send(locations);
}

router.get("/", controllerGetAllLocations);

async function controllerGetOneLocation(req, res, next) {
  try {
    const location = await locationsService.findOne(req.params.id);
    return res.status(200).send(location);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.get("/:id", controllerGetOneLocation);

async function controllerUpdateOneLocation(req, res, next) {
  try {
    const location = await locationsService.updateOne(req.params.id, req.body);
    return res.status(200).send(location);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.patch(
  "/:id",
  authorizationMiddleware.canAccess(["admin"]),
  controllerUpdateOneLocation
);

async function controllerDeleteOneLocation(req, res, next) {
  try {
    const location = await locationsService.deleteOne(req.params.id);
    return res.status(200).send(location);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.delete(
  "/:id",
  authorizationMiddleware.canAccess(["admin"]),
  controllerDeleteOneLocation
);

module.exports = router;
