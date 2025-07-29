# AITask Contract Integration Setup

This guide explains how to set up the AITask smart contract integration for the web application.

## Prerequisites

1. Deploy the AITask contract to Metis Sepolia testnet
2. Get a WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

## Environment Variables

Create a `.env.local` file in the `web` directory with the following variables:

```env
# WalletConnect Project ID (required for AppKit)
NEXT_PUBLIC_WALLET_PROJECT_ID=your_walletconnect_project_id_here

# AITask Contract Address on Metis Sepolia (deploy the contract and update this)
NEXT_PUBLIC_AITASK_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# Use mock data for development (set to 'true' to use mock data)
NEXT_PUBLIC_USE_MOCK_DATA=false
```

## Contract Deployment

1. Navigate to the `contract` directory
2. Deploy the AITask contract to Metis Sepolia:

```bash
cd contract
forge script script/Deploy.s.sol:DeployScript --rpc-url https://sepolia.metis.io --private-key YOUR_PRIVATE_KEY --broadcast
```

3. Update the `NEXT_PUBLIC_AITASK_CONTRACT_ADDRESS` in your `.env.local` file with the deployed contract address

## Features

The integration includes:

- **Create Task**: Users can create new tasks with description, bounty, and deadline
- **Smart Contract Integration**: All task operations are performed on-chain
- **Wallet Connection**: Uses AppKit for seamless wallet integration
- **Transaction Status**: Real-time feedback on transaction status
- **Validation**: Client-side validation for task parameters

## Usage

1. Connect your wallet using the AppKit button in the header
2. Navigate to the Tasks page
3. Click "Create Task" button
4. Fill in the task details and submit
5. Confirm the transaction in your wallet
6. Wait for transaction confirmation

## Contract Functions

The integration supports the following contract functions:

- `createTask(description, deadline)` - Create a new task
- `acceptTask(taskId)` - Accept an existing task
- `confirmTask(taskId)` - Confirm task completion
- `rejectTask(taskId)` - Reject task result
- `submitResult(taskId, resultHash)` - Submit task result
- `reclaimExpiredTask(taskId)` - Reclaim expired task

## Network Configuration

The application is configured to use Metis Sepolia testnet by default. To change networks, update the configuration in `config/index.tsx`. 