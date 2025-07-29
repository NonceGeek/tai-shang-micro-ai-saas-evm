"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAITaskContract } from '@/hooks/useContract';
import { Plus, Loader2, CheckCircle, AlertCircle, CalendarIcon } from 'lucide-react';
import { parseEther, formatEther } from 'viem';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CreateTaskDialogProps {
  onTaskCreated?: () => void;
}

export default function CreateTaskDialog({ onTaskCreated }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [bounty, setBounty] = useState('');
  const [deadline, setDeadline] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    createTask,
    maxBounty,
    isConnected,
    isPending,
    isConfirming,
    isSuccess,
    error,
  } = useAITaskContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!bounty.trim()) {
      newErrors.bounty = 'Bounty is required';
    } else {
      const bountyValue = parseFloat(bounty);
      if (isNaN(bountyValue) || bountyValue <= 0) {
        newErrors.bounty = 'Bounty must be a positive number';
      } else if (maxBounty && typeof maxBounty === 'bigint' && bountyValue > Number(formatEther(maxBounty))) {
        newErrors.bounty = `Bounty cannot exceed ${formatEther(maxBounty)} ETH`;
      }
    }
    
    if (!deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const now = new Date();
      if (deadline <= now) {
        newErrors.deadline = 'Deadline must be in the future';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Combine date and time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const combinedDate = new Date(deadline!);
      combinedDate.setHours(hours, minutes, 0, 0);
      
      const deadlineTimestamp = BigInt(Math.floor(combinedDate.getTime() / 1000));
      await createTask(description, deadlineTimestamp, bounty);
    } catch (err: unknown) {
      console.error('Failed to create task:', err);
      setErrors({ submit: 'Failed to create task. Please try again.' });
    }
  };

  const handleSuccess = () => {
    setOpen(false);
    setDescription('');
    setBounty('');
    setDeadline(undefined);
    setSelectedTime('12:00');
    setErrors({});
    onTaskCreated?.();
  };

  const isLoading = isPending || isConfirming;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-[#4b3fdd] hover:bg-[#372eb0] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          disabled={!isConnected}
        >
          <Plus className="w-5 h-5" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-[#2c2840] backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            {isSuccess ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-400" />
                Task Created Successfully!
              </>
            ) : (
              <>
                <Plus className="w-6 h-6" />
                Create New Task
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center py-4">
            <p className="text-white/70 mb-4">
              Your task has been created and is now available for AI agents to accept.
            </p>
            <Button
              onClick={handleSuccess}
              className="bg-[#4b3fdd] hover:bg-[#372eb0] text-white"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isConnected && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-200 text-sm">
                  Please connect your wallet to create a task
                </span>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-200 text-sm">
                  {error instanceof Error ? error.message : 'An error occurred while creating the task'}
                </span>
              </div>
            )}

            {errors.submit && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-200 text-sm">{errors.submit}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Task Description *
              </label>
              <Textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                placeholder="Describe the task you want AI agents to complete..."
                className="bg-[#23203a] border border-white/10 text-white placeholder-white/60 resize-none"
                rows={4}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-red-400 text-xs">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Bounty (METIS) *
              </label>
              <Input
                type="number"
                value={bounty}
                onChange={(e) => setBounty(e.target.value)}
                placeholder="0.01"
                step="0.001"
                min="0.001"
                max={maxBounty ? formatEther(maxBounty as unknown as bigint) : undefined}
                className="bg-[#23203a] border border-white/10 text-white placeholder-white/60"
                disabled={isLoading}
              />
              {errors.bounty && (
                <p className="text-red-400 text-xs">{errors.bounty}</p>
              )}
              {maxBounty && typeof maxBounty === 'bigint' ? (
                <p className="text-white/60 text-xs">
                  Maximum bounty: {formatEther(maxBounty)} METIS
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Deadline *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-[#23203a] border border-white/10 text-white hover:bg-white/20",
                      !deadline && "text-white/60"
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                                         {deadline ? format(deadline, "PPP") + ` at ${selectedTime}` : <span>Pick a date and time</span>}
                  </Button>
                </PopoverTrigger>
                                 <PopoverContent className="w-auto p-4 bg-[#23203a] border border-white/10" align="start">
                   <div className="space-y-4">
                     <Calendar
                       mode="single"
                       selected={deadline}
                       onSelect={setDeadline}
                       disabled={(date) => date < new Date()}
                       initialFocus
                       className="bg-[#23203a] text-white"
                     />
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-white/80">
                         Time
                       </label>
                       <Input
                         type="time"
                         value={selectedTime}
                         onChange={(e) => setSelectedTime(e.target.value)}
                         className="bg-[#23203a] border border-white/10 text-white"
                       />
                     </div>
                   </div>
                 </PopoverContent>
              </Popover>
              {errors.deadline && (
                <p className="text-red-400 text-xs">{errors.deadline}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 border-white/30 bg-white/5 hover:bg-white/10 text-white"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#4b3fdd] hover:bg-[#372eb0] text-white"
                disabled={!isConnected || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Task'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} 