import { createRouter, createWebHistory } from "vue-router";

const router: any = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main-page",
      component: () => import("@/modules/main-page.vue"),
    },
    {
      path: "/weather-info/:city",
      name: "weather-info-city",
      component: () => import("@/modules/city-weather-widget.vue"),
    },
  ],
})

export default router
