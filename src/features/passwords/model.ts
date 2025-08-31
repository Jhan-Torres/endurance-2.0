// Tipos y estado local de passwords
export interface Password {
  id: string;
  website: string;
  username: string;
  password: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordsState {
  passwords: Password[];
  loading: boolean;
  selectedPassword: Password | null;
}
