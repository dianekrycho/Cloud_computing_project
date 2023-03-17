// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require("./locations.model");
const { NotFoundError } = require("../custom-errors/not-found.error");
const { ValidationError } = require("../custom-errors/validation.error");

async function createOne(locationData) {
  const location = new Location(locationData);
  return location.save();
}

/**
 * Find multiple locations with custom limit and offset (pagination)
 * @param limit
 * @param offset
 * @returns {Query<Array<HydratedDocument<unknown, {}, {}>>, Document<unknown, any, unknown> & unknown extends {_id?: infer U} ? IfAny<U, {_id: Types.ObjectId}, Required<{_id: U}>> : {_id: Types.ObjectId} & {}, {}, unknown> & {}}
 */
function findAll(limit = 20, offset = 0) {
  return Location.find().limit(limit).skip(offset);
}

async function findOne(id) {
  let location;
  try {
    location = await Location.findById(id);
  } catch (e) {
    console.error(e);
    throw new ValidationError(e.message);
  }
  if (!location) {
    throw new NotFoundError("Location not found");
  }
  return location;
}

async function updateOne(id, locationData) {
  const location = await findOne(id);
  for (const locationElementKey in locationData) {
    if (
      locationElementKey[0] !== "_" &&
      locationData.hasOwnProperty(locationElementKey)
    ) {
      location[locationElementKey] = locationData[locationElementKey];
    }
  }
  await location.save();
  return await findOne(id);
}

async function deleteOne(id) {
  const location = await findOne(id);
  return location.remove();
}

module.exports = { createOne, findAll, findOne, updateOne, deleteOne };
