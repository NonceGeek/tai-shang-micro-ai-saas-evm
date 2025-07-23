import { useQuery } from '@tanstack/react-query';
import { fetchTasks, fetchTaskDetail } from '@/api/task';
import type { TaskListResponse, TaskDetail } from '@/types/task';

export function useTasks(params?: {
  page?: number;
  limit?: number;
  status?: string;
  skillTag?: string;
}) {
  return useQuery<TaskListResponse>({
    queryKey: ['tasks', params],
    queryFn: () => fetchTasks(params),
  });
}

export function useTaskDetail(taskId: string, enabled = true) {
  return useQuery<TaskDetail>({
    queryKey: ['task', taskId],
    queryFn: () => fetchTaskDetail(taskId),
    enabled: !!taskId && enabled,
  });
} 