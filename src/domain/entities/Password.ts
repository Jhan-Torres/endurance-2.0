export interface Password {
  id: string;
  website: string;
  username: string;
  password: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  lastUsed?: Date;
}

export interface PasswordStrength {
  score: number; // 0-100
  level: "weak" | "fair" | "good" | "strong" | "very-strong";
  feedback: string[];
}

export class PasswordEntity implements Password {
  constructor(
    public id: string,
    public website: string,
    public username: string,
    public password: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public description?: string,
    public category?: string,
    public lastUsed?: Date
  ) {}

  updateLastUsed(): void {
    this.lastUsed = new Date();
    this.updatedAt = new Date();
  }

  update(updates: Partial<Omit<Password, "id" | "createdAt">>): void {
    Object.assign(this, { ...updates, updatedAt: new Date() });
  }
}
