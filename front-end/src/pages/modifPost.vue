<template>
   <section>
      <div class="div_back">
         <router-link to="/user" class="icon_back"><font-awesome-icon icon="fa-solid fa-circle-left" /></router-link>
      </div>
      <div class="block_create">
         <form ref="formModifPost" action="" method="post" class="block_user">
            <img :src="image" class="image_post" alt="" />
            <input class="input_ad_photo" type="file" name="image" accept="image/png, image/jpeg, image/jpg" />
            <textarea v-model="message" name="message" class="message_post" type="text">{{ message }}</textarea>
            <button @click="modifPost(this.id)" type="button" class="button_validé">Validate</button>
         </form>
      </div>
   </section>
   <router-view></router-view>
</template>

<script>
export default {
   name: "modifPost",
   data: function () {
      return {
         message: "",
         image: "",
         id: "",
      };
   },

   created() {
      if (localStorage.getItem("user") === null) this.$router.push("/");
   },

   mounted() {
      let postRecup = JSON.parse(localStorage.getItem("post"));
      if (localStorage.getItem("user") !== null) {
         this.message = postRecup.message;
         this.image = postRecup.image;
         this.id = postRecup._id;
         localStorage.removeItem("post");
      }
   },

   methods: {
      modifPost(id) {
         const formModifData = new FormData(this.$refs.formModifPost);
         fetch("http://localhost:4000/api/post/" + id, {
            method: "PUT",
            body: formModifData,
            headers: { authorization: "Bearer " + localStorage.getItem("token") },
         })
            .then((resp) => resp.json())
            .then((json) => {
               this.$router.push("/user");
            })
            .catch((error) => {});
      },
   },
};
</script>

<style scoped>
.block_create {
   width: 500px;
   background-color: white;
   border: 2px solid white;
   border-radius: 25px;
   margin-right: auto;
   margin-left: auto;
   margin-top: 15vh;
   box-shadow: 0px 0px 20px 0px #7b7b7b;
}

.button_validé {
   margin-bottom: 15px;
}
.input_ad_photo {
   margin-bottom: 15px;
   margin-top: 15px;
}
.message_post {
   border: 1px solid black;
   border-radius: 20px 20px 0px 20px;
   padding: 8px;
   width: 300px;
}
.message_post:focus {
   outline: none;
}

.div_back {
   text-align: center;
   margin-top: 20px;
   font-size: 2em !important;
}

.icon_back {
   color: red;
}

.image_post {
   width: 100px;
   height: 100px;
   margin-left: 20px;
}

@media (max-width: 500px) {
   .block_create {
      width: 90%;
      margin-right: 5%;
   }
   .message_post {
      width: 80%;
   }
}
</style>
