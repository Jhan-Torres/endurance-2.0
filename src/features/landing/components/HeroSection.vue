<template>
  <!-- Hero Section -->
  <section
    class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 section-padding"
    role="banner"
  >
    <!-- Animated Security Background -->
    <div class="absolute inset-0" aria-hidden="true">
      <!-- Security grid pattern -->
      <div class="absolute inset-0 opacity-10 dark:opacity-5">
        <div class="security-grid"></div>
      </div>

      <!-- Floating security icons -->
      <div class="absolute inset-0">
        <div class="security-icon security-icon-1">
          <svg
            class="w-16 h-16 text-primary-400 opacity-20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
            />
          </svg>
        </div>
        <div class="security-icon security-icon-2">
          <svg
            class="w-14 h-14 text-primary-300 opacity-25"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"
            />
          </svg>
        </div>
        <div class="security-icon security-icon-3">
          <svg
            class="w-12 h-12 text-primary-500 opacity-15"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="security-icon security-icon-4">
          <svg
            class="w-15 h-15 text-primary-200 opacity-30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-5 5v-5zM4 19h5v5l-5-5v5z M9 19v-5h5v5H9z" />
          </svg>
        </div>
        <div class="security-icon security-icon-5">
          <svg
            class="w-18 h-18 text-primary-600 opacity-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
        <div class="security-icon security-icon-6">
          <svg
            class="w-10 h-10 text-primary-800 opacity-20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
      </div>

      <!-- Scanning lines -->
      <div class="scanning-line scanning-line-1"></div>
      <div class="scanning-line scanning-line-2"></div>
    </div>

    <div class="container-responsive relative">
      <header class="text-center animate-fade-in">
        <h1 class="text-heading-xl">
          {{ isSpanish ? "El Mejor" : "The Ultimate" }}
          <span class="text-gradient">
            {{ isSpanish ? "Gestor de Contraseñas" : "Password Manager" }}
          </span>
        </h1>
        <p class="text-body mb-8 max-w-2xl mx-auto">
          {{
            isSpanish
              ? "Genera, almacena y gestiona todas tus contraseñas de forma segura con cifrado militar. Todo en tu dispositivo, sin acceso externo."
              : "Generate, store and manage all your passwords securely with military-grade encryption. Everything stays on your device, no external access."
          }}
        </p>

        <nav
          class="flex justify-center items-center mb-12"
          aria-label="Hero actions"
        >
          <button
            @click="openSignupModal"
            class="btn-hero"
            aria-describedby="get-started-description"
          >
            {{ isSpanish ? "Comenzar Gratis" : "Get Started Free" }}
            <svg
              class="ml-3 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </button>
        </nav>
      </header>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthModal } from "../../auth/composables/useAuthModal";
import { useLanguage } from "../../../shared/composables/useLanguage";

const { openLoginModal, openSignupModal } = useAuthModal();
const { isSpanish } = useLanguage();
</script>

<style scoped>
/* Security Grid Animation */
.security-grid {
  background-image: linear-gradient(
      rgba(59, 130, 246, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* Floating Security Icons */
.security-icon {
  position: absolute;
  animation: float 6s ease-in-out infinite;
}

.security-icon-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.security-icon-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.security-icon-3 {
  top: 30%;
  right: 25%;
  animation-delay: 4s;
}

.security-icon-4 {
  bottom: 30%;
  left: 20%;
  animation-delay: 1s;
}

.security-icon-5 {
  top: 15%;
  right: 5%;
  animation-delay: 3s;
}

.security-icon-6 {
  bottom: 20%;
  right: 30%;
  animation-delay: 5s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

/* Scanning Lines */
.scanning-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.5),
    transparent
  );
  width: 100%;
  animation: scan 8s linear infinite;
}

.scanning-line-1 {
  top: 25%;
  animation-delay: 0s;
}

.scanning-line-2 {
  top: 75%;
  animation-delay: 4s;
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Dark mode adjustments */
.dark .security-grid {
  background-image: linear-gradient(
      rgba(147, 197, 253, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(147, 197, 253, 0.05) 1px, transparent 1px);
}

.dark .scanning-line {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(147, 197, 253, 0.3),
    transparent
  );
}
</style>
