const http = require("http");
const mongoose = require("mongoose");

require("dotenv").config();

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://nasa-api:${process.env.MONGO_PASSWORD}@cluster0.jfi08o9.mongodb.net/?retryWrites=true&w=majority`;

const server = http.createServer(app);

//mongoose event handlers
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
mongoose.set("strictQuery", false);

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}... 🚀`);
  });
}

startServer();
