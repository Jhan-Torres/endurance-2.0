<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <AuthHeader :is-signup="isSignup" />
      <LoginForm
        :is-signup="isSignup"
        @toggle-mode="isSignup = !isSignup"
        @auth-success="handleAuthSuccess"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthHeader from "./AuthHeader.vue";
import LoginForm from "./LoginForm.vue";

const router = useRouter();
const isSignup = ref(false);

const handleAuthSuccess = () => {
  router.push("/passwords");
};
</script>
