// Re-export shared types and add frontend-specific state
export type {
  Login,
  LoginsState,
  CreateLoginRequest,
  UpdateLoginRequest,
  LoginSearchQuery,
  LoginsResponse,
  Collection,
} from "@endurance/shared-types";

// Frontend-specific UI state (if needed)
import type { LoginsState } from "@endurance/shared-types";

export interface LoginsUIState extends LoginsState {
  isCreating: boolean;
  isEditing: boolean;
  showCreateModal: boolean;
  showEditModal: boolean;
  searchQuery: string;
  selectedCollection?: string;
}
