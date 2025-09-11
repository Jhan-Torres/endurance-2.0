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
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300"
          >
            <div class="flex flex-col items-center">
              <!-- Profile Avatar -->
              <div
                class="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4"
              >
                <svg
                  class="w-12 h-12 text-primary-600 dark:text-primary-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <!-- User Info -->
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-white mb-1"
              >
                {{ userProfile.name }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-2">
                {{ userProfile.email }}
              </p>
              <span
                class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                :class="getRoleBadgeClass(userProfile.role)"
              >
                {{ getRoleLabel(userProfile.role) }}
              </span>

              <!-- Account Stats -->
              <div class="mt-6 w-full">
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div
                      class="text-2xl font-bold text-primary-600 dark:text-primary-400"
                    >
                      {{ userProfile.loginCount }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ isSpanish ? "Inicios de Sesión" : "Logins" }}
                    </div>
                  </div>
                  <div>
                    <div
                      class="text-2xl font-bold text-primary-600 dark:text-primary-400"
                    >
                      {{ daysSinceCreated }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ isSpanish ? "Días Activo" : "Days Active" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="lg:col-span-2">
          <div
            class="bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-300"
          >
            <!-- Profile Form -->
            <div class="p-6">
              <h3
                class="text-lg font-medium text-gray-900 dark:text-white mb-6"
              >
                {{
                  isSpanish ? "Información Personal" : "Personal Information"
                }}
              </h3>

              <form @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Full Name -->
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {{ isSpanish ? "Nombre Completo" : "Full Name" }}
                    </label>
                    <input
                      v-model="editableProfile.name"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {{ isSpanish ? "Correo Electrónico" : "Email Address" }}
                    </label>
                    <input
                      v-model="editableProfile.email"
                      type="email"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <!-- Phone -->
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {{ isSpanish ? "Teléfono" : "Phone Number" }}
                    </label>
                    <input
                      v-model="editableProfile.phone"
                      type="tel"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <!-- Department -->
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {{ isSpanish ? "Departamento" : "Department" }}
                    </label>
                    <input
                      v-model="editableProfile.department"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <!-- Bio -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {{ isSpanish ? "Biografía" : "Bio" }}
                  </label>
                  <textarea
                    v-model="editableProfile.bio"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    :placeholder="
                      isSpanish
                        ? 'Cuéntanos sobre ti...'
                        : 'Tell us about yourself...'
                    "
                  ></textarea>
                </div>

                <!-- Account Information -->
                <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4
                    class="text-md font-medium text-gray-900 dark:text-white mb-4"
                  >
                    {{
                      isSpanish
                        ? "Información de Cuenta"
                        : "Account Information"
                    }}
                  </h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {{ isSpanish ? "Fecha de Registro" : "Member Since" }}
                      </label>
                      <div
                        class="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                      >
                        {{ formatDate(userProfile.createdAt) }}
                      </div>
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {{ isSpanish ? "Último Acceso" : "Last Login" }}
                      </label>
                      <div
                        class="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                      >
                        {{ formatDate(userProfile.lastLogin) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div
                  class="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                  >
                    {{ isSpanish ? "Cancelar" : "Cancel" }}
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200"
                  >
                    {{ isSpanish ? "Guardar Cambios" : "Save Changes" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useLanguage } from "../../../shared/composables/useLanguage";
import { useAuth } from "../../auth/composables/useAuth";

const { isSpanish } = useLanguage();
const { user } = useAuth();

// User profile data
const userProfile = ref({
  id: "demo-user-id",
  name: "Demo User",
  email: "demo@endurance.app",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  bio: "Passionate about technology and building great software solutions.",
  role: "admin",
  loginCount: 42,
  createdAt: new Date("2025-01-15"),
  lastLogin: new Date("2025-09-08T10:30:00"),
});

// Editable profile copy
const editableProfile = ref({ ...userProfile.value });

// Computed properties
const daysSinceCreated = computed(() => {
  const diffTime = Math.abs(
    new Date().getTime() - userProfile.value.createdAt.getTime()
  );
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Helper functions
const getRoleLabel = (role: string) => {
  const labels = {
    admin: isSpanish.value ? "Administrador" : "Administrator",
    user: isSpanish.value ? "Usuario" : "User",
    guest: isSpanish.value ? "Invitado" : "Guest",
  };
  return labels[role as keyof typeof labels] || role;
};

const getRoleBadgeClass = (role: string) => {
  const classes = {
    admin:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    user: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    guest: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };
  return classes[role as keyof typeof classes] || classes.user;
};

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
const saveProfile = () => {
  // Update the main profile with editable data
  Object.assign(userProfile.value, editableProfile.value);

  // TODO: Implement API call to save profile
  console.log("Saving profile:", userProfile.value);
  alert(
    isSpanish.value
      ? "Perfil guardado exitosamente"
      : "Profile saved successfully"
  );
};

const resetForm = () => {
  editableProfile.value = { ...userProfile.value };
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
    editableProfile.value = { ...userProfile.value };
  }
});
</script>
