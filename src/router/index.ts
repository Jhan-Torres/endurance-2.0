import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import PasswordsPage from "../pages/PasswordsPage.vue";
import NotesPage from "../pages/NotesPage.vue";

// Simple authentication check
const isAuthenticated = (): boolean => {
  return localStorage.getItem("endurance_auth") !== null;
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
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
      component: PasswordsPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/notes",
      name: "Notes",
      component: NotesPage,
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
