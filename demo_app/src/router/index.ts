import Vue from "vue";
import VueRouter from "vue-router";
import Tutorial from "@/views/Tutorial.vue";
import Swiping from "@/views/Swiping.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "tutorial",
    component: Tutorial,
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
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
