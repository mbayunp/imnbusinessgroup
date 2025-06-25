import api from './api';
import { ContactMessagePayload, ContactMessageResponse, ContactMessage } from '../types/contact';
import { AxiosError } from 'axios'; 

// Fungsi untuk mengirim pesan kontak baru
const submitContactForm = async (data: ContactMessagePayload): Promise<ContactMessageResponse> => {
  try {
    const response = await api.post<ContactMessageResponse>('/contact', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "Failed to send message.";
  }
};

// Fungsi untuk mengambil semua pesan kontak (untuk admin)
const getAllContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const response = await api.get<ContactMessage[]>('/contact'); // Endpoint GET /api/contact
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "Failed to fetch contact messages.";
  }
};

// Fungsi untuk menghapus pesan kontak
const deleteContactMessage = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/contact/${id}`); // Endpoint DELETE /api/contact/:id
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw (error.response?.data as { message?: string })?.message || error.message;
    }
    throw (error as Error).message || "Failed to delete message.";
  }
};

const updateContactMessageStatus = async (id: string, readStatus: boolean): Promise<ContactMessage> => {
    try {
        // Asumsikan backend memiliki endpoint untuk ini.
        // Anda perlu mengimplementasikan endpoint PUT /api/contact/:id/mark-read di backend.
        const response = await api.put<ContactMessage>(`/contact/${id}/mark-read`, { read: readStatus });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw (error.response?.data as { message?: string })?.message || error.message;
        }
        throw (error as Error).message || "Failed to update message status.";
    }
};

// Export all functions as named exports
export { 
  submitContactForm, 
  getAllContactMessages, 
  deleteContactMessage,
  updateContactMessageStatus 
};
