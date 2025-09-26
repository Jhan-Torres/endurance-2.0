<template>
  <main class="container mx-auto px-4 py-8">
    <LoginsHeader @add-login="handleAddLogin" />

    <div class="mt-8">
      <LoginsSearch v-model:search-term="searchTerm" />
    </div>

    <div class="mt-6">
      <LoginsTable
        :logins="filteredLogins"
        :loading="loading"
        :search-term="searchTerm"
        @copy-password="handleCopyPassword"
        @edit-login="handleEditLogin"
        @delete-login="handleDeleteLogin"
        @login-updated="handleLoginUpdate"
      />
    </div>

    <!-- Add Login Modal -->
    <AddLoginModal
      :is-open="showAddLogin"
      @close="closeAddLogin"
      @save="handleAddNewLogin"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import LoginsHeader from "./LoginsHeader.vue";
import LoginsSearch from "./LoginsSearch.vue";
import LoginsTable from "./LoginsTable.vue";
import AddLoginModal from "./AddLoginModal.vue";
import type { Login } from "../model";

const searchTerm = ref("");
const loading = ref(false);
const showAddLogin = ref(false);
const logins = ref<Login[]>([
  {
    id: "1",
    website: "Amazon",
    username: "user@email.com",
    password: "••••••••",
    url: "https://amazon.com",
    favicon: "🛒",
    notes: "Shopping account",
    collections: [],
    lastUsed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    website: "aprende.org",
    username: "jtorres17_1@unc.edu.pe",
    password: "••••••••",
    url: "https://aprende.org",
    favicon: "📚",
    notes: "Learning platform",
    collections: [],
    lastUsed: new Date(Date.now() - 1095 * 24 * 60 * 60 * 1000), // 3 years ago
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    website: "azulschool.net",
    username: "jtorres17_1@unc.edu.pe",
    password: "••••••••",
    url: "https://azulschool.net",
    favicon: "🏫",
    notes: "School platform",
    collections: ["Tecnología"],
    lastUsed: new Date(Date.now() - 1095 * 24 * 60 * 60 * 1000), // 3 years ago
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    website: "campus-ademass.com",
    username: "jtorres17_1@unc.edu.pe",
    password: "••••••••",
    url: "https://campus-ademass.com",
    favicon: "🎓",
    notes: "Campus platform",
    collections: [],
    lastUsed: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000), // 10 months ago
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

const filteredLogins = computed(() => {
  if (!searchTerm.value) return logins.value;
  return logins.value.filter(
    (login) =>
      login.website.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      login.username.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const handleCopyPassword = (id: string) => {
  // TODO: Implement copy to clipboard
};

const handleEditLogin = (login: Login) => {
  // TODO: Implement edit login
};

const handleDeleteLogin = (id: string) => {
  // TODO: Implement delete login
  const index = logins.value.findIndex((l) => l.id === id);
  if (index > -1) {
    logins.value.splice(index, 1);
  }
};

const handleLoginUpdate = (updatedLogin: Login) => {
  const index = logins.value.findIndex((l) => l.id === updatedLogin.id);
  if (index > -1) {
    logins.value[index] = updatedLogin;
  } else {
    // It's a new login
    logins.value.push(updatedLogin);
  }
};

const handleAddLogin = () => {
  showAddLogin.value = true;
};

const handleAddNewLogin = (newLogin: Login) => {
  logins.value.push(newLogin);
  showAddLogin.value = false;
};

const closeAddLogin = () => {
  showAddLogin.value = false;
};
</script>
