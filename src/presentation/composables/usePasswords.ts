import { ref, computed } from "vue";
import type { Password, PasswordStrength } from "../../domain/entities";
import { serviceContainer } from "../../infrastructure/services";

export function usePasswords() {
  const passwords = ref<Password[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const passwordUseCases = serviceContainer.getPasswordUseCases();

  // Load all passwords
  const loadPasswords = async () => {
    loading.value = true;
    error.value = null;
    try {
      passwords.value = await passwordUseCases.getAllPasswords();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to load passwords";
    } finally {
      loading.value = false;
    }
  };

  // Search passwords
  const searchPasswords = async (query: string) => {
    if (!query.trim()) {
      await loadPasswords();
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      passwords.value = await passwordUseCases.searchPasswords(query);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to search passwords";
    } finally {
      loading.value = false;
    }
  };

  // Create password
  const createPassword = async (
    passwordData: Omit<Password, "id" | "createdAt" | "updatedAt">
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const newPassword = await passwordUseCases.createPassword(passwordData);
      passwords.value.push(newPassword);
      return newPassword;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to create password";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update password
  const updatePassword = async (id: string, updates: Partial<Password>) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedPassword = await passwordUseCases.updatePassword(
        id,
        updates
      );
      const index = passwords.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        passwords.value[index] = updatedPassword;
      }
      return updatedPassword;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to update password";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Delete password
  const deletePassword = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await passwordUseCases.deletePassword(id);
      passwords.value = passwords.value.filter((p) => p.id !== id);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete password";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Mark password as used
  const markAsUsed = async (id: string) => {
    try {
      await passwordUseCases.markPasswordAsUsed(id);
      const index = passwords.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        passwords.value[index].lastUsed = new Date();
      }
    } catch (err) {
      console.error("Failed to mark password as used:", err);
    }
  };

  // Generate secure password
  const generatePassword = (
    length: number = 16,
    includeUppercase: boolean = true,
    includeLowercase: boolean = true,
    includeNumbers: boolean = true,
    includeSymbols: boolean = true
  ): string => {
    return passwordUseCases.generateSecurePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
  };

  // Analyze password strength
  const analyzeStrength = (password: string): PasswordStrength => {
    return passwordUseCases.analyzePasswordStrength(password);
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, id?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (id) {
        await markAsUsed(id);
      }
      return true;
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      return false;
    }
  };

  // Computed properties
  const sortedPasswords = computed(() => {
    return [...passwords.value].sort((a, b) => {
      // Prioritize recently used passwords
      if (a.lastUsed && !b.lastUsed) return -1;
      if (!a.lastUsed && b.lastUsed) return 1;
      if (a.lastUsed && b.lastUsed) {
        return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
      }
      // Then sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });

  const passwordCategories = computed(() => {
    const categories = new Set(
      passwords.value.map((p) => p.category).filter(Boolean)
    );
    return Array.from(categories);
  });

  return {
    passwords: sortedPasswords,
    loading,
    error,
    passwordCategories,
    loadPasswords,
    searchPasswords,
    createPassword,
    updatePassword,
    deletePassword,
    markAsUsed,
    generatePassword,
    analyzeStrength,
    copyToClipboard,
  };
}
