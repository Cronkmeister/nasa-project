const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = `mongodb+srv://nasa-api:${process.env.MONGO_PASSWORD}@cluster0.jfi08o9.mongodb.net/?retryWrites=true&w=majority`;

//mongoose event listeners
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
mongoose.set("strictQuery", false);

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
