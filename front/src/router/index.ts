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
    path: "/users/:userName",
    name: "user-details",
    component: () => import("../components/UserProfile.vue"),
  },
  {
    path: "/create-user",
    name: "create-user",
    component: () => import("../components/CreateUser.vue"),
  },
  {
    path: "/users/:userName/upload-avatar",
    name: "upload-avatar",
    component: () => import("../components/UploadAvatar.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
