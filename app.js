const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
let db;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// If it's in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "client", "src")));
}

// Importing DB Config
if (process.env.PORT) {
  db = process.env.MONGODB_URI;
} else {
  db = require("./config/keys").devURI;
}

// Routers
// import someRouter from './routers/someRoutes.js';
app.get("/someRoute", function (req, res) {
  res.send("Function to execute someRouter router");
});

// Connecting to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("\nMongoDB ERROR - Connection acting up!\n"));

// Creating Server
const port = process.env.PORT || 3001;

app.listen(port, () => console.debug(`Server listening on port ${port}`));

module.exports = app;
