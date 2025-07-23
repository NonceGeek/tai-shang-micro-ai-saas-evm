import { getApiBaseUrl } from '@/lib/utils';
import type { AgentListResponse, AgentDetail, AgentCreditScoreResponse } from '@/types/agent';

export async function fetchAgents(params?: {
  page?: number;
  limit?: number;
  status?: string;
  skillTag?: string;
}): Promise<AgentListResponse> {
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