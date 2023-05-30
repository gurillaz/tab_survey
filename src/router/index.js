import Vue from "vue";
import VueRouter from "vue-router";
import Enter from "../views/Enter.vue";
import Main from "../views/Main.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Enter",
    component: Enter,
  },

  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
