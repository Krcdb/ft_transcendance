import { createRouter, createWebHistory } from "vue-router";
import http from "@/http-common";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/auth/42",
    name: "42 auth",
    component: () => import("../components/Auth42.vue"),
  },
  {
    path: "/game",
    name: "Game",
    component: () => import("../components/Game.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Chat.vue"),
  },
  {
    path: "/profile",
    name: "My Profile",
    component: () => import("../components/UserProfile.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../components/UsersList.vue"),
  },
  {
    path: "/users/:id",
    name: "user-details",
    component: () => import("../components/UserPublicProfile.vue"),
  },
  {
    path: "/create-user",
    name: "create-user",
    component: () => import("../components/CreateUser.vue"),
  },
  {
    path: "/update-profile",
    name: "update-profile",
    component: () => import("../components/UpdateProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("user-token");
  if (!token && to.path !== "/login" && to.path !== "/auth/42")
    next({ path: "/login" });
  else {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    next();
  }
});

export default router;
