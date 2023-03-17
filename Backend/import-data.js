const mongoose = require("mongoose");
require("dotenv").config();

const Location = require("./src/locations/locations.model");

const filmingLocations = require("./lieux-de-tournage-a-paris.json");

function buildLocation(filmingLocation) {
  return {
    filmType: filmingLocation.type_tournage,
    filmProducerName: filmingLocation.nom_producteur,
    endDate: filmingLocation.date_fin,
    filmName: filmingLocation.nom_tournage,
    district: filmingLocation.ardt_lieu,
    sourceLocationId: filmingLocation.id_lieu,
    filmDirectorName: filmingLocation.nom_realisateur,
    address: filmingLocation.adresse_lieu,
    startDate: filmingLocation.date_debut,
    year: filmingLocation.annee_tournage,
    geolocation: filmingLocation.geo_shape?.geometry,
  };
}

async function importBulkFilmingLocations() {
  const locationsArray = filmingLocations.map((filmingLocation) =>
    buildLocation(filmingLocation)
  );
  await Location.insertMany(locationsArray);
}
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Import script connected to database, starting import.");
  await importBulkFilmingLocations();
  console.log("Finished importing.");
}

main();
