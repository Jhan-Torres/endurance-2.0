import { createRouter, createWebHistory } from "vue-router";
import Home from "../presentation/pages/Home.vue";
import Login from "../presentation/pages/Login.vue";
import Passwords from "../presentation/pages/Passwords.vue";
import Notes from "../presentation/pages/Notes.vue";

// Simple authentication check
const isAuthenticated = (): boolean => {
  return localStorage.getItem("endurance_user") !== null;
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ name: "Passwords" });
        } else {
          next();
        }
      },
    },
    {
      path: "/passwords",
      name: "Passwords",
      component: Passwords,
      meta: { requiresAuth: true },
    },
    {
      path: "/notes",
      name: "Notes",
      component: Notes,
      meta: { requiresAuth: true },
    },
    // Redirect any unknown routes to home
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

// Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
