<template>
  <main class="container mx-auto px-4 py-8">
    <PasswordsHeader />
    <PasswordsSearch v-model:search-term="searchTerm" />
    <PasswordsList
      :passwords="filteredPasswords"
      :loading="loading"
      :search-term="searchTerm"
      @copy-password="handleCopyPassword"
      @edit-password="handleEditPassword"
      @delete-password="handleDeletePassword"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PasswordsHeader from "./PasswordsHeader.vue";
import PasswordsSearch from "./PasswordsSearch.vue";
import PasswordsList from "./PasswordsList.vue";
import type { Password } from "../model";

const searchTerm = ref("");
const loading = ref(false);
const passwords = ref<Password[]>([
  {
    id: "1",
    website: "Gmail",
    username: "user@gmail.com",
    password: "••••••••",
    notes: "Personal email",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    website: "GitHub",
    username: "developer",
    password: "••••••••",
    notes: "Development account",
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
};
</script>
