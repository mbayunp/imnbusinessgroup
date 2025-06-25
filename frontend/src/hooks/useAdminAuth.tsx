import { createContext, useContext } from 'react';
import { UserProfile } from '../types/user';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginUser: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
