<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Website Name -->
    <div>
      <label
        for="website"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Website Name
      </label>
      <input
        id="website"
        v-model="formData.website"
        type="text"
        required
        class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
        placeholder="Enter website name"
      />
    </div>

    <!-- Website URL -->
    <div>
      <label
        for="url"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Website URL
      </label>
      <input
        id="url"
        v-model="formData.url"
        type="url"
        class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
        placeholder="https://example.com"
      />
    </div>

    <!-- Username -->
    <div>
      <label
        for="username"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Username / Email
      </label>
      <input
        id="username"
        v-model="formData.username"
        type="text"
        required
        class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
        placeholder="Enter username or email"
      />
    </div>

    <!-- Password -->
    <div>
      <label
        for="password"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Password
      </label>
      <div class="relative">
        <input
          id="password"
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          required
          class="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
          placeholder="Enter password"
        />
        <button
          type="button"
          @click="togglePasswordVisibility"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg
            v-if="showPassword"
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
            />
          </svg>
          <svg
            v-else
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>
      <div class="mt-2 flex space-x-2">
        <button
          type="button"
          @click="generatePassword"
          class="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Generate Password
        </button>
      </div>
    </div>

    <!-- Collections -->
    <div>
      <label
        for="collections"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Collections
      </label>
      <input
        id="collections"
        v-model="collectionsInput"
        type="text"
        class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
        placeholder="Enter collections separated by commas"
      />
      <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Separate multiple collections with commas
      </p>
    </div>

    <!-- Notes -->
    <div>
      <label
        for="notes"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Notes
      </label>
      <textarea
        id="notes"
        v-model="formData.notes"
        rows="3"
        class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm resize-none"
        placeholder="Add any additional notes..."
      />
    </div>

    <!-- Error message -->
    <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <!-- Form Actions -->
    <div class="flex space-x-3 pt-4">
      <button type="submit" :disabled="loading" class="flex-1 btn-primary">
        <span
          v-if="loading"
          class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
        ></span>
        {{ isNew ? "Add Login" : "Save Changes" }}
      </button>
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Login } from "../model";

interface Props {
  login?: Login;
  isNew?: boolean;
}

interface Emits {
  (e: "save", login: Login): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isNew: false,
});

const emit = defineEmits<Emits>();

const loading = ref(false);
const error = ref("");
const showPassword = ref(false);

// Form data
const formData = ref({
  website: "",
  url: "",
  username: "",
  password: "",
  notes: "",
  favicon: "",
});

const collectionsInput = ref("");

// Initialize form data
const initializeForm = () => {
  if (props.login) {
    formData.value = {
      website: props.login.website || "",
      url: props.login.url || "",
      username: props.login.username || "",
      password: props.login.password || "",
      notes: props.login.notes || "",
      favicon: props.login.favicon || "",
    };
    collectionsInput.value = props.login.collections?.join(", ") || "";
  } else {
    // Reset for new login
    formData.value = {
      website: "",
      url: "",
      username: "",
      password: "",
      notes: "",
      favicon: "",
    };
    collectionsInput.value = "";
  }
};

// Watch for login prop changes
watch(() => props.login, initializeForm, { immediate: true });

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const generatePassword = () => {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  formData.value.password = password;
};

const validateForm = (): boolean => {
  error.value = "";

  // Website name validation
  if (!formData.value.website.trim()) {
    error.value = "Website name is required";
    return false;
  }

  if (formData.value.website.trim().length < 1) {
    error.value = "Website name cannot be empty";
    return false;
  }

  if (formData.value.website.trim().length > 50) {
    error.value = "Website name is too long (maximum 50 characters)";
    return false;
  }

  // Website URL validation (if provided)
  if (formData.value.url.trim()) {
    try {
      const url = new URL(formData.value.url.trim());

      // Check if URL has valid protocol
      if (!["http:", "https:"].includes(url.protocol)) {
        error.value = "URL must start with http:// or https://";
        return false;
      }

      // Check if URL has valid hostname
      if (!url.hostname || url.hostname.length < 3) {
        error.value = "Please enter a valid website URL";
        return false;
      }
    } catch {
      error.value = "Please enter a valid URL (e.g., https://example.com)";
      return false;
    }

    if (formData.value.url.trim().length > 2048) {
      error.value = "Website URL is too long (maximum 2048 characters)";
      return false;
    }
  }

  // Username validation
  if (!formData.value.username.trim()) {
    error.value = "Username or email is required";
    return false;
  }

  if (formData.value.username.trim().length < 1) {
    error.value = "Username cannot be empty";
    return false;
  }

  if (formData.value.username.trim().length > 100) {
    error.value = "Username is too long (maximum 100 characters)";
    return false;
  }

  // If username looks like an email, validate email format
  if (formData.value.username.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.value.username.trim())) {
      error.value = "Please enter a valid email address";
      return false;
    }
  }

  // Password validation
  if (!formData.value.password.trim()) {
    error.value = "Password is required";
    return false;
  }

  if (formData.value.password.length < 1) {
    error.value = "Password cannot be empty";
    return false;
  }

  if (formData.value.password.length > 512) {
    error.value = "Password is too long (maximum 512 characters)";
    return false;
  }

  // Notes validation (optional field)
  if (formData.value.notes && formData.value.notes.length > 1000) {
    error.value = "Notes are too long (maximum 1000 characters)";
    return false;
  }

  // Collections validation
  if (collectionsInput.value) {
    const collections = collectionsInput.value
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (collections.length > 5) {
      error.value = "Too many collections (maximum 5 collections allowed)";
      return false;
    }

    for (const collection of collections) {
      if (collection.length > 20) {
        error.value = `Collection "${collection}" is too long (maximum 20 characters per collection)`;
        return false;
      }

      if (!/^[a-zA-Z0-9\s_-]+$/.test(collection)) {
        error.value = `Collection "${collection}" contains invalid characters`;
        return false;
      }
    }
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    const collections = collectionsInput.value
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const loginData: Login = {
      id: props.login?.id || `login_${Date.now()}`,
      website: formData.value.website.trim(),
      url: formData.value.url.trim() || undefined,
      username: formData.value.username.trim(),
      password: formData.value.password,
      notes: formData.value.notes.trim() || undefined,
      favicon: formData.value.favicon || undefined,
      collections: collections.length > 0 ? collections : undefined,
      lastUsed: props.login?.lastUsed,
      createdAt: props.login?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    emit("save", loginData);
  } catch (err) {
    error.value = "Failed to save login. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
