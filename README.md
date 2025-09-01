# 🏋️‍♂️ SuiGym - NFT Achievement Fitness Tracker

> Transform your fitness journey into a collectible achievement game on the Sui blockchain

SuiGym is a gamified fitness tracking dApp that rewards your workout consistency with unique, verifiable NFT achievements. Turn your weight loss and bodybuilding goals into an epic quest where every workout brings you closer to earning rare digital trophies.

## ✨ Features

### 🎮 **Gamified Fitness Tracking**
- 🏋️‍♂️ **Daily Workout Logging**: Quick and easy workout tracking
- 🔥 **Streak System**: Build and maintain workout streaks with visual progress
- 📊 **Progress Analytics**: Track weight loss, measurements, and fitness statistics
- 🎯 **Goal Setting**: Set and achieve personalized fitness milestones

### 🏆 **NFT Achievement System**
- 🔥 **Streak Achievements**: Earn fire-themed NFTs for consecutive workout days
- 💪 **Milestone Rewards**: Trophy NFTs for total workout milestones
- ⚖️ **Transformation Badges**: Special NFTs for weight loss achievements
- 🎯 **Special Achievements**: Unique NFTs for consistency, timing, and comeback stories
- 🌟 **Rarity System**: Common to Mythic rarities with increasing visual complexity

### 🔐 **Web3 Benefits**
- **Verifiable Progress**: Immutable workout records on Sui blockchain
- **True Ownership**: Your achievements are yours forever
- **Social Proof**: Share verifiable fitness accomplishments
- **Cross-Platform**: Take your achievements anywhere
- **Motivation**: Real stakes and rewards for consistency

## 🏆 Achievement Categories

### 🔥 Streak Achievements (Fire Theme)
| Achievement | Requirement | Rarity |
|-------------|-------------|---------|
| First Flame | 3 day streak | Common |
| Week Warrior | 7 day streak | Common |
| Fortnight Fighter | 14 day streak | Rare |
| Month Master | 30 day streak | Rare |
| Quarter Champion | 90 day streak | Epic |
| Year Legend | 365 day streak | Legendary |
| Unstoppable Force | 500 day streak | Mythic |

### 💪 Milestone Achievements (Trophy Theme)
| Achievement | Requirement | Rarity |
|-------------|-------------|---------|
| First Steps | 1st workout | Common |
| Getting Started | 10 workouts | Common |
| Gym Regular | 50 workouts | Rare |
| Fitness Fanatic | 100 workouts | Epic |
| Iron Will | 250 workouts | Legendary |
| Legendary Lifter | 500 workouts | Mythic |

### ⚖️ Weight Loss Achievements (Transformation Theme)
| Achievement | Requirement | Rarity |
|-------------|-------------|---------|
| First Victory | 1kg lost | Common |
| Making Progress | 3kg lost | Rare |
| Halfway Hero | 5kg lost | Epic |
| Major Milestone | 10kg lost | Legendary |
| Transformation Complete | 15kg+ lost | Mythic |

### 🎯 Special Achievements (Unique Designs)
- 🎯 **Comeback Kid**: Return after 30+ day break
- 🎯 **Weekend Warrior**: 10 weekend workouts
- 🎯 **Early Bird**: 20 morning workouts (before 8am)
- 🎯 **Night Owl**: 20 evening workouts (after 8pm)
- 🎯 **Consistency King**: Never miss >2 days in a month
- 🎯 **New Year, New Me**: Start streak on January 1st

## 🛠️ Tech Stack

