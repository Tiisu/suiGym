# SuiGym Frontend

A bright, modern React frontend for the SuiGym fitness NFT application.

## Features

- 🎨 **Bright, Modern Design** - Inspired by Catlog's vibrant aesthetic
- 🏋️‍♂️ **Gamified Fitness Tracking** - Turn workouts into an epic quest
- 🏆 **NFT Achievement System** - Earn collectible NFTs for milestones
- ⚡ **Sui Blockchain Integration** - Built for the Sui ecosystem
- 📱 **Responsive Design** - Works beautifully on all devices

## Design System

### Color Palette
- **Primary Green**: `#22c55e` - Main brand color for CTAs
- **Cyan**: `#06b6d4` - Secondary actions and highlights  
- **Orange**: `#f97316` - Energy and motivation
- **Purple**: `#a855f7` - Premium features and achievements
- **Blue**: `#3b82f6` - Information and stats

### Components
- Built with **Radix UI** for accessibility
- **Tailwind CSS** for styling
- Custom gradient backgrounds for different sections
- Animated elements with hover effects
- Responsive grid layouts

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Header.tsx    # Navigation header
│   ├── HeroSection.tsx       # Landing page hero
│   ├── FeaturesSection.tsx   # Feature showcase
│   ├── Dashboard.tsx         # User dashboard
│   ├── NFTGallery.tsx       # Achievement collection
│   └── Footer.tsx           # Site footer
├── lib/
│   └── utils.ts     # Utility functions
├── App.tsx          # Main application
└── main.tsx         # Entry point
```

## Key Features

### 🏠 Hero Section
- Gradient background with floating animations
- Clear value proposition
- Prominent "Start Your Quest" CTA
- Visual progress mockup

### 📊 Dashboard
- Personal stats and progress tracking
- Workout logging interface
- Weight tracking with visual progress
- Recent activity feed
- Motivational elements

### 🏆 NFT Gallery
- Rarity-based organization (Common to Mythic)
- Beautiful gradient cards for each NFT
- Achievement type categorization
- Collection statistics

### 🎨 Design Highlights
- Bright, energetic color scheme
- Smooth animations and transitions
- Glassmorphism effects
- Gradient backgrounds
- Hover interactions
- Mobile-responsive layout

## Integration Ready

The frontend is designed to integrate with:
- **@mysten/dapp-kit** for Sui wallet connectivity
- **Sui Move smart contracts** for blockchain interactions
- **Shared types** from the `/shared` directory

## Development

The app uses modern React patterns:
- Functional components with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast development

Start the development server to see the bright, modern interface in action!