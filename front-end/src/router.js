import { createRouter, createWebHistory } from "vue-router";
import auth from "./pages/auth.vue";
import user from "./pages/user.vue";
import notFound from "./pages/notFound.vue";
import createPost from "./pages/createPost.vue";
import modifPost from "./pages/modifPost.vue";

const routes = [
   { path: "/", component: auth },
   { path: "/user", component: user },
   { path: "/createPost", component: createPost },
   { path: "/modifPost", component: modifPost },
   { path: "/:pathMatch(.*)*", name: "notFound", component: notFound },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
