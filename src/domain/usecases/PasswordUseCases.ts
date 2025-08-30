import type { Password, PasswordStrength } from "../entities";
import type { PasswordRepository } from "../repositories";

export class PasswordUseCases {
  constructor(private passwordRepository: PasswordRepository) {}

  async getAllPasswords(): Promise<Password[]> {
    return await this.passwordRepository.findAll();
  }

  async getPasswordById(id: string): Promise<Password | null> {
    return await this.passwordRepository.findById(id);
  }

  async searchPasswords(query: string): Promise<Password[]> {
    return await this.passwordRepository.search(query);
  }

  async createPassword(
    passwordData: Omit<Password, "id" | "createdAt" | "updatedAt">
  ): Promise<Password> {
    const password: Password = {
      ...passwordData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.passwordRepository.save(password);
  }

  async updatePassword(
    id: string,
    updates: Partial<Password>
  ): Promise<Password> {
    return await this.passwordRepository.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  async deletePassword(id: string): Promise<void> {
    await this.passwordRepository.delete(id);
  }

  async markPasswordAsUsed(id: string): Promise<void> {
    await this.passwordRepository.update(id, {
      lastUsed: new Date(),
      updatedAt: new Date(),
    });
  }

  generateSecurePassword(
    length: number = 16,
    includeUppercase: boolean = true,
    includeLowercase: boolean = true,
    includeNumbers: boolean = true,
    includeSymbols: boolean = true
  ): string {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  analyzePasswordStrength(password: string): PasswordStrength {
    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 12) {
      score += 25;
    } else if (password.length >= 8) {
      score += 15;
      feedback.push("Consider using a longer password (12+ characters)");
    } else {
      score += 5;
      feedback.push("Password is too short. Use at least 8 characters");
    }

    // Character variety checks
    if (/[a-z]/.test(password)) score += 15;
    else feedback.push("Add lowercase letters");

    if (/[A-Z]/.test(password)) score += 15;
    else feedback.push("Add uppercase letters");

    if (/[0-9]/.test(password)) score += 15;
    else feedback.push("Add numbers");

    if (/[^a-zA-Z0-9]/.test(password)) score += 20;
    else feedback.push("Add special characters");

    // Bonus for good practices
    if (password.length >= 16) score += 10;

    // Penalties for common patterns
    if (/(.)\1{2,}/.test(password)) {
      score -= 15;
      feedback.push("Avoid repeating characters");
    }

    if (/123|abc|qwe/i.test(password)) {
      score -= 20;
      feedback.push("Avoid common sequences");
    }

    score = Math.max(0, Math.min(100, score));

    let level: PasswordStrength["level"];
    if (score >= 90) level = "very-strong";
    else if (score >= 70) level = "strong";
    else if (score >= 50) level = "good";
    else if (score >= 30) level = "fair";
    else level = "weak";

    return { score, level, feedback };
  }

  private generateId(): string {
    return (
      "pwd_" + Date.now().toString(36) + Math.random().toString(36).substr(2)
    );
  }
}
