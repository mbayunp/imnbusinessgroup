export interface ContactMessagePayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
export interface ContactMessage {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageResponse {
  message: string;
  data?: ContactMessage;
}
