// Gestión del estado central
import { reactive } from "vue";
import { AuthState } from "../features/auth/model";
import { NotesState } from "../features/notes/model";
import { LoginsState } from "../features/logins/model";
import { LandingState } from "../features/landing/model";

export interface AppState {
  auth: AuthState;
  notes: NotesState;
  logins: LoginsState;
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
  logins: {
    logins: [],
    loading: false,
    selectedLogin: null,
  },
  landing: {
    content: [],
    loading: false,
    isLoaded: false,
  },
});
