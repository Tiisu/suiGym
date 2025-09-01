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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-sui-green-600 to-sui-cyan-600 bg-clip-text text-transparent">
            Welcome back, {mockProfile.username}!
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Ready to crush today's workout?</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="bg-gradient-to-br from-sui-green-50 to-sui-cyan-50 border-sui-green-200">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-sui-green-200">
                <AvatarImage src="/api/placeholder/80/80" />
                <AvatarFallback className="bg-sui-green-500 text-white text-xl font-bold">
                  {mockProfile.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl text-sui-green-700">{mockProfile.username}</CardTitle>
              <CardDescription className="text-sui-green-600">
                Fitness Enthusiast
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-2xl font-bold text-sui-green-600">{mockProfile.total_nfts}</div>
                  <div className="text-sm text-sui-green-700">NFTs Earned</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-2xl font-bold text-sui-cyan-600">{mockProfile.longest_streak}</div>
                  <div className="text-sm text-sui-cyan-700">Best Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-sui-purple-500" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-sui-orange-500" />
                  <span className="text-sm font-medium">Current Streak</span>
                </div>
                <span className="text-lg font-bold text-sui-orange-600">{mockProfile.streak} days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-sui-blue-500" />
                  <span className="text-sm font-medium">Total Workouts</span>
                </div>
                <span className="text-lg font-bold text-sui-blue-600">{mockProfile.total_logs}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-sui-green-500" />
                  <span className="text-sm font-medium">Weight Lost</span>
                </div>
                <span className="text-lg font-bold text-sui-green-600">
                  {(mockProfile.weight_lost / 1000).toFixed(1)} kg
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Log Workout */}
          <Card className="bg-gradient-to-br from-sui-orange-50 to-sui-orange-100 border-sui-orange-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-sui-orange-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-sui-orange-700">Log Today's Workout</CardTitle>
              <CardDescription className="text-sui-orange-600">
                Keep your streak alive and earn achievements!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={onLogWorkout}
                className="w-full bg-sui-orange-500 hover:bg-sui-orange-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="mr-2 h-5 w-5" />
                Log Workout
              </Button>
            </CardContent>
          </Card>

          {/* Weight Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Weight className="h-5 w-5 text-sui-purple-500" />
                <span>Weight Tracking</span>
              </CardTitle>
              <CardDescription>
                Update your current weight to track progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-700">
                    {mockProfile.starting_weight ? (mockProfile.starting_weight / 1000).toFixed(1) : 'N/A'} kg
                  </div>
                  <div className="text-sm text-gray-600">Starting</div>
                </div>
                <div className="bg-sui-green-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-sui-green-600">
                    {mockProfile.current_weight ? (mockProfile.current_weight / 1000).toFixed(1) : 'N/A'} kg
                  </div>
                  <div className="text-sm text-sui-green-700">Current</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter weight (kg)"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleWeightUpdate} variant="secondary">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress to Next Milestone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-sui-cyan-500" />
                <span>Next Milestone</span>
              </CardTitle>
              <CardDescription>
                {nextMilestone - mockProfile.total_logs} workouts until your next achievement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressToNextMilestone} className="mb-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{mockProfile.total_logs} workouts</span>
                <span>{nextMilestone} workouts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recent Activity & Tips */}
        <div className="lg:col-span-1 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest fitness achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-sui-green-50 rounded-lg">
                <div className="w-2 h-2 bg-sui-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Workout logged</div>
                  <div className="text-xs text-gray-600">2 hours ago</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-sui-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-sui-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Earned "Week Warrior" NFT</div>
                  <div className="text-xs text-gray-600">1 day ago</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-sui-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-sui-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Weight updated</div>
                  <div className="text-xs text-gray-600">3 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivation Card */}
          <Card className="bg-gradient-to-br from-sui-purple-50 to-sui-blue-50 border-sui-purple-200">
            <CardHeader>
              <CardTitle className="text-sui-purple-700">💪 Daily Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sui-purple-600 italic">
                "The only bad workout is the one that didn't happen. Keep pushing forward!"
              </p>
              <div className="mt-4 text-sm text-sui-purple-500">
                You're doing amazing! 🌟
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}