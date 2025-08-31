import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../features/landing/components/LandingPage.vue";
import AuthPage from "../features/auth/components/AuthPage.vue";
import PasswordsPage from "../features/passwords/components/PasswordsPage.vue";
import NotesPage from "../features/notes/components/NotesPage.vue";

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
      component: LandingPage,
    },
    {
      path: "/login",
      name: "Login",
      component: AuthPage,
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
