import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useAuth } from "./features/auth/composables/useAuth";

// Initialize authentication status
const { initializeAuth } = useAuth();
initializeAuth();

createApp(App).use(router).mount("#app");
