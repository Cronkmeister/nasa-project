const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");

const planets = require("./planets.mongo");

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
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found! 🌎`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      //exclude these properties from the document
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(data) {
  try {
    await planets.updateOne(
      {
        // only update if it doesn't already exist
        // pass data in a way that conforms to planets model
        keplerName: data.kepler_name,
      },
      {
        keplerName: data.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
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
