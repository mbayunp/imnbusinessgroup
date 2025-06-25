import api from './api';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { UserProfile, AuthResponse } from '../types/user';

const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', { username, password });
    Cookies.set('jwtToken', response.data.token, { 
      expires: 1 / 24, 
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax' 
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const register = async (username: string, password: string, role: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', { username, password, role });
    Cookies.set('jwtToken', response.data.token, { 
      expires: 1 / 24, 
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax' 
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<UserProfile>('/auth/me');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const logout = (): void => {
  Cookies.remove('jwtToken');
};

export { login, register, getProfile, logout };