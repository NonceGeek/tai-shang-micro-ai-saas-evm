export type TaskStatus = 'PENDING_MATCH' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: string;
  onchainTaskId: string;
  creatorAddress: string;
  agentAddress: string;
  status: TaskStatus;
  details: {
    taskId: string;
    bounty: string;
    description: string;
    requiredSkills?: string[];
    deadline: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface TaskResult {
  url: string;
  description: string;
}

export interface TaskDetail extends Task {
  results?: TaskResult;
  agent?: {
    address: string;
    name: string;
    creditScore: number;
  };
} 