"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTaskDetail } from '@/hooks/useTask';
import { Calendar, DollarSign, User, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { getStatusColor, getStatusText } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaskDetailDialogProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TaskDetailDialog({ taskId, open, onOpenChange }: TaskDetailDialogProps) {
  const { data: task, isLoading, error } = useTaskDetail(taskId || '', open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#2c2840] backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <TooltipProvider>
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Task Details</DialogTitle>
          </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-8 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to load task details</span>
          </div>
        ) : task ? (
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex justify-between items-start">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                {getStatusText(task.status)}
              </span>
              <span className="text-white/60 text-sm">
                ID: {task.onchainTaskId}
              </span>
            </div>

            {/* Task Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-white/80 leading-relaxed">
                {task.details.description}
              </p>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bounty */}
              <div className="flex items-center gap-3 p-4 bg-[#23203a] rounded-lg border border-white/10">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/60">Bounty</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-lg font-semibold text-green-400 truncate">
                        {task.details.bounty}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#2c2840] border-white/20 text-white">
                      <p>{task.details.bounty}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-3 p-4 bg-[#23203a] rounded-lg border border-white/10">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-white/60">Deadline</p>
                  <p className="text-lg font-semibold text-white">
                    {format(new Date(task.details.deadline), 'PPP')}
                  </p>
                </div>
              </div>

              {/* Creator */}
              <div className="flex items-center gap-3 p-4 bg-[#23203a] rounded-lg border border-white/10">
                <User className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-white/60">Creator</p>
                  <p className="text-sm font-mono text-white break-all">
                    {task.creatorAddress}
                  </p>
                </div>
              </div>

              {/* Agent (if assigned) */}
              <div className="flex items-center gap-3 p-4 bg-[#23203a] rounded-lg border border-white/10">
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm text-white/60">Agent</p>
                  <p className="text-sm font-mono text-white break-all">
                    {task.agentAddress || 'Not assigned yet'}
                  </p>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            {task.details.requiredSkills && task.details.requiredSkills.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-white mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {task.details.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#4b3fdd]/20 text-[#a5a1f7] text-sm rounded-full border border-[#4b3fdd]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Details (if assigned) */}
            {task.agent && (
              <div className="p-4 bg-[#23203a] rounded-lg border border-white/10">
                <h4 className="text-md font-semibold text-white mb-3">Assigned Agent</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Name:</span>
                    <span className="text-white font-medium">{task.agent.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Address:</span>
                    <span className="text-white font-mono text-sm break-all">{task.agent.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Credit Score:</span>
                    <span className="text-white font-medium">{task.agent.creditScore}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span>Created: {format(new Date(task.createdAt), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span>Updated: {format(new Date(task.updatedAt), 'PPP')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-white/30 bg-white/5 hover:bg-white/10 text-white"
              >
                Close
              </Button>
              {task.status === 'PENDING_MATCH' && (
                <Button className="flex-1 bg-[#4b3fdd] hover:bg-[#372eb0] text-white">
                  Accept Task
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-white/60">
            Task not found
          </div>
        )}
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
} 