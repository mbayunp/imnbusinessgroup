import api from './api'; // Mengimpor instance Axios yang sudah dikonfigurasi
import { PressRelease, PressReleasePayload } from '../types/pressRelease'; // Mengimpor interface PressRelease dan PressReleasePayload
import axios, { AxiosError } from 'axios'; // Import axios dan AxiosError untuk penanganan error

// Fungsi untuk mengunggah gambar
const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData(); // Membuat FormData untuk mengirim file
    formData.append('image', file); // 'image' adalah nama field yang diharapkan Multer di backend

    // Mengirim file ke endpoint upload
    const response = await api.post<{ imageUrl: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Penting untuk upload file
      },
    });
    return response.data.imageUrl; // Mengembalikan URL gambar yang diterima dari backend
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "Gagal mengunggah gambar.";
  }
};


// Fungsi untuk mengambil semua berita pers
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

// Fungsi untuk mengambil satu berita pers berdasarkan ID
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

// Fungsi untuk mengupdate berita pers (membutuhkan otorisasi)
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

// Fungsi untuk menghapus berita pers (membutuhkan otorisasi)
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

// BARU: Fungsi untuk mengambil statistik berita pers
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

// Export all functions as named exports, including uploadImage and getPressReleaseStats
export {
  getAllPressReleases,
  getPressReleaseById,
  createPressRelease,
  updatePressRelease,
  deletePressRelease,
  uploadImage,
  getPressReleaseStats,
};
