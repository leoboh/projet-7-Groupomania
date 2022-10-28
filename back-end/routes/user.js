// Importer express
const express = require("express");
//
// Definir le router
const router = express.Router();
//
// Importation du controller user
const userCtrl = require("../Controllers/user");
//
// Importation des middlewares
const auth = require("../middlewares/auth");
//
//
//
// Definir les route pour recuperer les doonees
router.get("/", auth, userCtrl.getUsers);
//
//
// Export des routes
module.exports = router;