// Tipos y estado local de passwords
export interface Password {
  id: string;
  website: string;
  username: string;
  password: string;
  url?: string;
  favicon?: string;
  notes?: string;
  collections?: string[];
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordsState {
  passwords: Password[];
  loading: boolean;
  selectedPassword: Password | null;
}
