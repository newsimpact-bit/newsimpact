// Auth types
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      username: string;
      name?: string;
      subscriptionTier: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface TokenPayload {
  userId: string;
  email: string;
  subscriptionTier: string;
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
}

// Request with user (after middleware)
export interface AuthenticatedRequest extends Express.Request {
  user?: TokenPayload;
  token?: string;
}
