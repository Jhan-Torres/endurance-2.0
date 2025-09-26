// Export all shared types
export * from "./auth";
export * from "./login";
export * from "./note";
export * from "./user";
export * from "./personalInfo";
export * from "./api";

// Common utility types
export type Language = "en" | "es";
export type Theme = "light" | "dark" | "auto";
export type Role = "admin" | "user" | "guest";

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireAtLeastOne<T, K extends keyof T = keyof T> = Omit<T, K> &
  { [P in K]: Required<Pick<T, P>> & Partial<Omit<Pick<T, K>, P>> }[K];

// Date utility types
export interface DateRange {
  from: Date;
  to: Date;
}

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}
