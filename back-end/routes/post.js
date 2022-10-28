//// Importer express
const express = require("express");
//
//// Definir le router
const router = express.Router();
//
//// Importation du controller de sauce
const postCtrl = require("../Controllers/post");
//
//// Importation des middlewares
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
//
//
//
//
//
//// Definir les routes pour manipuler les posts
router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.modifPost);
router.post("/like/:id", auth, postCtrl.likePost);
//
//
// Export des routes
module.exports = router;
