<template>
  <main class="container mx-auto px-4 py-8">
    <PasswordsHeader @add-password="handleAddPassword" />

    <div class="mt-8">
      <PasswordsSearch v-model:search-term="searchTerm" />
    </div>

    <div class="mt-6">
      <PasswordsList
        :passwords="filteredPasswords"
        :loading="loading"
        :search-term="searchTerm"
        @copy-password="handleCopyPassword"
        @edit-password="handleEditPassword"
        @delete-password="handleDeletePassword"
        @password-updated="handlePasswordUpdate"
      />
    </div>

    <!-- Add Password Side Panel -->
    <PasswordDetailPanel
      :is-open="showAddPassword"
      :password="newPasswordTemplate"
      @close="closeAddPassword"
      @save="handlePasswordUpdate"
      @delete="() => {}"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PasswordsHeader from "./PasswordsHeader.vue";
import PasswordsSearch from "./PasswordsSearch.vue";
import PasswordsList from "./PasswordsList.vue";
import PasswordDetailPanel from "./PasswordDetailPanel.vue";
import type { Password } from "../model";

const searchTerm = ref("");
const loading = ref(false);
const showAddPassword = ref(false);
const passwords = ref<Password[]>([
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

const filteredPasswords = computed(() => {
  if (!searchTerm.value) return passwords.value;
  return passwords.value.filter(
    (password) =>
      password.website.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const handleCopyPassword = (id: string) => {
  console.log("Copy password:", id);
  // TODO: Implement copy to clipboard
};

const handleEditPassword = (password: Password) => {
  console.log("Edit password:", password);
  // TODO: Implement edit password
};

const handleDeletePassword = (id: string) => {
  console.log("Delete password:", id);
  // TODO: Implement delete password
  const index = passwords.value.findIndex((p) => p.id === id);
  if (index > -1) {
    passwords.value.splice(index, 1);
  }
};

const handlePasswordUpdate = (updatedPassword: Password) => {
  const index = passwords.value.findIndex((p) => p.id === updatedPassword.id);
  if (index > -1) {
    passwords.value[index] = updatedPassword;
  } else {
    // It's a new password
    passwords.value.push(updatedPassword);
  }
};

const handleAddPassword = () => {
  showAddPassword.value = true;
};

const closeAddPassword = () => {
  showAddPassword.value = false;
};

// Create a new password template
const newPasswordTemplate = computed<Password>(() => ({
  id: "new", // Temporary ID for new passwords
  website: "",
  username: "",
  password: "",
  url: "",
  favicon: "",
  notes: "",
  collections: [],
  lastUsed: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
</script>
