// User profile types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  lastLogin: Date;
  settings?: UserSettings;
}

export interface UserSettings {
  theme: "light" | "dark" | "auto";
  language: "en" | "es";
  notifications: {
    email: boolean;
    browser: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number; // minutes
  };
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  settings?: Partial<UserSettings>;
}
