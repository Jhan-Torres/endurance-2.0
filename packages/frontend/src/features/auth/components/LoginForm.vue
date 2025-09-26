<template>
  <form class="mt-4 space-y-4" @submit.prevent="handleLogin">
    <!-- Toggle between login and signup -->
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
      <FormInput
        v-if="isSignup"
        id="name"
        v-model="form.formData.name"
        label="Full Name"
        placeholder="Enter your full name"
        autocomplete="name"
        :required="true"
        :error="form.errors.name"
        :touched="form.touched.name"
        :disabled="loading"
        @blur="form.validateField('name', form.formData.name)"
      />

      <!-- Email field -->
      <FormInput
        id="email"
        v-model="form.formData.email"
        type="email"
        label="Email address"
        placeholder="Enter your email"
        autocomplete="email"
        :required="true"
        :error="form.errors.email"
        :touched="form.touched.email"
        :disabled="loading"
        @blur="form.validateField('email', form.formData.email)"
      />

      <!-- Password field -->
      <FormInput
        id="password"
        v-model="form.formData.password"
        type="password"
        label="Password"
        :placeholder="isSignup ? 'Choose a strong password' : 'Enter your password'"
        :autocomplete="isSignup ? 'new-password' : 'current-password'"
        :required="true"
        :error="form.errors.password"
        :touched="form.touched.password"
        :disabled="loading"
        @blur="form.validateField('password', form.formData.password)"
      />

      <!-- Confirm password field for signup -->
      <FormInput
        v-if="isSignup"
        id="confirmPassword"
        v-model="form.formData.confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        autocomplete="new-password"
        :required="true"
        :error="form.errors.confirmPassword"
        :touched="form.touched.confirmPassword"
        :disabled="loading"
        @blur="form.validateField('confirmPassword', form.formData.confirmPassword)"
      />
    </div>

    <!-- Global error message -->
    <div
      v-if="error"
      class="text-red-600 dark:text-red-400 text-sm text-center"
    >
      {{ error }}
    </div>

    <!-- Submit button -->
    <div class="pt-2">
      <button
        type="submit"
        :disabled="loading || !canSubmit"
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
import { ref, computed, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useFormValidation } from "../../../shared/composables/useFormValidation";
import { authFormSchema } from "../../../shared/validation/schemas";
import FormInput from "../../../shared/components/FormInput.vue";

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
const { isSignup } = toRefs(props);

// Create dynamic schema based on signup mode
const currentSchema = computed(() => {
  if (isSignup.value) {
    return authFormSchema;
  } else {
    // Only email and password for login
    const { name, confirmPassword, ...loginSchema } = authFormSchema;
    return loginSchema;
  }
});

const form = useFormValidation(currentSchema.value);
const error = ref("");

// Watch for mode changes and reset form
watch(isSignup, (newValue) => {
  form.reset();
  error.value = "";
});

// Computed property for submit button state
const canSubmit = computed(() => {
  const requiredFields = isSignup.value 
    ? ['name', 'email', 'password', 'confirmPassword']
    : ['email', 'password'];
    
  return requiredFields.every(field => form.formData[field]?.trim()) && !form.hasErrors.value;
});

const handleLogin = async () => {
  if (!form.validateAll()) {
    error.value = "Please correct the errors above";
    return;
  }

  try {
    if (isSignup.value) {
      // TODO: Implement signup logic
      console.log("Signup attempt:", {
        name: form.formData.name,
        email: form.formData.email,
        password: form.formData.password,
      });
      // For now, just redirect to login
      emit("toggle-mode");
    } else {
      const success = await login(form.formData.email, form.formData.password);
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
