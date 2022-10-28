<template>
   <section class="section_auth">
      <div class="block_auth">
         <!-- LOGIN / SIGNUP -->
         <div class="block_titre">
            <button class="button_login grey" @click="login()" :class="{ selected: mode === 'login' }">Login</button>
            <button class="button_signup grey" @click="signup()" :class="{ selected: mode === 'signup' }">Signup</button>
         </div>
         <!-- FORMULAIRE -->
         <form action="" class="block_user">
            <!-- input 1 -->
            <div v-if="mode === 'signup'" class="div_name">
               <label class="label_block_user" for="name">Name :</label>
               <input
                  v-model="name"
                  class="input_name input_form_auth"
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="Name"
                  required
               />
            </div>
            <!-- input 2 -->
            <div class="div_email">
               <label class="label_block_user" for="mail">E-mail:</label>
               <input
                  v-model="email"
                  class="input_email input_form_auth"
                  type="email"
                  id="mail"
                  name="user_mail"
                  placeholder="E-mail"
                  required
               />
            </div>
            <!-- input 3 -->
            <div class="div_mdp">
               <label class="label_block_user" for="password">Password : </label>
               <input
                  v-model="password"
                  class="input_password input_form_auth"
                  id="password"
                  name="user_password"
                  placeholder="Password"
                  type="password"
                  requried
               />
            </div>
            <!-- input 4 -->
            <div v-if="mode === 'signup'" class="div_mdp_confirm">
               <label class="label_block_user" for="password">Password : </label>
               <input
                  v-model="confirm_password"
                  class="input_password_confirm input_form_auth"
                  id="password_confirm"
                  name="user_password_confirm"
                  placeholder="Confirm password"
                  type="password"
                  required
               />
            </div>
            <span v-if="mode === 'signup'" class="span_mdp">{{ messageUser }}</span>
            <!-- button Valider -->
            <button v-if="mode === 'login'" @click="accesAccount" type="button" class="button_validé">Validate</button>
            <button v-else :disabled="!isValid" @click="createAccount" type="button" class="button_validé">Validate</button>
         </form>
      </div>
   </section>
</template>

<script>
import { parseJwt } from "../utils/decodejwt";
export default {
   name: "login",
   data: function () {
      return {
         disabled: true,
         mode: "login",
         name: "",
         email: "",
         password: "",
         confirm_password: "",
         messageUser: "",
      };
   },

   methods: {
      login: function () {
         this.mode = "login";
      },
      signup: function () {
         this.mode = "signup";
      },

      createAccount(e) {
         e.preventDefault();
         const { email, name, password, confirm_password } = this;
         const body = JSON.stringify({ email, name, password, confirm_password });
         if (this.confirm_password === this.password) {
            fetch("http://localhost:4000/api/auth/signup", {
               method: "POST",
               body,
               headers: { "Content-Type": "application/json" },
            })
               .then((resp) => {
                  if (resp.ok) {
                     alert("Votre inscription a bien été prise en compte");
                     this.login();
                  }
               })
               .catch((error) => {});
         } else {
            this.messageUser = "Vos mots de passe ne sont pas similaire.";
         }
      },
      accesAccount(e) {
         e.preventDefault();
         const { email, password } = this;
         const body = JSON.stringify({ email, password });
         fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
         })
            .then((resp) => {
               if (resp.ok) {
                  return resp.json();
               }
            })
            .then((data) => {
               localStorage.setItem("token", data.token);
               localStorage.setItem("user", parseJwt(data.token));
               localStorage.setItem("userId", data.userId);
               this.$router.push("/user");
            })
            .catch((error) => {});
      },
   },
   computed: {
      isValid() {
         return this.name && this.email && this.password;
      },
   },

   mounted() {
      localStorage.clear();
   },
};
</script>
<style scoped>
.section_auth {
   height: 80vh;
   display: flex;
   align-items: center;
   justify-content: center;
}

.span_mdp {
   margin-top: 10px;
   color: #fd2d01;
   font-family: "LatoBlack";
   font-size: 0.8em;
}
.grey {
   background: #4e516652;
}
.selected {
   background: #4e5166;
}
</style>
