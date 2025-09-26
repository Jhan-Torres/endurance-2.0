<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <AppHeader />
    <SideMenu />

    <!-- Main Content Area -->
    <main
      :class="[
        'transition-all duration-300',
        $route.path === '/'
          ? ''
          : 'max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8',
      ]"
      role="main"
    >
      <router-view />
    </main>

    <!-- Footer (only on landing page) -->
    <AppFooter v-if="$route.path === '/'" />

    <!-- Auth Modal -->
    <AuthModal
      :is-open="isAuthModalOpen"
      :default-mode="authModalMode"
      @close="closeAuthModal"
      @auth-success="handleAuthSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "./shared/components/AppHeader.vue";
import AppFooter from "./shared/components/AppFooter.vue";
import SideMenu from "./shared/components/SideMenu.vue";
import AuthModal from "./features/auth/components/AuthModal.vue";
import { useAuth } from "./features/auth/composables/useAuth";
import { useAuthModal } from "./features/auth/composables/useAuthModal";
import { useLanguage } from "./shared/composables";

const router = useRouter();
const { initializeAuth } = useAuth();
const { initializeLanguage } = useLanguage();
const { isAuthModalOpen, authModalMode, closeAuthModal } = useAuthModal();

const handleAuthSuccess = () => {
  router.push("/logins");
};

onMounted(() => {
  initializeAuth();
  initializeLanguage();
});
</script>
