import type { Password, PasswordFormData } from "../types/password.types";

export class PasswordService {
  private readonly STORAGE_KEY = "endurance_passwords";

  getAll(): Password[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  save(passwordData: PasswordFormData): Password {
    const passwords = this.getAll();
    const newPassword: Password = {
      id: crypto.randomUUID(),
      ...passwordData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    passwords.push(newPassword);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(passwords));
    return newPassword;
  }

  update(id: string, passwordData: Partial<PasswordFormData>): Password | null {
    const passwords = this.getAll();
    const index = passwords.findIndex((p) => p.id === id);

    if (index === -1) return null;

    passwords[index] = {
      ...passwords[index],
      ...passwordData,
      updatedAt: new Date(),
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(passwords));
    return passwords[index];
  }

  delete(id: string): boolean {
    const passwords = this.getAll();
    const filteredPasswords = passwords.filter((p) => p.id !== id);

    if (filteredPasswords.length === passwords.length) return false;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPasswords));
    return true;
  }

  findById(id: string): Password | null {
    const passwords = this.getAll();
    return passwords.find((p) => p.id === id) || null;
  }

  generatePassword(length: number = 16): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
