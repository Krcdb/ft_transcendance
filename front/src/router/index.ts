import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/game",
    name: "Game",
    component: () => import("../views/Game.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../components/chat/DefaultChat.vue"),
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
    path: "/users/:userName",
    name: "user-details",
    component: () => import("../components/UserProfile.vue"),
  },
  {
    path: "/create-user",
    name: "create-user",
    component: () => import("../components/CreateUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
