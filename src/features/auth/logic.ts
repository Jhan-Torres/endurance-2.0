// Casos de uso (login, logout, etc.)
import { AuthState, AuthUser } from "./model";

export const login = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  // Login logic here
  return { id: "1", email, name: "User" };
};

export const logout = async (): Promise<void> => {
  // Logout logic here
};

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<AuthUser> => {
  // Register logic here
  return { id: "1", email, name };
};
