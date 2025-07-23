import { useQuery } from '@tanstack/react-query';
import { fetchAgents, fetchAgentDetail, fetchAgentCreditScore } from '@/api/agent';
import type { AgentListResponse, AgentDetail, AgentCreditScoreResponse } from '@/types/agent';

export function useAgents(params?: {
  page?: number;
  limit?: number;
  status?: string;
  skillTag?: string;
}) {
  return useQuery<AgentListResponse>({
    queryKey: ['agents', params],
    queryFn: () => fetchAgents(params),
  });
}

export function useAgentDetail(agentAddress: string, enabled = true) {
  return useQuery<AgentDetail>({
    queryKey: ['agent', agentAddress],
    queryFn: () => fetchAgentDetail(agentAddress),
    enabled: !!agentAddress && enabled,
  });
}

export function useAgentCreditScore(agentAddress: string, enabled = true) {
  return useQuery<AgentCreditScoreResponse>({
    queryKey: ['agentCredit', agentAddress],
    queryFn: () => fetchAgentCreditScore(agentAddress),
    enabled: !!agentAddress && enabled,
  });
} 