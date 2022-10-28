<template>
   <section class="section_user">
      <div class="add_message">
         <router-link to="/createPost" class="icon_add_post"><font-awesome-icon icon="fa-solid fa-circle-plus" /></router-link>
      </div>
      <div class="block_user">
         <div v-for="post in finalPosts" class="bulle bulle_message">
            <p class="p_name">{{ post.user?.name }}</p>
            <img v-bind:src="post.image" class="image_post" alt="" />
            <p class="p_message">{{ post.message }}</p>
            <div class="div_icons">
               <font-awesome-icon
                  v-if="post.userId === userConnected || user.admin"
                  @click="deletePost(post._id)"
                  class="icon_poub icon"
                  icon="fa-solid fa-trash"
               />
               <font-awesome-icon
                  v-if="post.userId === userConnected || user.admin"
                  @click="getPost(post._id)"
                  class="icon_pen icon"
                  icon="fa-solid fa-pen"
               />
               <font-awesome-icon
                  @click="likePost(post._id)"
                  :class="{ liked: postIsLiked(post) }"
                  class="icon_coeur icon"
                  icon="fa-solid fa-heart"
               />
               <span class="span_like">{{ post.usersLiked.length }}</span>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
export default {
   name: "findPost",
   data: function () {
      return {
         error: false,
         posts: [],
         users: [],
         user: null,
         userConnected: localStorage.getItem("userId"),
      };
   },

   created() {
      if (localStorage.getItem("user") === null) this.$router.push("/");
   },

   mounted() {
      this.user = JSON.parse(localStorage.getItem("user"));
      fetch("http://localhost:4000/api/post/", {
         method: "GET",
         headers: { "Content-Type": "application/json", authorization: "Bearer " + localStorage.getItem("token") },
      })
         .then((resp) => resp.json())
         .then((posts) => {
            this.posts = posts;
         })
         .catch((error) => {
            this.error = true;
         });

      fetch("http://localhost:4000/api/user/", {
         method: "GET",
         headers: { "Content-Type": "application/json", authorization: "Bearer " + localStorage.getItem("token") },
      })
         .then((resp) => resp.json())
         .then((users) => {
            this.users = users;
         })
         .catch((error) => {
            this.error = true;
         });
   },

   methods: {
      actualization() {
         fetch("http://localhost:4000/api/post/", {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: "Bearer " + localStorage.getItem("token") },
         })
            .then((resp) => resp.json())
            .then((posts) => {
               this.posts = posts;
            })
            .catch((error) => {
               this.error = true;
            });
      },

      deletePost(id) {
         fetch("http://localhost:4000/api/post/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: "Bearer " + localStorage.getItem("token") },
         }).then((res) => {
            return this.actualization();
         });
      },

      getPost(id) {
         fetch("http://localhost:4000/api/post/" + id, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: "Bearer " + localStorage.getItem("token") },
         })
            .then((resp) => resp.json())
            .then((post) => {
               localStorage.setItem("post", JSON.stringify(post));
               this.$router.push("/modifPost");
            });
      },

      likePost(id) {
         fetch("http://localhost:4000/api/post/like/" + id, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: "Bearer " + localStorage.getItem("token") },
         })
            .then((resp) => resp.json())
            .then((res) => {
               return this.actualization();
            });
      },

      postIsLiked(post) {
         const userId = localStorage.getItem("userId");
         return post.usersLiked.includes(userId);
      },
   },

   computed: {
      finalPosts() {
         return this.posts
            .map((post) => {
               const user = this.users.find((user) => post.userId === user._id);
               return { ...post, user };
            })
            .reverse();
      },
   },
};
</script>

<style scoped>
.block_user {
   display: flex;
   flex-direction: column;
}

.bulle_message {
   width: 500px;
   background-color: white;
   border: 2px solid white;
   border-radius: 25px;
   margin-right: auto;
   margin-left: auto;
   margin-top: 20px;
   box-shadow: 0px 0px 20px 0px #7b7b7b;
}

.p_name {
   text-align: center;
   padding: 10px;
   color: #4e5166;
}

.p_message {
   margin: 20px;
   background: #f9d9d8;
   border-radius: 10px;
   padding: 10px;
   word-wrap: break-word;
   color: #4f5165;
}

.add_message {
   width: fit-content;
   margin: auto;
   margin-top: 25px;
}
.add_message:hover {
   transform: scale(1.1);
}

.image_post {
   width: 100px;
   height: 100px;
   margin-left: 20px;
}

.icon_add_post {
   color: #fd2d01;
   font-size: 2em !important;
}

.div_icons {
   justify-content: center;
   display: flex;
   align-items: center;
}
.icon {
   margin: 5px;
   font-size: 1.2em !important;
   color: #4f5164;
}
.icon:hover {
   cursor: pointer;
   color: #fd2b01ab;
}

.liked {
   color: #fd2d01;
}
.section_user {
   padding-bottom: 25px;
}

.span_like {
   font-size: 0.8em;
   margin-top: 8px;
}

@media (max-width: 500px) {
   .bulle_message {
      width: 90%;
      margin-right: 5%;
   }
}
</style>
