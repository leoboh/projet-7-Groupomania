<template>
   <section>
      <div class="div_back">
         <router-link to="/user" class="icon_back"><font-awesome-icon icon="fa-solid fa-circle-left" /></router-link>
      </div>
      <div class="block_create">
         <form ref="formCreatePost" action="" method="post" class="block_user">
            <input class="input_ad_photo" type="file" name="image" accept="image/png, image/jpeg, image/jpg" />
            <textarea v-model="message" name="message" class="message_post" type="text"></textarea>
            <button @click="createPost" type="button" class="button_validé">Validate</button>
         </form>
      </div>
   </section>
</template>

<script>
export default {
   name: "createPost",
   data: function () {
      return {
         message: "",
      };
   },

   created() {
      if (localStorage.getItem("user") === null) this.$router.push("/");
   },

   methods: {
      createPost(e) {
         e.preventDefault();
         const { message } = this;
         const formData = new FormData(this.$refs.formCreatePost);
         const body = JSON.stringify({ message });
         fetch("http://localhost:4000/api/post/", {
            method: "POST",
            body: formData,
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
   cursor: pointer;
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
   width: fit-content;
   margin: auto;
   margin-top: 25px;
   font-size: 2em !important;
}
.div_back:hover {
   transform: scale(1.1);
}

.icon_back {
   color: red;
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
