<template>
  <!-- Hero Section -->
  <section
    class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 section-padding"
    role="banner"
  >
    <!-- Animated Geometrical Background -->
    <div class="absolute inset-0" aria-hidden="true">
      <!-- Base geometric pattern -->
      <div class="absolute inset-0 opacity-20 dark:opacity-10">
        <div class="geometric-pattern" />
      </div>

      <!-- Floating geometric shapes -->
      <div class="absolute inset-0">
        <div class="geometric-shape shape-hexagon shape-1">
          <div class="hexagon" />
        </div>
        <div class="geometric-shape shape-triangle shape-2">
          <div class="triangle" />
        </div>
        <div class="geometric-shape shape-circle shape-3">
          <div class="circle" />
        </div>
        <div class="geometric-shape shape-diamond shape-4">
          <div class="diamond" />
        </div>
        <div class="geometric-shape shape-hexagon shape-5">
          <div class="hexagon small" />
        </div>
        <div class="geometric-shape shape-triangle shape-6">
          <div class="triangle small" />
        </div>
      </div>

      <!-- Animated geometric lines -->
      <div class="geometric-line line-2" />
      <div class="geometric-line line-3" />
    </div>

    <div class="container-responsive relative">
      <header class="text-center animate-fade-in">
        <h1 class="text-heading-xl">
          {{ t("hero.title") }}
          <span class="text-gradient">
            {{ t("hero.subtitle") }}
          </span>
        </h1>
        <p class="text-body mb-8 max-w-2xl mx-auto">
          {{ t("hero.description") }}
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
            {{ t("hero.getStarted") }}
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
              />
            </svg>
          </button>
        </nav>
      </header>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthModal } from "../../auth/composables/useAuthModal";
import { useLanguage } from "../../../shared/composables";

const { openLoginModal, openSignupModal } = useAuthModal();
const { t } = useLanguage();
</script>

<style scoped>
/* Geometric Pattern Background */
.geometric-pattern {
  background-image: 
    /* Hexagon grid pattern */ radial-gradient(
      circle at 25% 25%,
      rgba(59, 130, 246, 0.1) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(59, 130, 246, 0.08) 1px,
      transparent 1px
    ),
    /* Triangle pattern */
      linear-gradient(
        60deg,
        transparent 30%,
        rgba(59, 130, 246, 0.05) 30%,
        rgba(59, 130, 246, 0.05) 70%,
        transparent 70%
      ),
    linear-gradient(
      -60deg,
      transparent 30%,
      rgba(59, 130, 246, 0.05) 30%,
      rgba(59, 130, 246, 0.05) 70%,
      transparent 70%
    );
  background-size: 80px 80px, 60px 60px, 120px 120px, 120px 120px;
  background-position: 0 0, 30px 30px, 0 0, 60px 60px;
  animation: geometric-drift 25s linear infinite;
}

@keyframes geometric-drift {
  0% {
    transform: translate(0, 0) rotate(0deg);
    background-position: 0 0, 30px 30px, 0 0, 60px 60px;
  }
  25% {
    background-position: 20px 20px, 50px 10px, 30px 30px, 80px 40px;
  }
  50% {
    background-position: 40px 0px, 70px 50px, 60px 60px, 100px 80px;
  }
  75% {
    background-position: 60px 30px, 90px 30px, 90px 30px, 120px 60px;
  }
  100% {
    transform: translate(80px, 80px) rotate(360deg);
    background-position: 80px 80px, 110px 110px, 120px 120px, 140px 140px;
  }
}

/* Floating Geometric Shapes */
.geometric-shape {
  position: absolute;
  animation: geometric-float 8s ease-in-out infinite;
}

/* Hexagon Shape */
.hexagon {
  width: 60px;
  height: 34.64px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2),
    rgba(147, 197, 253, 0.1)
  );
  position: relative;
  border-radius: 4px;
}

.hexagon:before,
.hexagon:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
}

.hexagon:before {
  bottom: 100%;
  border-bottom: 17.32px solid rgba(59, 130, 246, 0.2);
}

.hexagon:after {
  top: 100%;
  border-top: 17.32px solid rgba(59, 130, 246, 0.2);
}

.hexagon.small {
  width: 40px;
  height: 23px;
}

