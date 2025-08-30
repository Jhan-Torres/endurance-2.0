import type { User, LoginCredentials } from "../types/auth.types";

export class AuthService {
  private readonly STORAGE_KEY = "endurance_auth";
  private readonly USER_KEY = "endurance_user";

  async login(credentials: LoginCredentials): Promise<User | null> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, any email/password combo works
    if (credentials.email && credentials.password) {
      const user: User = {
        id: crypto.randomUUID(),
        email: credentials.email,
        name: credentials.email.split("@")[0],
      };

      this.setAuthToken("demo-token-" + Date.now());
      this.setUser(user);
      return user;
    }

    return null;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getStoredUser(): User | null {
    try {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
