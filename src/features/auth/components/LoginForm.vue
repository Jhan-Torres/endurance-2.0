<template>
  <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
    <div class="space-y-4">
      <!-- Name field for signup -->
      <div v-if="isSignup">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          autocomplete="name"
          required
          class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
          placeholder="Enter your full name"
          :disabled="loading"
        />
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address
        </label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
          placeholder="Enter your email"
          :disabled="loading"
        />
      </div>
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          :autocomplete="isSignup ? 'new-password' : 'current-password'"
          required
          class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
          :placeholder="
            isSignup ? 'Choose a strong password' : 'Enter your password'
          "
          :disabled="loading"
        />
      </div>

      <!-- Confirm password field for signup -->
      <div v-if="isSignup">
        <label
          for="confirmPassword"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          name="confirmPassword"
          type="password"
          autocomplete="new-password"
          required
          class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
          placeholder="Confirm your password"
          :disabled="loading"
        />
      </div>
    </div>

    <div
      v-if="error"
      class="text-red-600 dark:text-red-400 text-sm text-center"
    >
      {{ error }}
    </div>

    <div>
      <button
        type="submit"
        :disabled="
          loading ||
          !email ||
          !password ||
          (isSignup && (!name || !confirmPassword))
        "
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <span
          v-if="loading"
          class="absolute left-0 inset-y-0 flex items-center pl-3"
        >
          <svg
            class="animate-spin h-5 w-5 text-primary-200"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
        {{
          loading
            ? isSignup
              ? "Creating account..."
              : "Signing in..."
            : isSignup
            ? "Create Account"
            : "Sign in"
        }}
      </button>
    </div>

    <!-- Toggle between login and signup -->
    <div class="text-center">
      <button
        type="button"
        @click="$emit('toggle-mode')"
        class="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
      >
        {{
          isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"
        }}
      </button>
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Demo credentials: any email and password
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

interface Props {
  isSignup?: boolean;
}

interface Emits {
  (e: "toggle-mode"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isSignup: false,
});

const emit = defineEmits<Emits>();

const router = useRouter();
const { login, loading } = useAuth();

const email = ref("");
const password = ref("");
const name = ref("");
const confirmPassword = ref("");
const error = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const { isSignup } = toRefs(props);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const validateForm = () => {
  if (!email.value || !password.value) {
    error.value = "Email and password are required";
    return false;
  }

  if (isSignup.value) {
    if (!name.value) {
      error.value = "Name is required";
      return false;
    }
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match";
      return false;
    }
    if (password.value.length < 8) {
      error.value = "Password must be at least 8 characters long";
      return false;
    }
  }

  error.value = "";
  return true;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    if (isSignup.value) {
      // TODO: Implement signup logic
      console.log("Signup attempt:", {
        name: name.value,
        email: email.value,
        password: password.value,
      });
      // For now, just redirect to login
      emit("toggle-mode");
    } else {
      const success = await login(email.value, password.value);
      if (success) {
        router.push("/passwords");
      } else {
        error.value = "Invalid credentials";
      }
    }
  } catch (err) {
    error.value = isSignup.value
      ? "Signup failed. Please try again."
      : "Login failed. Please try again.";
  }
};
</script>
