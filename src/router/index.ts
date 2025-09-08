import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../features/landing/components/LandingPage.vue";
import PasswordsPage from "../features/passwords/components/PasswordsPage.vue";
import NotesPage from "../features/notes/components/NotesPage.vue";
import ProfilePage from "../features/profile/components/ProfilePage.vue";
import { useAuthModal } from "../features/auth/composables/useAuthModal";

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
    {
      path: "/profile",
      name: "Profile",
      component: ProfilePage,
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
    const { openLoginModal } = useAuthModal();
    openLoginModal();
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
