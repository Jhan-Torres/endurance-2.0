import type { Password } from "../../domain/entities";
import type { PasswordRepository } from "../../domain/repositories";

export class LocalStoragePasswordRepository implements PasswordRepository {
  private readonly storageKey = "endurance_passwords";

  async findAll(): Promise<Password[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data).map(this.deserialize) : [];
  }

  async findById(id: string): Promise<Password | null> {
    const passwords = await this.findAll();
    return passwords.find((p) => p.id === id) || null;
  }

  async findByWebsite(website: string): Promise<Password[]> {
    const passwords = await this.findAll();
    return passwords.filter((p) =>
      p.website.toLowerCase().includes(website.toLowerCase())
    );
  }

  async search(query: string): Promise<Password[]> {
    const passwords = await this.findAll();
    const lowerQuery = query.toLowerCase();
    return passwords.filter(
      (p) =>
        p.website.toLowerCase().includes(lowerQuery) ||
        p.username.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery) ||
        p.category?.toLowerCase().includes(lowerQuery)
    );
  }

  async save(password: Password): Promise<Password> {
    const passwords = await this.findAll();
    passwords.push(password);
    this.saveToStorage(passwords);
    return password;
  }

  async update(id: string, updates: Partial<Password>): Promise<Password> {
    const passwords = await this.findAll();
    const index = passwords.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Password not found");
    }
    passwords[index] = { ...passwords[index], ...updates };
    this.saveToStorage(passwords);
    return passwords[index];
  }

  async delete(id: string): Promise<void> {
    const passwords = await this.findAll();
    const filteredPasswords = passwords.filter((p) => p.id !== id);
    this.saveToStorage(filteredPasswords);
  }

  async exists(id: string): Promise<boolean> {
    const password = await this.findById(id);
    return password !== null;
  }

  private saveToStorage(passwords: Password[]): void {
    const serialized = passwords.map(this.serialize);
    localStorage.setItem(this.storageKey, JSON.stringify(serialized));
  }

  private serialize(password: Password): any {
    return {
      ...password,
      createdAt: password.createdAt.toISOString(),
      updatedAt: password.updatedAt.toISOString(),
      lastUsed: password.lastUsed?.toISOString(),
    };
  }

  private deserialize(data: any): Password {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      lastUsed: data.lastUsed ? new Date(data.lastUsed) : undefined,
    };
  }
}
