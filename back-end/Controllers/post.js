const DEFAULT_FILE = "default.jpeg";
//
//// Importer fs
const fs = require("fs");
//
//// Importer le model du post
const Post = require("../models/post");
//
//
//
//
//
//// Création d'un post
exports.createPost = (req, res) => {
   let resPost = req.body;
   delete resPost._id;
   const filename = req.file?.filename || DEFAULT_FILE;
   const post = new Post({
      ...resPost,
      image: `${req.protocol}://${req.get("host")}/images/${filename}`,
      userId: req.token.userId,
   });
   post
      .save()
      .then(() => res.status(201).json({ message: "Post créé !" }))
      .catch((error) => res.status(400).json({ message: "Erreur lors de la sauvegarde du post" }));
};
//
//
//
//// Recuperer tous les posts
exports.getAllPost = (req, res) => {
   Post.find()
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(400).json({ message: " Les Posts sont introuvable" }));
};
//
//
//
//// Recuperer un post
exports.getOnePost = (req, res) => {
   Post.findOne({ _id: req.params.id })
      .then((post) => res.status(200).json(post))
      .catch((error) => res.status(400).json({ message: "Le Post est introuvable" }));
};
//
//
//
//// Modifier un post
exports.modifPost = (req, res) => {
   const resPost = req.file
      ? {
           image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
           message: req.body.message,
        }
      : { message: req.body.message };

   delete resPost._userId;
   Post.findOne({ _id: req.params.id })
      .then((oldPost) => {
         if ((oldPost && oldPost.userId === req.token.userId) || req.token.admin) {
            const filename = oldPost.image.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
               Post.deleteOne({ _id: req.params.id });
            });
            Post.updateOne({ _id: req.params.id }, { ...oldPost.toObject(), ...resPost })
               .then(() => res.status(200).json({ message: "Objet modifié!" }))
               .catch((error) => res.status(401).json({ error }));
         } else {
            res.status(403).json({ error: "Modif not allowed" });
         }
      })
      .catch((error) => {
         res.status(400).json({ error });
      });
};
//
//
//
//// Supprimer un post
exports.deletePost = (req, res) => {
   Post.findOne({ _id: req.params.id }).then((post) => {
      if ((post && post.userId === req.token.userId) || req.token.admin) {
         const filename = post.image.split("/images/")[1];
         if (filename !== DEFAULT_FILE) {
            fs.unlink(`images/${filename}`, () => {
               Post.deleteOne({ _id: req.params.id })
                  .then(() => {
                     res.status(200).json({ message: "Objet supprimé !" });
                  })
                  .catch((error) => res.status(401).json({ error }));
            });
         } else {
            Post.deleteOne({ _id: req.params.id })
               .then(() => {
                  res.status(200).json({ message: "Objet supprimé !" });
               })
               .catch((error) => res.status(401).json({ error }));
         }
      } else {
         res.status(403).json({ error: "Suppression not allowed" });
      }
   });
};
//
//
//
//// like post
exports.likePost = (req, res) => {
   Post.findOne({ _id: req.params.id }).then((post) => {
      /* ------------ */
      // Ajouter un like
      /* ------------ */
      if (!post.usersLiked.includes(req.token.userId)) {
         Post.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.token.userId } })
            .then(() => {
               res.status(200).json({ message: "Post liked !" });
            })
            .catch((error) => res.status(401).json({ error }));
      }
      /* ------------ */
      // Enlever un like
      /* ------------ */
      else {
         Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.token.userId } })
            .then(() => {
               res.status(200).json({ message: "Post unliked !" });
            })
            .catch((error) => res.status(401).json({ error }));
      }
   });
};