### Frontend
- [React 18](https://react.dev/) - Modern UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better DX
- [Vite](https://vitejs.dev/) - Lightning fast build tooling
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Radix Themes](https://www.radix-ui.com/themes) - Beautiful design system

### Blockchain
- [Sui Move](https://docs.sui.io/concepts/sui-move-concepts) - Smart contract language
- [`@mysten/dapp-kit`](https://sdk.mystenlabs.com/dapp-kit) - Sui wallet integration
- [`@mysten/sui`](https://sdk.mystenlabs.com/typescript) - Sui TypeScript SDK

### Development
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [ESLint](https://eslint.org/) - Code linting and formatting
- [Prettier](https://prettier.io/) - Code formatting

## 📁 Project Structure

```
suiGym/
├── frontend/          # React frontend application
├── backend/           # Smart contracts (Sui Move)
├── shared/            # Shared configuration and types
├── docs/              # Documentation
└── README.md          # This file
```

See [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) for detailed information.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) installed
- [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil) browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/suigym.git
   cd suigym
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

5. **Connect your wallet**
   - Install Sui Wallet extension
   - Create/import wallet
   - Connect to the app

### Smart Contract Development

```bash
# Build contracts
cd backend
sui move build

# Run tests
sui move test

# Deploy to devnet
sui client publish --gas-budget 100000000
```

### Building for Production

```bash
# Build the frontend
cd frontend
npm run build

# Preview the build
npm run preview
```

## 🔗 Smart Contract

### Deployed Contract (Sui Devnet)
- **Package ID**: `0x10f36d0810078c762513dfe9c8b8485d90dcb0bd4e727ee72018e4fb3e27278d`
- **Module**: `wellness`

### Core Functions

```move
// Create a new fitness profile
entry fun create_profile(username: String, ctx: &mut TxContext)

// Log a daily workout (auto-checks for achievements)
entry fun log_workout(profile: &mut Profile, clock: &Clock, ctx: &mut TxContext)

// View profile statistics
public fun get_profile_data(profile: &Profile): (String, u64, u64, Option<u64>)

// Mint achievement NFT (called automatically)
entry fun mint_achievement_nft(
    achievement_type: String,
    profile: &Profile,
    ctx: &mut TxContext
)
```

### Data Structures

```move
public struct Profile has key, store {
    id: UID,
    owner: address,
    username: String,
    streak: u64,
    total_logs: u64,
    last_log_day: Option<u64>,
    achievements_earned: vector<String>,
    weight_lost: u64,  // in grams
}

public struct AchievementNFT has key, store {
    id: UID,
    name: String,
    description: String,
    image_url: String,
    achievement_date: u64,
    rarity: String,
    user_stats_snapshot: UserStats,
}
```

## 💰 Economics

### User Costs
- **Workout Logging**: Free (no gas fees for logging)
- **NFT Minting**: ~$1-3 per achievement (Sui gas fees)
- **Profile Creation**: ~$1-2 (one-time setup)

### How It Works
1. Log workouts for free in the app
2. When you hit a milestone, smart contract automatically mints NFT
3. You pay small gas fee (~$1-3) to receive your achievement
4. NFT is permanently yours in your wallet

## 🎯 Roadmap

### Phase 1: Core MVP ✅
- [x] Basic workout logging
- [x] Streak calculation
- [x] Profile creation
- [x] Wallet integration
- [ ] 10 basic achievement NFTs
- [ ] Simple achievement UI

### Phase 2: Enhanced Features 🚧
- [ ] Weight/measurement tracking
- [ ] Enhanced NFT artwork and animations
- [ ] Progress charts and analytics
- [ ] Achievement notifications
- [ ] Mobile-responsive design

### Phase 3: Social & Advanced 📋
- [ ] Friend connections and leaderboards
- [ ] Custom goal setting
- [ ] Achievement marketplace
- [ ] Mobile app (React Native)
- [ ] Wearable device integration
- [ ] Gym partnership integrations

### Phase 4: Advanced Web3 🔮
- [ ] Achievement staking system
- [ ] Community governance (DAO)
- [ ] Cross-chain compatibility
- [ ] Real-world reward partnerships
- [ ] AI-powered workout recommendations

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Sui Foundation](https://sui.io/) for the amazing blockchain platform
- [Mysten Labs](https://mystenlabs.com/) for excellent developer tools
- [Radix UI](https://www.radix-ui.com/) for beautiful, accessible components
- The fitness community for inspiration and motivation

## 📞 Support

- 📧 Email: support@suigym.com
- 🐦 Twitter: [@SuiGymApp](https://twitter.com/SuiGymApp)
- 💬 Discord: [SuiGym Community](https://discord.gg/suigym)
- 📖 Documentation: [docs.suigym.com](https://docs.suigym.com)

---

**Ready to transform your fitness journey? Connect your wallet and start earning achievements today! 💪🔥**

*"Your fitness journey, verified on-chain, rewarded with NFTs."*
