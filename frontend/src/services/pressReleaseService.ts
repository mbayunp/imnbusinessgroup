import api from './api';
import { PressRelease, PressReleasePayload } from '../types/pressRelease';
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
    throw (error as Error).message || "Gagal mengunggah gambar.";
  }
};


const getAllPressReleases = async (): Promise<PressRelease[]> => {
  try {
    const response = await api.get<PressRelease[]>('/press-releases');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const getPressReleaseById = async (id: string): Promise<PressRelease> => {
  try {
    const response = await api.get<PressRelease>(`/press-releases/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

// Interface untuk data yang dikirim saat membuat/mengupdate berita pers
interface PressReleasePayload {
  title: string;
  content: string;
  imageUrl?: string;
}

// Fungsi untuk membuat berita pers baru (membutuhkan otorisasi)
const createPressRelease = async (pressReleaseData: PressReleasePayload): Promise<PressRelease> => {
  try {
    const response = await api.post<PressRelease>('/press-releases', pressReleaseData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const updatePressRelease = async (id: string, pressReleaseData: PressReleasePayload): Promise<PressRelease> => {
  try {
    const response = await api.put<PressRelease>(`/press-releases/${id}`, pressReleaseData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

const deletePressRelease = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/press-releases/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "An unexpected error occurred.";
  }
};

interface PressReleaseStats {
  totalPressReleases: number;
}

const getPressReleaseStats = async (): Promise<PressReleaseStats> => {
  try {
    const response = await api.get<PressReleaseStats>('/press-releases/stats');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "Failed to fetch press release stats.";
  }
};

export {
  getAllPressReleases,
  getPressReleaseById,
  createPressRelease,
  updatePressRelease,
  deletePressRelease,
  uploadImage,
  getPressReleaseStats,
};
