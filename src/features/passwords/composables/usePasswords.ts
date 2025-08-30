import { ref, computed } from "vue";
import { PasswordService } from "../services/passwordService";
import type { Password, PasswordFormData } from "../types/password.types";

const passwordService = new PasswordService();

// Global passwords state
const passwords = ref<Password[]>([]);
const loading = ref(false);

export const usePasswords = () => {
  const loadPasswords = () => {
    loading.value = true;
    try {
      passwords.value = passwordService.getAll();
    } catch (error) {
      console.error("Failed to load passwords:", error);
    } finally {
      loading.value = false;
    }
  };

  const addPassword = (passwordData: PasswordFormData): Password => {
    const newPassword = passwordService.save(passwordData);
    passwords.value.push(newPassword);
    return newPassword;
  };

  const updatePassword = (
    id: string,
    passwordData: Partial<PasswordFormData>
  ): boolean => {
    const updatedPassword = passwordService.update(id, passwordData);
    if (updatedPassword) {
      const index = passwords.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        passwords.value[index] = updatedPassword;
      }
      return true;
    }
    return false;
  };

  const deletePassword = (id: string): boolean => {
    const success = passwordService.delete(id);
    if (success) {
      passwords.value = passwords.value.filter((p) => p.id !== id);
    }
    return success;
  };

  const generatePassword = (length?: number): string => {
    return passwordService.generatePassword(length);
  };

  const searchPasswords = (query: string) => {
    if (!query.trim()) return passwords.value;

    const lowercaseQuery = query.toLowerCase();
    return passwords.value.filter(
      (password) =>
        password.title.toLowerCase().includes(lowercaseQuery) ||
        password.username.toLowerCase().includes(lowercaseQuery) ||
        password.url?.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    passwords: computed(() => passwords.value),
    loading: computed(() => loading.value),
    loadPasswords,
    addPassword,
    updatePassword,
    deletePassword,
    generatePassword,
    searchPasswords,
  };
};
