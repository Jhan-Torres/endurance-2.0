<template>
  <main
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ isSpanish ? "Perfil de Usuario" : "User Profile" }}
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          {{
            isSpanish
              ? "Administra tu información personal y configuración de cuenta"
              : "Manage your personal information and account settings"
          }}
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <ProfileCard :user-profile="userProfile" />

        <!-- Profile Information -->
        <div class="lg:col-span-2">
          <div
            class="bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-300"
          >
            <!-- Profile Form -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{
                    isSpanish ? "Información de Cuenta" : "Account Information"
                  }}
                </h3>
                <button
                  @click="openEditModal"
                  type="button"
                  class="px-3 py-1.5 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200"
                >
                  {{ isSpanish ? "Editar" : "Edit" }}
                </button>
              </div>

              <!-- Account Information Display -->
              <div class="space-y-4">
                <!-- Name -->
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700"
                >
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ isSpanish ? "Nombre Completo" : "Full Name" }}
                  </span>
                  <span class="text-sm text-gray-900 dark:text-white">
                    {{ userProfile.name }}
                  </span>
                </div>

                <!-- Email -->
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700"
                >
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ isSpanish ? "Correo Electrónico" : "Email Address" }}
                  </span>
                  <span class="text-sm text-gray-900 dark:text-white">
                    {{ userProfile.email }}
                  </span>
                </div>

                <!-- Member Since -->
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700"
                >
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ isSpanish ? "Fecha de Registro" : "Member Since" }}
                  </span>
                  <span class="text-sm text-gray-900 dark:text-white">
                    {{ formatDate(userProfile.createdAt) }}
                  </span>
                </div>

                <!-- Last Login -->
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700"
                >
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ isSpanish ? "Último Acceso" : "Last Login" }}
                  </span>
                  <span class="text-sm text-gray-900 dark:text-white">
                    {{ formatDate(userProfile.lastLogin) }}
                  </span>
                </div>
              </div>

              <!-- Password Change Section - Always visible -->
              <div
                class="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6"
              >
                <h4
                  class="text-md font-medium text-gray-900 dark:text-white mb-4"
                >
                  {{ isSpanish ? "Seguridad" : "Security" }}
                </h4>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      {{
                        isSpanish
                          ? "¿Deseas cambiar tu contraseña?"
                          : "Want to change your password?"
                      }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{
                        isSpanish
                          ? "Te enviaremos un enlace de restablecimiento por correo"
                          : "We'll send you a reset link via email"
                      }}
                    </p>
                  </div>
                  <button
                    type="button"
                    @click="requestPasswordChange"
                    class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 text-sm font-medium"
                  >
                    {{ isSpanish ? "Solicitar Cambio" : "Request Change" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <EditProfileModal
      :is-open="showEditModal"
      :user-profile="userProfile"
      @close="closeEditModal"
      @save="handleSaveProfile"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useLanguage } from "../../../shared/composables/useLanguage";
import { useAuth } from "../../auth/composables/useAuth";
import ProfileCard from "./ProfileCard.vue";
import EditProfileModal from "./EditProfileModal.vue";

const { isSpanish } = useLanguage();
const { user } = useAuth();

// User profile data
const userProfile = ref({
  id: "demo-user-id",
  name: "Demo User",
  email: "demo@endurance.app",
  role: "admin",
  createdAt: new Date("2025-01-15"),
  lastLogin: new Date("2025-09-08T10:30:00"),
});

// Modal state
const showEditModal = ref(false);

const formatDate = (date: Date) => {
  return date.toLocaleDateString(isSpanish.value ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Actions
const handleSaveProfile = (profileData: { name: string; email: string }) => {
  // Update the main profile with new data
  userProfile.value.name = profileData.name;
  userProfile.value.email = profileData.email;

  // TODO: Implement API call to save profile
  console.log("Saving profile:", userProfile.value);
  alert(
    isSpanish.value
      ? "Perfil guardado exitosamente"
      : "Profile saved successfully"
  );
};

const openEditModal = () => {
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const requestPasswordChange = () => {
  // TODO: Implement password change request API call
  console.log("Requesting password change for user:", userProfile.value.email);
  alert(
    isSpanish.value
      ? "Se ha enviado un enlace de restablecimiento a tu correo electrónico"
      : "A password reset link has been sent to your email address"
  );
};

// Initialize profile data
onMounted(() => {
  // Sync with auth user data if available
  if (user.value) {
    userProfile.value = {
      ...userProfile.value,
      id: user.value.id || userProfile.value.id,
      name: user.value.name || userProfile.value.name,
      email: user.value.email || userProfile.value.email,
    };
  }
});
</script>
