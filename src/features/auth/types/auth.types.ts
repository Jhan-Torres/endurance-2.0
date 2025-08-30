export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
