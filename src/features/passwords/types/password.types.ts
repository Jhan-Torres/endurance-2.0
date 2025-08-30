export interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordFormData {
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
}
