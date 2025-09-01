# SuiGym Project Structure

This document outlines the organized structure of the SuiGym project.

## 📁 Directory Structure

```
suiGym/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Frontend utilities
│   │   ├── App.tsx        # Main App component
│   │   ├── Home.tsx       # Home page component
│   │   ├── Profile.tsx    # Profile/Dashboard component
│   │   ├── main.tsx       # React entry point
│   │   └── networkConfig.ts # Sui network configuration
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── tsconfig.json      # TypeScript config
│   └── vite.config.mts    # Vite build config
│
├── backend/               # Smart contracts (Sui Move)
│   ├── sources/
│   │   └── suigym.move    # Main wellness smart contract
│   ├── tests/
│   │   └── suigym_tests.move # Smart contract tests
│   ├── Move.toml          # Move package configuration
│   └── .gitignore         # Backend gitignore
│
├── shared/                # Shared configuration and types
│   ├── config.ts          # Shared configuration constants
│   └── types.ts           # Shared TypeScript types
│
├── docs/                  # Documentation
│   ├── PROJECT_STRUCTURE.md # This file
│   ├── DEPLOYMENT.md      # Deployment instructions
│   └── API.md             # Smart contract API documentation
│
└── README.md              # Main project documentation
```

## 🎯 Key Components

### Frontend (`/frontend`)
- **React + TypeScript** application
- **Vite** for fast development and building
- **Radix UI** for beautiful, accessible components
- **@mysten/dapp-kit** for Sui blockchain integration

### Backend (`/backend`) 
- **Sui Move** smart contracts
- **Wellness module** with Profile and AchievementNFT structs
- **Comprehensive testing** suite

### Shared (`/shared`)
- **Configuration management** for different networks
- **TypeScript types** used across frontend and backend
- **Constants** for achievements, rarities, and contract addresses

## 🔧 Development Workflow

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Smart Contract Development
```bash
cd backend
sui move build
sui move test
sui client publish --gas-budget 100000000
```

### Shared Configuration
- Update `/shared/config.ts` when deploying to new networks
- Import shared types in both frontend and backend code
- Maintain consistency across the entire application

## 🚀 Deployment

### Smart Contracts
1. Build and test contracts in `/backend`
2. Deploy to desired network (devnet/testnet/mainnet)
3. Update contract addresses in `/shared/config.ts`

### Frontend
1. Update network configuration in `/shared/config.ts`
2. Build frontend: `cd frontend && npm run build`
3. Deploy to hosting platform (Vercel, Netlify, etc.)

## 📦 Package Management

Each directory has its own dependencies:
- **Frontend**: React ecosystem packages
- **Backend**: Sui Move dependencies (managed by Move.toml)
- **Shared**: TypeScript types and configurations

## 🔄 Configuration Management

The `/shared/config.ts` file centralizes:
- Network configurations (RPC URLs, faucets)
- Contract addresses for different networks
- Achievement configurations and rarity settings
- Application metadata

This ensures consistency and makes network switching seamless.