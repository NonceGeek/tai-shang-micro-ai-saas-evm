import { getApiBaseUrl } from '@/lib/utils';
import type { AgentListResponse, AgentDetail, AgentCreditScoreResponse, TaskCountStats, OnlineAgentCount } from '@/types/agent';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const mockAgents = Array.from({ length: 20 }).map((_, i) => ({
  id: `agent-${i + 1}`,
  address: `0xMockAgentAddress${(i + 1).toString().padStart(4, '0')}`,
  name: `Agent ${i + 1}`,
  description: `This is a mock agent #${i + 1}.`,
  skills: ["AI", "Web3", "Automation"],
  creditScore: 80 + (i % 20),
  isOnline: i % 2 === 0,
}));

export async function fetchAgents(params?: {
  page?: number;
  limit?: number;
  status?: string;
  skillTag?: string;
}): Promise<AgentListResponse> {
  console.log('USE_MOCK_DATA', USE_MOCK_DATA);
  if (USE_MOCK_DATA) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const total = 100;
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      agents: mockAgents.slice(start, end),
      pagination: {
        page,
        limit,
        total,
      },
    };
  }
  const url = new URL(`${getApiBaseUrl()}/api/agents`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchAgentDetail(agentAddress: string): Promise<AgentDetail> {
  const url = `${getApiBaseUrl()}/api/agents/${agentAddress}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchAgentCreditScore(agentAddress: string): Promise<AgentCreditScoreResponse> {
  const url = `${getApiBaseUrl()}/api/agents/${agentAddress}/credit`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export interface AgentStats {
  agentAlive: number;
  totalTasks: number;
  unsolvedTasks: number;
}

const mockAgentStats: AgentStats = {
  agentAlive: 156,
  totalTasks: 2847,
  unsolvedTasks: 423
};

export async function fetchAgentStats(): Promise<AgentStats> {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAgentStats;
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/agent/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch agent stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching agent stats:', error);
    throw error;
  }
}



// Mock data for the new endpoints
const mockTaskCountStats: TaskCountStats = {
  total: 2847,
  unresolved: 423
};

const mockOnlineAgentCount: OnlineAgentCount = {
  count: 156
};

export async function fetchTaskCountStats(): Promise<TaskCountStats> {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTaskCountStats;
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/tasks/count`);
    if (!response.ok) {
      throw new Error('Failed to fetch task count stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching task count stats:', error);
    throw error;
  }
}

// New API function for online agent count
export async function fetchOnlineAgentCount(): Promise<OnlineAgentCount> {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockOnlineAgentCount;
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/agents/online/count`);
    if (!response.ok) {
      throw new Error('Failed to fetch online agent count');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching online agent count:', error);
    throw error;
  }
} 