# SuiGym Deployment Guide

This guide covers deploying SuiGym to different environments.

## 🏗️ Prerequisites

- **Node.js** (v18+)
- **Sui CLI** installed and configured
- **Sui Wallet** with test/real SUI tokens
- **Git** for version control

## 🔧 Environment Setup

### 1. Install Dependencies

```bash
# Frontend dependencies
cd frontend
npm install

# Verify Sui CLI
sui --version
```

### 2. Configure Networks

Update `/shared/config.ts` with your target network:

```typescript
export const APP_CONFIG = {
  // Change this for different deployments
  CURRENT_NETWORK: 'DEVNET' // or 'TESTNET' or 'MAINNET'
} as const;
```

## 🚀 Smart Contract Deployment

### Devnet Deployment

```bash
cd backend

# Build contracts
sui move build

# Get test SUI
sui client faucet

# Deploy to devnet
sui client publish --gas-budget 100000000

# Note the Package ID from output
```

### Testnet Deployment

```bash
# Switch to testnet
sui client switch --env testnet

# Get testnet SUI
sui client faucet

# Deploy
sui client publish --gas-budget 100000000
```

### Mainnet Deployment

```bash
# Switch to mainnet
sui client switch --env mainnet

# Ensure you have real SUI tokens
sui client gas

# Deploy (higher gas budget for mainnet)
sui client publish --gas-budget 200000000
```

## 📝 Update Configuration

After deployment, update the contract address:

```typescript
// In /shared/config.ts
export const CONTRACT_CONFIG = {
  PACKAGE_ID: {
    DEVNET: '0x7b603192a53667f46adb07eb24501217bb8e64763709117c30e9b85db1e7355e',
    TESTNET: '0xYOUR_TESTNET_PACKAGE_ID', // Add your testnet package ID
    MAINNET: '0xYOUR_MAINNET_PACKAGE_ID', // Add your mainnet package ID
  },
  // ...
} as const;
```

## 🌐 Frontend Deployment

### Local Development

```bash
cd frontend
npm run dev
```

### Production Build

```bash
cd frontend
npm run build
```

### Deploy to Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   cd frontend
   vercel
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`

### Deploy to Netlify

1. **Build and Deploy**
   ```bash
   cd frontend
   npm run build
   
   # Install Netlify CLI
   npm i -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

### Deploy to GitHub Pages

1. **Setup GitHub Actions**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '18'
         - name: Install and Build
           run: |
             cd frontend
             npm install
             npm run build
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/dist
   ```

## 🔍 Verification

### Smart Contract Verification

```bash
# Check deployed package
sui client object <PACKAGE_ID>

# Test contract functions
sui client call --package <PACKAGE_ID> --module wellness --function create_profile --args "TestUser" --gas-budget 10000000
```

### Frontend Verification

1. **Connect Wallet** to the deployed app
2. **Create Profile** to test smart contract integration
3. **Log Workout** to verify transaction flow
4. **Check NFT Minting** for achievement system

## 🛠️ Troubleshooting

### Common Issues

**Gas Budget Too Low**
```bash
# Increase gas budget
sui client publish --gas-budget 200000000
```

**Network Mismatch**
- Ensure wallet and CLI are on the same network
- Check `/shared/config.ts` network setting

**Build Errors**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Contract Not Found**
- Verify Package ID in `/shared/config.ts`
- Ensure contract is deployed to correct network

### Getting Help

- **Sui Discord**: https://discord.gg/sui
- **Sui Documentation**: https://docs.sui.io
- **GitHub Issues**: Create issue in repository

## 📊 Monitoring

### Track Deployments

- **Devnet Explorer**: https://suiexplorer.com/?network=devnet
- **Testnet Explorer**: https://suiexplorer.com/?network=testnet  
- **Mainnet Explorer**: https://suiexplorer.com/?network=mainnet

### Analytics

Consider adding:
- **User analytics** (Mixpanel, Google Analytics)
- **Error tracking** (Sentry)
- **Performance monitoring** (Web Vitals)

## 🔄 Updates

### Smart Contract Updates

```bash
# Build new version
sui move build

# Upgrade contract (if upgrade capability exists)
sui client call --package <PACKAGE_ID> --module <MODULE> --function upgrade --args <UPGRADE_CAP> <NEW_PACKAGE>
```

### Frontend Updates

```bash
# Update and redeploy
cd frontend
git pull
npm install
npm run build
# Deploy using your chosen platform
```