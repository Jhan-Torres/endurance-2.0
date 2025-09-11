// Tipos y estado local de logins
export interface Login {
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

export interface LoginsState {
  logins: Login[];
  loading: boolean;
  selectedLogin: Login | null;
}
