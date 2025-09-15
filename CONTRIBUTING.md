# 🤝 Contributing to SuiGym

Thank you for your interest in contributing to SuiGym! We welcome contributions from developers of all skill levels.

## 🚀 Quick Start for Contributors

### 1. Development Setup
```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/suigym.git
cd suigym
npm run install:all
npm run dev
```

### 2. Make Your Changes
```bash
git checkout -b feature/your-amazing-feature
# Make your changes...
npm run lint        # Check code style
npm run test       # Run tests (when available)
```

### 3. Submit Pull Request
```bash
git commit -m "Add: your amazing feature description"
git push origin feature/your-amazing-feature
# Create PR on GitHub
```

## 🎯 Good First Issues

Perfect for newcomers to the project:

### 🎨 **Frontend (Easy)**
- [ ] Add loading animations for NFT minting
- [ ] Improve mobile responsiveness on workout logger
- [ ] Add dark mode toggle
- [ ] Create achievement notification toasts
- [ ] Improve error messages and user feedback

### ⛓️ **Blockchain (Medium)**
- [ ] Add unit tests for smart contracts
- [ ] Optimize gas usage in achievement minting
- [ ] Add weight tracking validation
- [ ] Create achievement dependency system

### 📱 **UX/UI (Easy-Medium)**
- [ ] Design new achievement NFT artwork
- [ ] Create progress visualization charts
- [ ] Add achievement sharing functionality
- [ ] Improve onboarding flow for Web3 newcomers

## 🛠️ Development Guidelines

### Code Style
- **Frontend**: We use ESLint + Prettier (configured)
- **Smart Contracts**: Follow Move best practices
- **Commits**: Use conventional commits (`feat:`, `fix:`, `docs:`)

### Testing
```bash
# Frontend tests (coming soon)
cd frontend && npm test

# Smart contract tests
cd backend && sui move test
```

### File Structure
```
src/components/
├── ui/           # Reusable UI components
├── features/     # Feature-specific components
└── pages/        # Page components

backend/sources/
└── suigym.move   # Main smart contract
```

## 🎯 Feature Requests & Ideas

### High Priority
- [ ] **Mobile PWA**: Make it work great on phones
- [ ] **Achievement Marketplace**: Trade/sell achievements
- [ ] **Social Features**: Friend system, leaderboards
- [ ] **Wearable Integration**: Apple Health, Google Fit

### Medium Priority  
- [ ] **Custom Goals**: Let users set personal targets
- [ ] **Workout Details**: Track exercise types, reps, weights
- [ ] **Progress Photos**: Before/after transformations
- [ ] **Community Challenges**: Group competitions

### Long Term
- [ ] **Mobile App**: React Native version
- [ ] **AI Coach**: Workout recommendations
- [ ] **Gym Partnerships**: Real-world integrations
- [ ] **Cross-Chain**: Multi-blockchain support

## 🏆 Contributor Recognition

We believe in recognizing our contributors:

- **GitHub Profile**: Contributors get mentioned in releases
- **Discord Role**: Special contributor role in our Discord
- **NFT Rewards**: Top contributors get exclusive SuiGym NFTs
- **Mentorship**: We help newcomers learn Web3 development

## 📋 Issue Templates

### Bug Report
- **What happened?** Clear description
- **Steps to reproduce** 
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment** (browser, wallet, network)

### Feature Request
- **Problem** you're trying to solve
- **Proposed solution**
- **Alternative solutions** considered
- **Additional context**

## 🔍 Code Review Process

1. **Automated Checks**: ESLint, build tests must pass
2. **Manual Review**: Core team reviews within 48 hours
3. **Testing**: Feature tested on testnet
4. **Approval**: 1 approval required for merge
5. **Deploy**: Changes deployed to staging first

## 🌍 Community Guidelines

- **Be Respectful**: We're all here to learn and build
- **Stay On Topic**: Keep discussions relevant to SuiGym
- **Help Others**: Share knowledge and assist newcomers
- **Have Fun**: We're building something awesome together!

## 📞 Getting Help

- **Discord**: #dev-help channel *(coming soon)*
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general chat
- **Email**: dev@suigym.io for private matters

## 🎉 Thank You!

Every contribution, no matter how small, helps make SuiGym better for the entire fitness and Web3 community. We appreciate your time and effort!

---

**Ready to contribute?** Check out our [good first issues](https://github.com/yourusername/suigym/labels/good%20first%20issue) and let's build the future of fitness together! 💪