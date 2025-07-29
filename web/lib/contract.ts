import { parseAbi } from 'viem';

// AITask Contract ABI - extracted from the Solidity contract
export const AITASK_ABI = parseAbi([
  'function createTask(string description, uint256 deadline) external payable returns (uint256 taskId)',
  'function acceptTask(uint256 taskId) external payable',
  'function confirmTask(uint256 taskId) external',
  'function rejectTask(uint256 taskId) external',
  'function submitResult(uint256 taskId, string resultHash) external',
  'function reclaimExpiredTask(uint256 taskId) external',
  'function handleTimeout(uint256 taskId) external',
  'function handleExpiredTasks(uint256[] calldata taskIds) external',
  'function getTask(uint256 taskId) external view returns (uint256 taskId, address creator, address agent, uint256 bounty, uint256 deposit, uint256 createdAt, uint256 deadline, uint256 assignedAt, uint8 status, string description, string resultHash)',
  'function getTasksByCreator(address creator) external view returns (uint256[])',
  'function getTasksByAgent(address agent) external view returns (uint256[])',
  'function getOpenTasks() external view returns (uint256[])',
  'function getTaskCount() external view returns (uint256)',
  'function isTaskExpired(uint256 taskId) external view returns (bool)',
  'function isTaskTimedOut(uint256 taskId) external view returns (bool)',
  'function calculateRequiredDeposit(uint256 bounty) external view returns (uint256)',
  'function calculatePenalty(uint256 deposit) external view returns (uint256)',
  'function maxBounty() public view returns (uint256)',
  'function nextTaskId() external view returns (uint256)',
  'function totalTasks() external view returns (uint256)',
  'function activeTasks() external view returns (uint256)',
  'function completedTasks() external view returns (uint256)',
  'function platformFeesCollected() external view returns (uint256)',
  'function paused() external view returns (bool)',
  'function backend() external view returns (address)',
  'function config() external view returns (uint256 depositRate, uint256 penaltyRate, uint256 taskExpiry, uint256 completionDeadline, uint256 platformFee, uint256 minBounty, uint256 maxBounty)',
  'event TaskCreated(uint256 indexed taskId, address indexed creator, uint256 bounty, uint256 deadline, string description)',
  'event TaskAccepted(uint256 indexed taskId, address indexed agent, uint256 deposit)',
  'event TaskCompleted(uint256 indexed taskId, address indexed agent, uint256 bounty, uint256 platformFee)',
  'event TaskRejected(uint256 indexed taskId, address indexed agent, uint256 refund)',
  'event TaskReclaimed(uint256 indexed taskId, address indexed creator, uint256 bounty)',
  'event TaskExpired(uint256 indexed taskId, address indexed creator, uint256 bounty)',
  'event TaskTimeout(uint256 indexed taskId, address indexed agent, uint256 penalty)',
  'event TaskResultSubmitted(uint256 indexed taskId, address indexed agent, string resultHash)',
]);

// Contract address on Metis Sepolia (you'll need to deploy the contract and update this address)
export const AITASK_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_AITASK_CONTRACT_ADDRESS as `0x${string}`;

// Task status enum values
export const TASK_STATUS = {
  OPEN: 0,
  ASSIGNED: 1,
  COMPLETED: 2,
  REJECTED: 3,
  EXPIRED: 4,
  TIMED_OUT: 5,
} as const;

// Helper function to convert task status number to string
export function getTaskStatusText(status: number): string {
  switch (status) {
    case TASK_STATUS.OPEN:
      return 'Open';
    case TASK_STATUS.ASSIGNED:
      return 'Assigned';
    case TASK_STATUS.COMPLETED:
      return 'Completed';
    case TASK_STATUS.REJECTED:
      return 'Rejected';
    case TASK_STATUS.EXPIRED:
      return 'Expired';
    case TASK_STATUS.TIMED_OUT:
      return 'Timed Out';
    default:
      return 'Unknown';
  }
}

// Helper function to format bounty amount
export function formatBounty(bounty: bigint): string {
  const ethValue = Number(bounty) / 1e18;
  return `${ethValue.toFixed(4)} ETH`;
}

// Helper function to parse deadline timestamp
export function formatDeadline(deadline: bigint): string {
  const date = new Date(Number(deadline) * 1000);
  return date.toLocaleDateString();
} 