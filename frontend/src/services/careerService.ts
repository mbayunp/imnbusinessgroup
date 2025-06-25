import api from './api';
import { Career, CareerPayload } from '../types/career';
import axios, { AxiosError } from 'axios';

const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post<{ imageUrl: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrl;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "Failed to upload image.";
  }
};

const getAllCareers = async (): Promise<Career[]> => {
  try {
    const response = await api.get<Career[]>('/careers');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const getCareerById = async (id: string): Promise<Career> => {
  try {
    const response = await api.get<Career>(`/careers/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const createCareer = async (careerData: CareerPayload): Promise<Career> => {
  try {
    const response = await api.post<Career>('/careers', careerData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const updateCareer = async (id: string, careerData: CareerPayload): Promise<Career> => {
  try {
    const response = await api.put<Career>(`/careers/${id}`, careerData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const deleteCareer = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/careers/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

export interface CareerStats {
    totalCareers: number;
    activeCareers: number;
}

const getCareerStats = async (): Promise<CareerStats> => {
    try {
        const response = await api.get<CareerStats>('/careers/stats');
        return {
          totalCareers: response.data.totalCareers,
          activeCareers: response.data.activeCareers || 0
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw (error.response?.data as { message?: string })?.message || error.message;
        }
        throw (error as Error).message || "Failed to fetch career stats.";
    }
};

export {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
  uploadImage,
  getCareerStats,
};
