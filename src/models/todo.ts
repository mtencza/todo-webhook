export interface WebhookPayload {
  event: 'created' | 'updated' | 'deleted';
  timestamp: string;
  metadata: {
    userId: string;
    id: string;
    content: string;
    isCompleted: boolean;
  };
}

export interface Todo {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isCompleted: boolean;
}
