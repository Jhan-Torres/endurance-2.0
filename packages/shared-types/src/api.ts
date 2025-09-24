// Generic API response types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Common query parameters
export interface BaseQuery {
  limit?: number;
  offset?: number;
  sort?: string;
  order?: "asc" | "desc";
}

// HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// API endpoint contracts
export interface ApiEndpoints {
  // Auth endpoints
  auth: {
    login: {
      method: "POST";
      body: import("./auth").LoginRequest;
      response: import("./auth").AuthResponse;
    };
    register: {
      method: "POST";
      body: import("./auth").RegisterRequest;
      response: import("./auth").AuthResponse;
    };
    logout: {
      method: "POST";
      response: { success: boolean };
    };
  };

  // Logins endpoints
  logins: {
    list: {
      method: "GET";
      query?: import("./login").LoginSearchQuery;
      response: import("./login").LoginsResponse;
    };
    create: {
      method: "POST";
      body: import("./login").CreateLoginRequest;
      response: import("./login").Login;
    };
    update: {
      method: "PUT";
      params: { id: string };
      body: import("./login").UpdateLoginRequest;
      response: import("./login").Login;
    };
    delete: {
      method: "DELETE";
      params: { id: string };
      response: { success: boolean };
    };
  };

  // Notes endpoints
  notes: {
    list: {
      method: "GET";
      query?: import("./note").NoteSearchQuery;
      response: import("./note").NotesResponse;
    };
    create: {
      method: "POST";
      body: import("./note").CreateNoteRequest;
      response: import("./note").Note;
    };
    update: {
      method: "PUT";
      params: { id: string };
      body: import("./note").UpdateNoteRequest;
      response: import("./note").Note;
    };
    delete: {
      method: "DELETE";
      params: { id: string };
      response: { success: boolean };
    };
  };
}
