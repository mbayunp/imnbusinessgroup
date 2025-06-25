export interface UserProfile {
  _id: string;
  username: string;
  role: 'admin' | 'hr' | string;
}

export interface AuthResponse extends UserProfile {
  token: string;
}
