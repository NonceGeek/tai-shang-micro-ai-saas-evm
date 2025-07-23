import { getApiBaseUrl } from '@/lib/utils';
import type { TaskListResponse, TaskDetail } from '@/types/task';

export async function fetchTasks(params?: {
  page?: number;
  limit?: number;
  status?: string;
  skillTag?: string;
}): Promise<TaskListResponse> {
  const url = new URL(`${getApiBaseUrl()}/api/tasks`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchTaskDetail(taskId: string): Promise<TaskDetail> {
  const url = `${getApiBaseUrl()}/api/tasks/${taskId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
} 