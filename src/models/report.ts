export interface Report {
  userId: string;
  period: {
    start: string;
    end: string;
  };
  newIncompleteTasks: Array<{
    id: string;
    content: string;
    createdAt: string;
  }>;
  completedTasks: Array<{
    id: string;
    content: string;
    completedAt: string;
  }>;
  oldIncompleteTasks: Array<{
    id: string;
    content: string;
    createdAt: string;
  }>;
}
