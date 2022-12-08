const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    //criteria for habitable planet: the size of the planet (radius < 1.6) and the amount of sunlight between 0.36 -> 1.11
    //**numbers above correspond earth's own measurements.
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found! 🌎`);
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};

/*
const promise = new Promise((resolve, reject) => {

});
promise.then((result) => {

});
*/
