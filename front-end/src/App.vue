<template>
   <header>
      <nav>
         <img class="logo_nav" src="/image/icon-left-font.png" alt="" />
         <div class="lien_nav">
            <router-link v-if="!authPage" to="/" class="home">Sign out</router-link>
         </div>
      </nav>
   </header>
   <router-view></router-view>
</template>

<script>
export default {
   name: "connected",
   data: function () {
      return {};
   },

   computed: {
      authPage() {
         return this.$route.path === "/";
      },
   },
};
</script>

<style>
.lien_nav {
   margin-right: 20px;
   text-decoration: none;
}

.user,
.home {
   margin: 10px;
   text-decoration: none;
   color: #fd2d01;
}

.user:hover,
.home:hover {
   color: #f9d9d8;
}

@media (max-width: 500px) {
   nav {
      flex-direction: column;
   }
   .lien_nav {
      margin-right: 0;
      margin-left: 15px;
      margin-bottom: 30px;
   }
}
</style>
