import { Button } from "@/components/ui/button"
import { Zap, Trophy, Coins, TrendingUp } from "lucide-react"

interface HeroSectionProps {
  onStartQuest: () => void
}

export function HeroSection({ onStartQuest }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-sui-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-sui-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-sui-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
                Transform Your Fitness
                <br />
                <span className="text-sui-green-600">
                  Into an Epic NFT Quest
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Track workouts, crush goals, and earn unique NFT achievements on the Sui blockchain. 
                Turn every rep into rewards and every milestone into a masterpiece.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                <Zap className="h-5 w-5 text-sui-orange-500" />
                <span className="font-semibold text-gray-700">Gamified Workouts</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                <Trophy className="h-5 w-5 text-sui-purple-500" />
                <span className="font-semibold text-gray-700">NFT Achievements</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                <Coins className="h-5 w-5 text-sui-cyan-500" />
                <span className="font-semibold text-gray-700">Blockchain Rewards</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onStartQuest} 
                size="xl" 
                className="bg-sui-green-500 hover:bg-sui-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Your Quest
              </Button>
              <Button variant="outline" size="xl" className="border-2 border-gray-300 hover:bg-gray-50">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right content - Visual */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Today's Progress</h3>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-5 w-5 text-sui-green-500" />
                    <span className="text-sui-green-600 font-semibold">+15%</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Workout Streak</span>
                    <span className="text-2xl font-bold text-sui-green-600">12 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-sui-green-500 to-sui-cyan-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sui-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-sui-orange-600">8</div>
                    <div className="text-sm text-sui-orange-700">NFTs Earned</div>
                  </div>
                  <div className="bg-sui-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-sui-purple-600">2.5kg</div>
                    <div className="text-sm text-sui-purple-700">Weight Lost</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-sui-green-400 to-sui-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating achievement badges */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-sui-orange-400 to-sui-orange-600 rounded-full flex items-center justify-center shadow-lg animate-float">
              <span className="text-white text-xl">🥉</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-sui-purple-400 to-sui-purple-600 rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-white text-xl">💎</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}