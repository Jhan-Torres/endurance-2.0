import { createApp } from "vue";
import "./assets/styles/main.css";
import App from "./App.vue";
import router from "./shared/router";
import { i18n } from "./shared/composables";
import { useAuth } from "./features/auth/composables/useAuth";

// Initialize authentication status
const { initializeAuth } = useAuth();
initializeAuth();

createApp(App).use(router).use(i18n).mount("#app");
