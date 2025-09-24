// Core login/password entry types
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

// API request/response types
export interface CreateLoginRequest {
  website: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  collections?: string[];
}

export interface UpdateLoginRequest extends Partial<CreateLoginRequest> {
  id: string;
}

export interface LoginSearchQuery {
  search?: string;
  collection?: string;
  website?: string;
  limit?: number;
  offset?: number;
}

export interface LoginsResponse {
  logins: Login[];
  total: number;
  hasMore: boolean;
}

// Collection types
export interface Collection {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}
