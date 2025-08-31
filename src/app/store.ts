// Gestión del estado central
import { reactive } from "vue";
import { AuthState } from "../features/auth/model";
import { NotesState } from "../features/notes/model";
import { PasswordsState } from "../features/passwords/model";
import { LandingState } from "../features/landing/model";

export interface AppState {
  auth: AuthState;
  notes: NotesState;
  passwords: PasswordsState;
  landing: LandingState;
}

export const store = reactive<AppState>({
  auth: {
    user: null,
    isAuthenticated: false,
    loading: false,
  },
  notes: {
    notes: [],
    loading: false,
    selectedNote: null,
  },
  passwords: {
    passwords: [],
    loading: false,
    selectedPassword: null,
  },
  landing: {
    content: [],
    loading: false,
    isLoaded: false,
  },
});
