# 🏋️‍♂️ SuiGym - Deployment & Integration Guide

## Overview

SuiGym is now fully integrated with the Sui blockchain! The frontend connects to enhanced Move smart contracts that support detailed workout logging, NFT achievements, and comprehensive fitness tracking.

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js 18+** 
- **Sui CLI** installed and configured
- **Sui Wallet** browser extension

### 2. Install Sui CLI

```bash
# Download and install Sui CLI
curl -fLJO https://github.com/MystenLabs/sui/releases/latest/download/sui-ubuntu-x86_64.tgz
tar -xzf sui-ubuntu-x86_64.tgz
sudo mv sui /usr/local/bin/

# Verify installation
sui --version
```

### 3. Setup Sui Wallet

1. Install [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil) browser extension
2. Create a new wallet or import existing one
3. Switch to **Devnet** in wallet settings
4. Get test SUI tokens from faucet

### 4. Deploy Smart Contract

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

This will:
- Build the Move smart contract
- Deploy to Sui devnet
- Update the frontend configuration automatically

### 5. Start Frontend

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

## 🎯 Features Implemented

### Smart Contract Features

1. **Enhanced Profile System**
   - Username, weight tracking, streak management
   - Detailed workout history storage
   - Achievement tracking with NFT minting

2. **Detailed Workout Logging**
   - Exercise type selection (strength, cardio, flexibility)
   - Reps, sets, weight, and duration tracking
   - Workout notes and duration
   - Automatic achievement checking

3. **NFT Achievement System**
   - 5 rarity levels (Common to Mythic)
   - Multiple achievement types (streak, milestone, weight loss, special)
   - Automatic minting on achievement unlock
   - On-chain metadata storage

4. **Weight Management**
   - Starting weight recording
   - Current weight updates
   - Automatic weight loss calculation
   - Weight-based achievements

### Frontend Features

1. **Sui Wallet Integration**
   - Connect/disconnect wallet
   - Automatic profile detection
   - Transaction signing

2. **Enhanced Dashboard**
   - Real-time profile data from blockchain
   - Quick workout logging
   - Detailed workout logger with exercise selection
   - Weight tracking interface

3. **Workout Logger**
   - Exercise categorization (Strength, Cardio, Core, Flexibility)
   - Detailed exercise tracking (reps, sets, weight, distance)
   - Workout duration and notes
   - Simple and advanced modes

4. **Achievement System**
   - NFT gallery showing earned achievements
   - Rarity-based visual design
   - Achievement progress tracking

## 🔧 Technical Architecture

### Smart Contract Structure

```
backend/sources/suigym.move
├── Profile struct - User fitness profile
├── WorkoutEntry struct - Individual workout details  
├── Exercise struct - Exercise-specific data
├── AchievementNFT struct - NFT achievement tokens
└── Functions:
    ├── create_profile()
    ├── log_workout_detailed()
    ├── update_weight()
    └── Achievement checking & minting
```

### Frontend Integration

```
frontend/src/
├── hooks/useSuiGym.ts - Blockchain interaction hooks
├── lib/suiClient.ts - Sui client configuration
├── components/
│   ├── SuiProvider.tsx - Wallet provider wrapper
│   ├── WorkoutLogger.tsx - Detailed workout logging
│   └── Dashboard.tsx - Enhanced with blockchain data
```

## 🎮 How to Use

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Approve connection in Sui Wallet extension

### 2. Create Profile
- Enter username and optional starting weight
- Transaction will create your on-chain profile

### 3. Log Workouts

**Quick Log:**
- Click "Quick Log Workout" for simple logging
- Automatically records a general workout

**Detailed Log:**
- Click "Detailed Workout Log"
- Select exercises from categorized list
- Enter reps, sets, weight, duration
- Add optional notes

### 4. Track Progress
- View real-time stats from blockchain
- Monitor streak, total workouts, weight loss
- See earned NFT achievements

### 5. Earn NFTs
- Achievements automatically unlock based on:
  - Workout streaks (3, 7, 14, 30+ days)
  - Total workout milestones (1, 10, 50, 100+ workouts)
  - Weight loss goals (1, 3, 5, 10+ kg)
  - Special achievements (comeback after break)

## 🏆 Achievement System

### Streak Achievements
- **First Flame** (3 days) - Common
- **Week Warrior** (7 days) - Common  
- **Fortnight Fighter** (14 days) - Rare
- **Month Master** (30 days) - Rare
- **Quarter Champion** (90 days) - Epic
- **Year Legend** (365 days) - Legendary
- **Unstoppable Force** (500 days) - Mythic

### Milestone Achievements
- **First Steps** (1 workout) - Common
- **Getting Started** (10 workouts) - Common
- **Gym Regular** (50 workouts) - Rare
- **Fitness Fanatic** (100 workouts) - Epic
- **Iron Will** (250 workouts) - Legendary
- **Legendary Lifter** (500 workouts) - Mythic

### Weight Loss Achievements
- **First Victory** (1kg lost) - Common
- **Making Progress** (3kg lost) - Rare
- **Halfway Hero** (5kg lost) - Epic
- **Major Milestone** (10kg lost) - Legendary
- **Transformation Complete** (15kg+ lost) - Mythic

## 🛠️ Development

### Testing Smart Contract

```bash
cd backend
sui move test
```

### Building Frontend

```bash
cd frontend
npm run build
```

### Deployment to Other Networks

Update `shared/config.ts` with appropriate network settings:

```typescript
// For testnet deployment
sui client switch --env testnet
sui client publish --gas-budget 100000000
```

## 🔍 Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Ensure Sui Wallet extension is installed
   - Check you're on the correct network (devnet)
   - Try refreshing the page

2. **Transaction Failed**
   - Check gas balance: `sui client gas`
   - Get test tokens: `sui client faucet`
   - Ensure contract is deployed correctly

3. **Profile Not Loading**
   - Wait a few seconds after wallet connection
   - Check browser console for errors
   - Verify contract package ID in config

### Getting Help

- Check browser console for detailed error messages
- Verify Sui CLI setup: `sui client envs`
- Ensure you have test SUI tokens for transactions

## 🎉 Success!

Your SuiGym dApp is now fully functional with:
- ✅ Blockchain-powered fitness tracking
- ✅ Detailed workout logging with exercise types
- ✅ Automatic NFT achievement system
- ✅ Real-time progress monitoring
- ✅ Weight management features

Start your fitness NFT journey today! 🏋️‍♂️💎