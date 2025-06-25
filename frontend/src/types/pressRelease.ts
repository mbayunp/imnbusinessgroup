export interface PressRelease {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  postedDate: string
  createdBy: string
  createdAt: string;
  updatedAt: string;
}

export interface PressReleasePayload {
  title: string;
  content: string;
  imageUrl?: string;
}
