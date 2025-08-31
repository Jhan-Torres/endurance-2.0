// Rutas principales
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../features/landing/components/LandingPage.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../features/auth/components/AuthPage.vue"),
  },
  {
    path: "/notes",
    name: "Notes",
    component: () => import("../features/notes/components/NotesPage.vue"),
  },
  {
    path: "/passwords",
    name: "Passwords",
    component: () =>
      import("../features/passwords/components/PasswordsPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
