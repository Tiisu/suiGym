// Shared configuration for SuiGym frontend and backend

export const NETWORK_CONFIG = {
  DEVNET: {
    name: 'devnet',
    rpcUrl: 'https://fullnode.devnet.sui.io:443',
    faucetUrl: 'https://faucet.devnet.sui.io/gas',
  },
  TESTNET: {
    name: 'testnet', 
    rpcUrl: 'https://fullnode.testnet.sui.io:443',
    faucetUrl: 'https://faucet.testnet.sui.io/gas',
  },
  MAINNET: {
    name: 'mainnet',
    rpcUrl: 'https://fullnode.mainnet.sui.io:443',
    faucetUrl: null, // No faucet on mainnet
  }
} as const;

export const CONTRACT_CONFIG = {
  // Update this when deploying to different networks
  PACKAGE_ID: {
    DEVNET: '0x7b603192a53667f46adb07eb24501217bb8e64763709117c30e9b85db1e7355e',
    TESTNET: '', // To be filled when deployed
    MAINNET: '', // To be filled when deployed
  },
  MODULE_NAME: 'wellness',
  CLOCK_OBJECT_ID: '0x6',
} as const;

export const ACHIEVEMENT_CONFIG = {
  RARITY_LEVELS: {
    COMMON: 1,
    RARE: 2, 
    EPIC: 3,
    LEGENDARY: 4,
    MYTHIC: 5,
  },
  RARITY_COLORS: {
    1: { name: "Common", color: "#8B7355", emoji: "🥉", gradient: "linear-gradient(135deg, #8B7355 0%, #A0845C 100%)" },
    2: { name: "Rare", color: "#4A90E2", emoji: "🥈", gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)" },
    3: { name: "Epic", color: "#9B59B6", emoji: "🥇", gradient: "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)" },
    4: { name: "Legendary", color: "#F39C12", emoji: "💎", gradient: "linear-gradient(135deg, #F39C12 0%, #E67E22 100%)" },
    5: { name: "Mythic", color: "#E74C3C", emoji: "👑", gradient: "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)" },
  }
} as const;

export const APP_CONFIG = {
  NAME: 'SuiGym',
  DESCRIPTION: 'Transform your fitness journey into an epic NFT quest',
  VERSION: '1.0.0',
  CURRENT_NETWORK: 'DEVNET' as keyof typeof NETWORK_CONFIG,
} as const;