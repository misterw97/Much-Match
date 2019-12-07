import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Swiping from "@/views/Swiping.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "tutorial",
    component: Home,
    meta: {
      title: "MuchMatch demo"
    }
  },
  {
    path: "/swipe",
    name: "swipe",
    component: Swiping,
    meta: {
      title: "Swipe App (MuchMatch)"
    }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