.hexagon.small:before,
.hexagon.small:after {
  border-left-width: 20px;
  border-right-width: 20px;
}

.hexagon.small:before {
  border-bottom-width: 11.5px;
}

.hexagon.small:after {
  border-top-width: 11.5px;
}

/* Triangle Shape */
.triangle {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 43px solid rgba(59, 130, 246, 0.15);
}

.triangle.small {
  border-left-width: 15px;
  border-right-width: 15px;
  border-bottom-width: 26px;
}

/* Circle Shape */
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.2),
    rgba(147, 197, 253, 0.05)
  );
  border: 2px solid rgba(59, 130, 246, 0.1);
}

/* Diamond Shape */
.diamond {
  width: 40px;
  height: 40px;
  background: linear-gradient(
    45deg,
    rgba(59, 130, 246, 0.15),
    rgba(147, 197, 253, 0.08)
  );
  transform: rotate(45deg);
  border-radius: 4px;
}

/* Shape positioning */
.shape-1 {
  top: 15%;
  left: 8%;
  animation-delay: 0s;
}

.shape-2 {
  top: 25%;
  right: 12%;
  animation-delay: 2s;
}

.shape-3 {
  top: 65%;
  left: 15%;
  animation-delay: 4s;
}

.shape-4 {
  bottom: 25%;
  right: 20%;
  animation-delay: 1s;
}

.shape-5 {
  top: 45%;
  right: 5%;
  animation-delay: 3s;
}

.shape-6 {
  bottom: 15%;
  left: 25%;
  animation-delay: 5s;
}

@keyframes geometric-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  33% {
    transform: translateY(-15px) rotate(120deg) scale(1.1);
  }
  66% {
    transform: translateY(-25px) rotate(240deg) scale(0.9);
  }
}

/* Animated Geometric Lines */
.geometric-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.4),
    rgba(147, 197, 253, 0.6),
    rgba(59, 130, 246, 0.4),
    transparent
  );
  width: 200px;
  animation-duration: 12s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.line-2 {
  top: 60%;
  right: -200px;
  animation-delay: 4s;
  animation-name: geometric-line-move-2;
  animation-direction: reverse;
}

.line-3 {
  top: 40%;
  left: -200px;
  animation-delay: 8s;
  animation-name: geometric-line-move-3;
}

@keyframes geometric-line-move-2 {
  0% {
    transform: translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 200px)) rotate(0deg);
    opacity: 0;
  }
}

@keyframes geometric-line-move-3 {
  0% {
    transform: translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 200px)) rotate(0deg);
    opacity: 0;
  }
}

/* Dark mode adjustments */
.dark .geometric-pattern {
  background-image: radial-gradient(
      circle at 25% 25%,
      rgba(147, 197, 253, 0.08) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(147, 197, 253, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(
      60deg,
      transparent 30%,
      rgba(147, 197, 253, 0.03) 30%,
      rgba(147, 197, 253, 0.03) 70%,
      transparent 70%
    ),
    linear-gradient(
      -60deg,
      transparent 30%,
      rgba(147, 197, 253, 0.03) 30%,
      rgba(147, 197, 253, 0.03) 70%,
      transparent 70%
    );
}

.dark .hexagon {
  background: linear-gradient(
    135deg,
    rgba(147, 197, 253, 0.15),
    rgba(147, 197, 253, 0.05)
  );
}

.dark .hexagon:before {
  border-bottom-color: rgba(147, 197, 253, 0.15);
}

.dark .hexagon:after {
  border-top-color: rgba(147, 197, 253, 0.15);
}

.dark .triangle {
  border-bottom-color: rgba(147, 197, 253, 0.1);
}

.dark .circle {
  background: radial-gradient(
    circle,
    rgba(147, 197, 253, 0.15),
    rgba(147, 197, 253, 0.03)
  );
  border-color: rgba(147, 197, 253, 0.08);
}

.dark .diamond {
  background: linear-gradient(
    45deg,
    rgba(147, 197, 253, 0.1),
    rgba(147, 197, 253, 0.05)
  );
}

.dark .geometric-line {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(147, 197, 253, 0.3),
    rgba(147, 197, 253, 0.5),
    rgba(147, 197, 253, 0.3),
    transparent
  );
}
</style>
