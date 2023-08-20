const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const routers = require("./routes")

require("body-parser");
require("dotenv").config();

// Connection Config
try {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB"));
} catch (error) {
  console.error("Failed to connect to mongoDB");
}

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Configurations for "Static-files"
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

routers(app);
