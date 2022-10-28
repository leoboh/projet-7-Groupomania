// Importation d'express
const express = require("express");
const app = express();

// Importation de mongoose
const mongoose = require("mongoose");

// Importation de bodyParser pour traduire les req.body en json
const bodyParser = require("body-parser");

// Importation du cors
const cors = require("cors");

// Importation de path
const path = require("path");

//Importer dotenv
require("dotenv").config();

// Importation des routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user")

// Connexion à la bdd
console.log(process.env.PASSDB);
mongoose
   .connect(process.env.PASSDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("Connexion à MongoDB réussie !"))
   .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.query());
app.disable("x-powered-by");
app.use("/images", express.static("images"));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

app.listen(4000);
