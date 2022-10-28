// Importer mangoose
const mongoose = require("mongoose");

// Importer UniqueValidator pour eviter les doublons d'email en bbd
const uniqueValidator = require("mongoose-unique-validator");

// Definir le schema de données que l'on doit récuperer
const userSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, unique: true },
  admin: { type: Boolean, default: false},
});

userSchema.plugin(uniqueValidator);

// Exporter le model
module.exports = mongoose.model("User", userSchema);
