import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout as authServiceLogout } from '../services/authService';
import { UserProfile } from '../types/user';
import { AuthContext } from '../hooks/useAdminAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user profile, likely no active session or invalid token:', err);
        setUser(null);
        authServiceLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const loginUser = async () => {
    setLoading(true);
    try {
        const userData = await getProfile();
        setUser(userData);
    } catch (error) {
        setUser(null);
        authServiceLogout();
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    authServiceLogout();
    setUser(null);
    navigate('/admin/login');
  };

  const contextValue = {
    user,
    loading,
    loginUser,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
