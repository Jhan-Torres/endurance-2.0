<template>
  <form class="mt-4 space-y-4" @submit.prevent="handleLogin">
    <!-- Toggle between login and signup - moved to top -->
    <div class="text-center pb-3">
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

    <div class="space-y-3">
      <!-- Name field for signup -->
      <div v-if="isSignup">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
          @blur="validateField('name', name)"
          @input="validateField('name', name)"
          :class="[
            'appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm',
            fieldErrors.name
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600',
          ]"
          placeholder="Enter your full name"
          :disabled="loading"
        />
        <p
          v-if="fieldErrors.name"
          class="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {{ fieldErrors.name }}
        </p>
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
          @blur="validateField('email', email)"
          @input="validateField('email', email)"
          :class="[
            'appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm',
            fieldErrors.email
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600',
          ]"
          placeholder="Enter your email"
          :disabled="loading"
        />
        <p
          v-if="fieldErrors.email"
          class="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {{ fieldErrors.email }}
        </p>
      </div>
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
          @blur="validateField('password', password)"
          @input="validateField('password', password)"
          :class="[
            'appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm',
            fieldErrors.password
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600',
          ]"
          :placeholder="
            isSignup ? 'Choose a strong password' : 'Enter your password'
          "
          :disabled="loading"
        />
        <p
          v-if="fieldErrors.password"
          class="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {{ fieldErrors.password }}
        </p>
      </div>

      <!-- Confirm password field for signup -->
      <div v-if="isSignup">
        <label
          for="confirmPassword"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
          @blur="validateField('confirmPassword', confirmPassword)"
          @input="validateField('confirmPassword', confirmPassword)"
          :class="[
            'appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm',
            fieldErrors.confirmPassword
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600',
          ]"
          placeholder="Confirm your password"
          :disabled="loading"
        />
        <p
          v-if="fieldErrors.confirmPassword"
          class="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {{ fieldErrors.confirmPassword }}
        </p>
      </div>
    </div>

    <div
      v-if="error"
      class="text-red-600 dark:text-red-400 text-sm text-center"
    >
      {{ error }}
    </div>

    <div class="pt-2">
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
  </form>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

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

// Validation state
const fieldErrors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const { isSignup } = toRefs(props);

// Real-time field validation
const validateField = (
  field: keyof typeof fieldErrors.value,
  value: string
) => {
  switch (field) {
    case "name":
      if (isSignup.value) {
        if (!value.trim()) {
          fieldErrors.value.name = "Full name is required";
        } else if (value.trim().length < 2) {
          fieldErrors.value.name = "Must be at least 2 characters";
        } else if (value.trim().length > 50) {
          fieldErrors.value.name = "Cannot exceed 50 characters";
        } else {
          fieldErrors.value.name = "";
        }
      }
      break;

    case "email":
      if (!value.trim()) {
        fieldErrors.value.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        fieldErrors.value.email = "Please enter a valid email";
      } else if (value.trim().length > 254) {
        fieldErrors.value.email = "Email is too long";
      } else {
        fieldErrors.value.email = "";
      }
      break;

    case "password":
      if (!value) {
        fieldErrors.value.password = "Password is required";
      } else if (isSignup.value && value.length < 8) {
        fieldErrors.value.password = "Must be at least 8 characters";
      } else if (value.length > 128) {
        fieldErrors.value.password = "Cannot exceed 128 characters";
      } else if (isSignup.value) {
        const hasRequirements =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
            value
          );
        if (!hasRequirements) {
          fieldErrors.value.password =
            "Must contain uppercase, lowercase, number, and special character";
        } else {
          fieldErrors.value.password = "";
        }
      } else {
        fieldErrors.value.password = "";
      }
      break;

    case "confirmPassword":
      if (isSignup.value) {
        if (!value) {
          fieldErrors.value.confirmPassword = "Please confirm your password";
        } else if (value !== password.value) {
          fieldErrors.value.confirmPassword = "Passwords do not match";
        } else {
          fieldErrors.value.confirmPassword = "";
        }
      }
      break;
  }
};

const validateForm = () => {
  error.value = "";

  // Name validation for signup
  if (isSignup.value && !name.value?.trim()) {
    error.value = "Full name is required";
    return false;
  }

  if (isSignup.value && name.value?.trim().length < 2) {
    error.value = "Full name must be at least 2 characters long";
    return false;
  }

  if (isSignup.value && name.value?.trim().length > 50) {
    error.value = "Full name cannot exceed 50 characters";
    return false;
  }

  // Email validation
  if (!email.value?.trim()) {
    error.value = "Email address is required";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    error.value = "Please enter a valid email address";
    return false;
  }

  if (email.value.trim().length > 254) {
    error.value = "Email address is too long";
    return false;
  }

  // Password validation
  if (!password.value) {
    error.value = "Password is required";
    return false;
  }

  if (isSignup.value) {
    if (password.value.length < 8) {
      error.value = "Password must be at least 8 characters long";
      return false;
    }

    if (password.value.length > 128) {
      error.value = "Password cannot exceed 128 characters";
      return false;
    }

    // Password strength requirements for signup
    const hasUppercase = /[A-Z]/.test(password.value);
    const hasLowercase = /[a-z]/.test(password.value);
    const hasNumbers = /\d/.test(password.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

    if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecialChar) {
      error.value =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      return false;
    }

    // Confirm password validation
    if (!confirmPassword.value) {
      error.value = "Please confirm your password";
      return false;
    }

    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match";
      return false;
    }
  }

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
        router.push("/logins");
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
