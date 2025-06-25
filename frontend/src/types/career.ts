export interface Career {
  _id: string;
  title: string;
  description: string;
  gFormLink: string;
  imageUrl?: string;
  postedDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string; 
}

export interface CareerPayload {
  title: string;
  description: string;
  gFormLink: string;
  imageUrl?: string; 
}
