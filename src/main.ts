import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useAuth } from "./shared/composables/useAuth";

// Initialize authentication status
const { checkAuthStatus } = useAuth();
checkAuthStatus();

createApp(App).use(router).mount("#app");
