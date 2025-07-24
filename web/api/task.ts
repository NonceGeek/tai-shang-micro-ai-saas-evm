import { getApiBaseUrl } from '@/lib/utils';
import type { TaskListResponse, TaskDetail } from '@/types/task';

// Mock data toggle - set to true to use mock data
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA;

// Mock task data
const mockTasks: TaskDetail[] = [
  {
    id: '1',
    onchainTaskId: 'task_001',
    creatorAddress: '0x1234567890abcdef1234567890abcdef12345678',
    agentAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_001',
      bounty: '0.5 ETH',
      description: 'Develop a smart contract for decentralized voting system',
      requiredSkills: ['Solidity', 'Web3.js', 'React'],
      deadline: '2024-12-31T23:59:59Z'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    agent: {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      name: 'AI Agent Alpha',
      creditScore: 95
    }
  },
  {
    id: '2',
    onchainTaskId: 'task_002',
    creatorAddress: '0x2345678901bcdef2345678901bcdef2345678901',
    agentAddress: '0xbcdef1234567890abcdef1234567890abcdef123',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_002',
      bounty: '0.3 ETH',
      description: 'Create an AI-powered chatbot for customer support',
      requiredSkills: ['Python', 'NLP', 'FastAPI'],
      deadline: '2024-12-25T23:59:59Z'
    },
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-16T09:00:00Z'
  },
  {
    id: '3',
    onchainTaskId: 'task_003',
    creatorAddress: '0x3456789012cdef3456789012cdef3456789012',
    agentAddress: '0xcdef1234567890abcdef1234567890abcdef1234',
    status: 'COMPLETED',
    details: {
      taskId: 'TASK_003',
      bounty: '0.8 ETH',
      description: 'Build a DeFi yield farming dashboard with real-time data',
      requiredSkills: ['TypeScript', 'Ethers.js', 'Chart.js'],
      deadline: '2024-12-20T23:59:59Z'
    },
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    results: {
      url: 'https://defi-dashboard.example.com',
      description: 'Successfully deployed DeFi dashboard with yield farming analytics'
    },
    agent: {
      address: '0xcdef1234567890abcdef1234567890abcdef1234',
      name: 'AI Agent Beta',
      creditScore: 88
    }
  },
  {
    id: '4',
    onchainTaskId: 'task_004',
    creatorAddress: '0x4567890123def4567890123def4567890123def',
    agentAddress: '0xdef1234567890abcdef1234567890abcdef12345',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_004',
      bounty: '0.6 ETH',
      description: 'Implement cross-chain bridge for ERC-20 tokens',
      requiredSkills: ['Rust', 'Substrate', 'Polkadot'],
      deadline: '2024-12-28T23:59:59Z'
    },
    createdAt: '2024-01-17T11:00:00Z',
    updatedAt: '2024-01-19T13:20:00Z',
    agent: {
      address: '0xdef1234567890abcdef1234567890abcdef12345',
      name: 'AI Agent Gamma',
      creditScore: 92
    }
  },
  {
    id: '5',
    onchainTaskId: 'task_005',
    creatorAddress: '0x5678901234ef5678901234ef5678901234ef567',
    agentAddress: '0xef1234567890abcdef1234567890abcdef123456',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_005',
      bounty: '0.4 ETH',
      description: 'Design and develop NFT marketplace with royalty system',
      requiredSkills: ['Next.js', 'IPFS', 'MetaMask'],
      deadline: '2024-12-30T23:59:59Z'
    },
    createdAt: '2024-01-18T15:00:00Z',
    updatedAt: '2024-01-18T15:00:00Z'
  },
  {
    id: '6',
    onchainTaskId: 'task_006',
    creatorAddress: '0x6789012345f6789012345f6789012345f678901',
    agentAddress: '0xf1234567890abcdef1234567890abcdef1234567',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_006',
      bounty: '0.7 ETH',
      description: 'Create automated trading bot for DEX arbitrage',
      requiredSkills: ['Python', 'Web3.py', 'Pandas'],
      deadline: '2024-12-27T23:59:59Z'
    },
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    agent: {
      address: '0xf1234567890abcdef1234567890abcdef1234567',
      name: 'AI Agent Delta',
      creditScore: 97
    }
  },
  {
    id: '7',
    onchainTaskId: 'task_007',
    creatorAddress: '0x7890123456f7890123456f7890123456f789012',
    agentAddress: '0xf2345678901abcdef1234567890abcdef12345678',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_007',
      bounty: '0.2 ETH',
      description: 'Build social media sentiment analysis tool',
      requiredSkills: ['Python', 'TensorFlow', 'Twitter API'],
      deadline: '2024-12-22T23:59:59Z'
    },
    createdAt: '2024-01-19T14:00:00Z',
    updatedAt: '2024-01-19T14:00:00Z'
  },
  {
    id: '8',
    onchainTaskId: 'task_008',
    creatorAddress: '0x8901234567f8901234567f8901234567f890123',
    agentAddress: '0xf3456789012abcdef1234567890abcdef123456789',
    status: 'COMPLETED',
    details: {
      taskId: 'TASK_008',
      bounty: '0.9 ETH',
      description: 'Develop zero-knowledge proof system for privacy',
      requiredSkills: ['C++', 'Cryptography', 'Circom'],
      deadline: '2024-12-15T23:59:59Z'
    },
    createdAt: '2024-01-05T07:00:00Z',
    updatedAt: '2024-01-17T18:30:00Z',
    results: {
      url: 'https://zk-proof-system.example.com',
      description: 'Successfully implemented ZK proof system with privacy features'
    },
    agent: {
      address: '0xf3456789012abcdef1234567890abcdef123456789',
      name: 'AI Agent Epsilon',
      creditScore: 99
    }
  },
  {
    id: '9',
    onchainTaskId: 'task_009',
    creatorAddress: '0x9012345678f9012345678f9012345678f901234',
    agentAddress: '0xf4567890123abcdef1234567890abcdef1234567890',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_009',
      bounty: '0.5 ETH',
      description: 'Create DAO governance dashboard with proposal system',
      requiredSkills: ['React', 'Ethers.js', 'GraphQL'],
      deadline: '2024-12-29T23:59:59Z'
    },
    createdAt: '2024-01-16T13:00:00Z',
    updatedAt: '2024-01-20T09:45:00Z',
    agent: {
      address: '0xf4567890123abcdef1234567890abcdef1234567890',
      name: 'AI Agent Zeta',
      creditScore: 91
    }
  },
  {
    id: '10',
    onchainTaskId: 'task_010',
    creatorAddress: '0xa0123456789fa0123456789fa0123456789fa012',
    agentAddress: '0xf5678901234abcdef1234567890abcdef12345678901',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_010',
      bounty: '0.3 ETH',
      description: 'Build real-time data streaming pipeline for blockchain events',
      requiredSkills: ['Kafka', 'Node.js', 'WebSocket'],
      deadline: '2024-12-26T23:59:59Z'
    },
    createdAt: '2024-01-20T16:00:00Z',
    updatedAt: '2024-01-20T16:00:00Z'
  },
  // 添加更多任务以支持分页
  {
    id: '11',
    onchainTaskId: 'task_011',
    creatorAddress: '0xb1234567890fb1234567890fb1234567890fb123',
    agentAddress: '0xf6789012345abcdef1234567890abcdef123456789012',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_011',
      bounty: '0.4 ETH',
      description: 'Develop machine learning model for price prediction',
      requiredSkills: ['Python', 'Scikit-learn', 'TensorFlow'],
      deadline: '2024-12-24T23:59:59Z'
    },
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-20T11:30:00Z',
    agent: {
      address: '0xf6789012345abcdef1234567890abcdef123456789012',
      name: 'AI Agent Theta',
      creditScore: 94
    }
  },
  {
    id: '12',
    onchainTaskId: 'task_012',
    creatorAddress: '0xc2345678901fc2345678901fc2345678901fc234',
    agentAddress: '0xf7890123456abcdef1234567890abcdef1234567890123',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_012',
      bounty: '0.6 ETH',
      description: 'Create decentralized identity verification system',
      requiredSkills: ['Solidity', 'IPFS', 'DID'],
      deadline: '2024-12-23T23:59:59Z'
    },
    createdAt: '2024-01-20T12:00:00Z',
    updatedAt: '2024-01-20T12:00:00Z'
  },
  {
    id: '13',
    onchainTaskId: 'task_013',
    creatorAddress: '0xd3456789012fd3456789012fd3456789012fd345',
    agentAddress: '0xf8901234567abcdef1234567890abcdef12345678901234',
    status: 'COMPLETED',
    details: {
      taskId: 'TASK_013',
      bounty: '0.8 ETH',
      description: 'Build automated smart contract testing framework',
      requiredSkills: ['JavaScript', 'Hardhat', 'Chai'],
      deadline: '2024-12-18T23:59:59Z'
    },
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-19T15:20:00Z',
    results: {
      url: 'https://smart-contract-testing.example.com',
      description: 'Successfully deployed comprehensive testing framework'
    },
    agent: {
      address: '0xf8901234567abcdef1234567890abcdef12345678901234',
      name: 'AI Agent Iota',
      creditScore: 96
    }
  },
  {
    id: '14',
    onchainTaskId: 'task_014',
    creatorAddress: '0xe4567890123fe4567890123fe4567890123fe456',
    agentAddress: '0xf9012345678abcdef1234567890abcdef123456789012345',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_014',
      bounty: '0.5 ETH',
      description: 'Develop blockchain-based supply chain tracking',
      requiredSkills: ['Hyperledger', 'Go', 'Docker'],
      deadline: '2024-12-21T23:59:59Z'
    },
    createdAt: '2024-01-18T14:00:00Z',
    updatedAt: '2024-01-20T08:45:00Z',
    agent: {
      address: '0xf9012345678abcdef1234567890abcdef123456789012345',
      name: 'AI Agent Kappa',
      creditScore: 89
    }
  },
  {
    id: '15',
    onchainTaskId: 'task_015',
    creatorAddress: '0xf5678901234ff5678901234ff5678901234ff567',
    agentAddress: '0xfa123456789abcdef1234567890abcdef1234567890123456',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_015',
      bounty: '0.3 ETH',
      description: 'Create AI-powered content moderation system',
      requiredSkills: ['Python', 'OpenAI API', 'FastAPI'],
      deadline: '2024-12-19T23:59:59Z'
    },
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-20T09:00:00Z'
  },
  {
    id: '16',
    onchainTaskId: 'task_016',
    creatorAddress: '0xf6789012345ff6789012345ff6789012345ff678',
    agentAddress: '0xfb2345678901abcdef1234567890abcdef12345678901234567',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_016',
      bounty: '0.7 ETH',
      description: 'Build decentralized file storage with encryption',
      requiredSkills: ['Rust', 'IPFS', 'AES'],
      deadline: '2024-12-16T23:59:59Z'
    },
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-20T12:15:00Z',
    agent: {
      address: '0xfb2345678901abcdef1234567890abcdef12345678901234567',
      name: 'AI Agent Lambda',
      creditScore: 93
    }
  },
  {
    id: '17',
    onchainTaskId: 'task_017',
    creatorAddress: '0xf7890123456ff7890123456ff7890123456ff789',
    agentAddress: '0xfc3456789012abcdef1234567890abcdef123456789012345678',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_017',
      bounty: '0.4 ETH',
      description: 'Develop real-time collaboration platform',
      requiredSkills: ['WebRTC', 'Socket.io', 'React'],
      deadline: '2024-12-17T23:59:59Z'
    },
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-01-20T13:00:00Z'
  },
  {
    id: '18',
    onchainTaskId: 'task_018',
    creatorAddress: '0xf8901234567ff8901234567ff8901234567ff890',
    agentAddress: '0xfd4567890123abcdef1234567890abcdef1234567890123456789',
    status: 'COMPLETED',
    details: {
      taskId: 'TASK_018',
      bounty: '0.9 ETH',
      description: 'Create blockchain-based voting system',
      requiredSkills: ['Solidity', 'Web3.js', 'Vue.js'],
      deadline: '2024-12-14T23:59:59Z'
    },
    createdAt: '2024-01-08T06:00:00Z',
    updatedAt: '2024-01-18T17:30:00Z',
    results: {
      url: 'https://blockchain-voting.example.com',
      description: 'Successfully deployed secure voting system'
    },
    agent: {
      address: '0xfd4567890123abcdef1234567890abcdef1234567890123456789',
      name: 'AI Agent Mu',
      creditScore: 98
    }
  },
  {
    id: '19',
    onchainTaskId: 'task_019',
    creatorAddress: '0xf9012345678ff9012345678ff9012345678ff901',
    agentAddress: '0xfe5678901234abcdef1234567890abcdef12345678901234567890',
    status: 'IN_PROGRESS',
    details: {
      taskId: 'TASK_019',
      bounty: '0.6 ETH',
      description: 'Build AI-powered recommendation engine',
      requiredSkills: ['Python', 'Pandas', 'Scikit-learn'],
      deadline: '2024-12-13T23:59:59Z'
    },
    createdAt: '2024-01-17T16:00:00Z',
    updatedAt: '2024-01-20T07:30:00Z',
    agent: {
      address: '0xfe5678901234abcdef1234567890abcdef12345678901234567890',
      name: 'AI Agent Nu',
      creditScore: 90
    }
  },
  {
    id: '20',
    onchainTaskId: 'task_020',
    creatorAddress: '0xfa1234567890ffa1234567890ffa1234567890ffa',
    agentAddress: '0xff6789012345abcdef1234567890abcdef123456789012345678901',
    status: 'PENDING_MATCH',
    details: {
      taskId: 'TASK_020',
      bounty: '0.3 ETH',
      description: 'Develop mobile app for crypto portfolio tracking',
      requiredSkills: ['React Native', 'Redux', 'CoinGecko API'],
      deadline: '2024-12-12T23:59:59Z'
    },
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z'
  }
];

export async function fetchTasks(params?: {
  page?: number;
  limit?: number;
  status?: string;
  skillTag?: string;
}): Promise<TaskListResponse> {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredTasks = [...mockTasks];
    
    // Apply filters if provided
    if (params?.status) {
      filteredTasks = filteredTasks.filter(task => task.status === params.status);
    }
    
    if (params?.skillTag) {
      filteredTasks = filteredTasks.filter(task => 
        task.details.requiredSkills.some(skill => 
          skill.toLowerCase().includes(params.skillTag!.toLowerCase())
        )
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
    
    return {
      tasks: paginatedTasks,
      pagination: {
        page,
        limit,
        total: filteredTasks.length
      }
    };
  }

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
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    
    return task;
  }

  const url = `${getApiBaseUrl()}/api/tasks/${taskId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
} 