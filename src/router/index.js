import Vue from "vue";
import VueRouter from "vue-router";
import Exercise from "../views/Exercise.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "exercise",
    component: Exercise
  },
  {
    path: "/info",
    name: "info",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "info" */ "../views/Info.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
