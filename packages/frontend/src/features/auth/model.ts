// Re-export shared types and add frontend-specific state
export type {
  AuthUser,
  AuthState,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
} from "@endurance/shared-types";

// Frontend-specific UI state
import type { AuthState } from "@endurance/shared-types";

export interface AuthUIState extends AuthState {
  showModal: boolean;
  modalType: "login" | "register" | null;
}
