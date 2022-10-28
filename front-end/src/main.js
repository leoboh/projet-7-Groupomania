import { createApp } from "vue";
import "./style.css";
import "../src/css/auth.css";
import App from "./App.vue";
import router from "./router";

/* add icons to the library */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import the fontawesome core */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App);
app.use(router).mount("#app");
app.component("font-awesome-icon", FontAwesomeIcon);
library.add(faHeart, faCirclePlus, faTrash, faPen, faCircleLeft);
