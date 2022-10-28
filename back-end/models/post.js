// Importer mangoose
const mongoose = require("mongoose");

// Definir le schema de données que l'on doit récuperer
const postSchema = mongoose.Schema({
  userId: { type: String, require: true },
  message: { type: String },
  image: { type: String },
  usersLiked: { type: [String] },
});

// Exporter le model
module.exports = mongoose.model("Post", postSchema);
