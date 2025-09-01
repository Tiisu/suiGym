import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Flame, 
  Target, 
  TrendingDown, 
  Calendar,
  Plus,
  Trophy,
  Zap,
  Weight
} from "lucide-react"
import { useState } from "react"

interface DashboardProps {
  profile?: {
    username: string
    streak: number
    total_logs: number
    weight_lost: number
    current_weight?: number
    starting_weight?: number
    total_nfts: number
    longest_streak: number
  }
  onLogWorkout: () => void
  onUpdateWeight: (weight: number) => void
}

export function Dashboard({ profile, onLogWorkout, onUpdateWeight }: DashboardProps) {
  const [newWeight, setNewWeight] = useState("")

  const handleWeightUpdate = () => {
    if (newWeight && !isNaN(Number(newWeight))) {
      onUpdateWeight(Number(newWeight))
      setNewWeight("")
    }
  }

  const mockProfile = profile || {
    username: "FitnessWarrior",
    streak: 12,
    total_logs: 45,
    weight_lost: 2500, // in grams
    current_weight: 72500,
    starting_weight: 75000,
    total_nfts: 8,
    longest_streak: 18
  }

  const progressToNextMilestone = (mockProfile.total_logs % 10) * 10
  const nextMilestone = Math.ceil(mockProfile.total_logs / 10) * 10

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, <span className="text-sui-green-600">{mockProfile.username}</span>
              </h1>
              <p className="text-gray-600 mt-1">Ready to crush today's workout?</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-sui-green-600">{mockProfile.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-sui-purple-600">{mockProfile.total_nfts}</div>
                <div className="text-sm text-gray-600">NFTs Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Stats Cards */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Streak</p>
                  <p className="text-3xl font-bold text-sui-orange-600">{mockProfile.streak}</p>
                  <p className="text-sm text-gray-500">days</p>
                </div>
                <div className="w-12 h-12 bg-sui-orange-50 rounded-lg flex items-center justify-center">
                  <Flame className="h-6 w-6 text-sui-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Workouts</p>
                  <p className="text-3xl font-bold text-sui-blue-600">{mockProfile.total_logs}</p>
                  <p className="text-sm text-gray-500">sessions</p>
                </div>
                <div className="w-12 h-12 bg-sui-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-sui-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">NFTs Earned</p>
                  <p className="text-3xl font-bold text-sui-purple-600">{mockProfile.total_nfts}</p>
                  <p className="text-sm text-gray-500">achievements</p>
                </div>
                <div className="w-12 h-12 bg-sui-purple-50 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-sui-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Weight Lost</p>
                  <p className="text-3xl font-bold text-sui-green-600">{(mockProfile.weight_lost / 1000).toFixed(1)}</p>
                  <p className="text-sm text-gray-500">kg</p>
                </div>
                <div className="w-12 h-12 bg-sui-green-50 rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-sui-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="bg-sui-green-500 text-white text-xl font-bold">
                      {mockProfile.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{mockProfile.username}</h3>
                  <p className="text-gray-600 mb-4">Fitness Enthusiast</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{mockProfile.longest_streak}</div>
                      <div className="text-xs text-gray-600">Best Streak</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">
                        {mockProfile.starting_weight ? (mockProfile.starting_weight / 1000).toFixed(1) : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600">Start Weight</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Log Workout */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sui-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-sui-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Log Today's Workout</h3>
                  <p className="text-gray-600 text-sm mb-6">Keep your streak alive and earn achievements!</p>
                  <Button 
                    onClick={onLogWorkout}
                    className="w-full bg-sui-orange-500 hover:bg-sui-orange-600 text-white font-semibold py-3"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Log Workout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weight Tracking */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Tracking</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {mockProfile.starting_weight ? (mockProfile.starting_weight / 1000).toFixed(1) : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600">Starting (kg)</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {mockProfile.current_weight ? (mockProfile.current_weight / 1000).toFixed(1) : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600">Current (kg)</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleWeightUpdate} variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Progress & Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Next Milestone */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Next Milestone</h3>
                  <Trophy className="h-5 w-5 text-sui-cyan-500" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {nextMilestone - mockProfile.total_logs} workouts until your next achievement
                </p>
                <Progress value={progressToNextMilestone} className="mb-3" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{mockProfile.total_logs}</span>
                  <span>{nextMilestone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-sui-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Workout logged</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-sui-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Earned "Week Warrior" NFT</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-sui-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Weight updated</div>
                      <div className="text-xs text-gray-500">3 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}