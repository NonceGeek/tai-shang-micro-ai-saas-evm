import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { AITASK_ABI, AITASK_CONTRACT_ADDRESS, TASK_STATUS, getTaskStatusText, formatBounty, formatDeadline } from '@/lib/contract';
import { parseEther } from 'viem';

export function useAITaskContract() {
  const { address, isConnected } = useAccount();

  // Read contract functions
  const { data: nextTaskId } = useReadContract({
    address: AITASK_CONTRACT_ADDRESS,
    abi: AITASK_ABI,
    functionName: 'nextTaskId',
  });

  const { data: totalTasks } = useReadContract({
    address: AITASK_CONTRACT_ADDRESS,
    abi: AITASK_ABI,
    functionName: 'totalTasks',
  });

  const { data: activeTasks } = useReadContract({
    address: AITASK_CONTRACT_ADDRESS,
    abi: AITASK_ABI,
    functionName: 'activeTasks',
  });

  const { data: maxBounty } = useReadContract({
    address: AITASK_CONTRACT_ADDRESS,
    abi: AITASK_ABI,
    functionName: 'maxBounty',
  });

  const { data: config } = useReadContract({
    address: AITASK_CONTRACT_ADDRESS,
    abi: AITASK_ABI,
    functionName: 'config',
  });

  // Write contract functions
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Create task function
  const createTask = async (description: string, deadline: bigint, bounty: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const bountyWei = parseEther(bounty);
    
    return writeContract({
      address: AITASK_CONTRACT_ADDRESS,
      abi: AITASK_ABI,
      functionName: 'createTask',
      args: [description, deadline],
      value: bountyWei,
    });
  };

  // Accept task function
  const acceptTask = async (taskId: bigint, deposit: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const depositWei = parseEther(deposit);
    
    return writeContract({
      address: AITASK_CONTRACT_ADDRESS,
      abi: AITASK_ABI,
      functionName: 'acceptTask',
      args: [taskId],
      value: depositWei,
    });
  };

  // Get task details - returns a function that can be used with useReadContract
  const getTask = (taskId: bigint) => ({
    address: AITASK_CONTRACT_ADDRESS,
    abi: AITASK_ABI,
    functionName: 'getTask' as const,
    args: [taskId] as const,
  });

  // Calculate required deposit - returns a function that can be used with useReadContract
  const calculateRequiredDeposit = (bounty: string) => {
    const bountyWei = parseEther(bounty);
    return {
      address: AITASK_CONTRACT_ADDRESS,
      abi: AITASK_ABI,
      functionName: 'calculateRequiredDeposit' as const,
      args: [bountyWei] as const,
    };
  };

  return {
    // Read data
    nextTaskId,
    totalTasks,
    activeTasks,
    maxBounty,
    config,
    
    // Write functions
    createTask,
    acceptTask,
    getTask,
    calculateRequiredDeposit,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    
    // Account state
    address,
    isConnected,
    
    // Helper functions
    getTaskStatusText,
    formatBounty,
    formatDeadline,
  };
} 