import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, Star, Flame, Target, Weight, Zap } from "lucide-react"
import { ACHIEVEMENT_CONFIG } from "../../../shared/config"

interface NFT {
  id: string
  name: string
  description: string
  achievement_type: 'streak' | 'milestone' | 'weight_loss' | 'special'
  rarity: 1 | 2 | 3 | 4 | 5
  earned_date: number
  image_url?: string
}

interface NFTGalleryProps {
  nfts?: NFT[]
}

export function NFTGallery({ nfts }: NFTGalleryProps) {
  // Mock NFTs for demonstration
  const mockNFTs: NFT[] = nfts || [
    {
      id: "1",
      name: "First Steps",
      description: "Completed your first workout",
      achievement_type: "milestone",
      rarity: 1,
      earned_date: Date.now() - 86400000 * 10,
    },
    {
      id: "2", 
      name: "Week Warrior",
      description: "Maintained a 7-day workout streak",
      achievement_type: "streak",
      rarity: 2,
      earned_date: Date.now() - 86400000 * 5,
    },
    {
      id: "3",
      name: "Weight Crusher",
      description: "Lost 2kg of body weight",
      achievement_type: "weight_loss", 
      rarity: 3,
      earned_date: Date.now() - 86400000 * 3,
    },
    {
      id: "4",
      name: "Dedication Master",
      description: "Completed 50 total workouts",
      achievement_type: "milestone",
      rarity: 4,
      earned_date: Date.now() - 86400000 * 1,
    },
    {
      id: "5",
      name: "Legendary Streak",
      description: "Achieved a 30-day workout streak",
      achievement_type: "streak",
      rarity: 5,
      earned_date: Date.now() - 86400000 * 2,
    },
    {
      id: "6",
      name: "New Year Champion",
      description: "Special achievement for New Year commitment",
      achievement_type: "special",
      rarity: 4,
      earned_date: Date.now() - 86400000 * 7,
    }
  ]

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'streak': return Flame
      case 'milestone': return Target
      case 'weight_loss': return Weight
      case 'special': return Star
      default: return Trophy
    }
  }

  const getRarityConfig = (rarity: number) => {
    return ACHIEVEMENT_CONFIG.RARITY_COLORS[rarity as keyof typeof ACHIEVEMENT_CONFIG.RARITY_COLORS]
  }

  const getRarityClass = (rarity: number) => {
    switch (rarity) {
      case 1: return 'rarity-common'
      case 2: return 'rarity-rare'
      case 3: return 'rarity-epic'
      case 4: return 'rarity-legendary'
      case 5: return 'rarity-mythic'
      default: return 'rarity-common'
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const groupedNFTs = mockNFTs.reduce((acc, nft) => {
    if (!acc[nft.rarity]) {
      acc[nft.rarity] = []
    }
    acc[nft.rarity].push(nft)
    return acc
  }, {} as Record<number, NFT[]>)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-sui-purple-600 to-sui-orange-600 bg-clip-text text-transparent">
            Your NFT Collection
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Showcase your fitness achievements and rare collectibles
        </p>
      </div>

      {/* Collection Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-sui-green-50 to-sui-green-100 border-sui-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sui-green-600">{mockNFTs.length}</div>
            <div className="text-sm text-sui-green-700">Total NFTs</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-sui-orange-50 to-sui-orange-100 border-sui-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sui-orange-600">
              {mockNFTs.filter(nft => nft.rarity >= 4).length}
            </div>
            <div className="text-sm text-sui-orange-700">Rare & Above</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-sui-purple-50 to-sui-purple-100 border-sui-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sui-purple-600">
              {new Set(mockNFTs.map(nft => nft.achievement_type)).size}
            </div>
            <div className="text-sm text-sui-purple-700">Categories</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-sui-cyan-50 to-sui-cyan-100 border-sui-cyan-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sui-cyan-600">
              {Math.max(...mockNFTs.map(nft => nft.rarity))}
            </div>
            <div className="text-sm text-sui-cyan-700">Highest Rarity</div>
          </CardContent>
        </Card>
      </div>

      {/* NFT Grid by Rarity */}
      {Object.entries(groupedNFTs)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([rarity, nfts]) => {
          const rarityConfig = getRarityConfig(Number(rarity))
          return (
            <div key={rarity} className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{rarityConfig.emoji}</span>
                  <h2 className="text-2xl font-bold" style={{ color: rarityConfig.color }}>
                    {rarityConfig.name}
                  </h2>
                </div>
                <Badge variant="outline" style={{ borderColor: rarityConfig.color, color: rarityConfig.color }}>
                  {nfts.length} NFT{nfts.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nfts.map((nft) => {
                  const Icon = getAchievementIcon(nft.achievement_type)
                  const rarityClass = getRarityClass(nft.rarity)
                  
                  return (
                    <Card 
                      key={nft.id} 
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      {/* NFT Image/Icon */}
                      <div className={`${rarityClass} p-6 text-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                          <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-white font-bold text-lg mb-2">{nft.name}</div>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-white/90 text-2xl">{rarityConfig.emoji}</span>
                            <span className="text-white/90 text-sm font-medium">{rarityConfig.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* NFT Details */}
                      <CardContent className="p-4">
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {nft.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(nft.earned_date)}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {nft.achievement_type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}

      {/* Empty State */}
      {mockNFTs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Trophy className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No NFTs Yet</h3>
          <p className="text-gray-500 mb-6">Start working out to earn your first achievement NFT!</p>
          <Card className="max-w-md mx-auto bg-gradient-to-br from-sui-green-50 to-sui-cyan-50 border-sui-green-200">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-sui-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-sui-green-700 mb-2">Ready to Start?</h4>
              <p className="text-sm text-sui-green-600">Log your first workout to earn the "First Steps" NFT!</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}