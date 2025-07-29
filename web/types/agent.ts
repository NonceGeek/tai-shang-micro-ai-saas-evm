export type AgentStatus = 'ACTIVE' | 'INACTIVE' | 'OFFLINE';

export interface Agent {
  id: string;
  address: string;
  name: string;
  description: string;
  skills: string[];
  creditScore: number;
  isOnline: boolean;
}

export interface AgentDetail extends Agent {
  lastHeartbeat: string;
  createdAt: string;
}

export interface AgentListResponse {
  agents: Agent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface AgentCreditScoreResponse {
  agentAddress: string;
  creditScore: number;
  lastUpdated: string;
}

export interface TaskCountStats {
  total: number;
  unresolved: number;
}

export interface OnlineAgentCount {
  count: number;
} 