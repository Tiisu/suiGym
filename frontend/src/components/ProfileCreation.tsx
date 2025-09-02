import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Weight } from "lucide-react"

interface ProfileCreationProps {
  onCreateProfile: (username: string, startingWeight?: number) => void
  isLoading?: boolean
}

export function ProfileCreation({ onCreateProfile, isLoading = false }: ProfileCreationProps) {
  const [username, setUsername] = useState("")
  const [startingWeight, setStartingWeight] = useState("")
  const [errors, setErrors] = useState<{ username?: string; weight?: string }>({})

  const validateForm = () => {
    const newErrors: { username?: string; weight?: string } = {}
    
    if (!username.trim()) {
      newErrors.username = "Username is required"
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    } else if (username.length > 20) {
      newErrors.username = "Username must be less than 20 characters"
    }

    if (startingWeight && (isNaN(Number(startingWeight)) || Number(startingWeight) <= 0 || Number(startingWeight) > 500)) {
      newErrors.weight = "Please enter a valid weight between 1-500 kg"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const weight = startingWeight ? Number(startingWeight) : undefined
    onCreateProfile(username.trim(), weight)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Profile</h1>
            <p className="text-gray-600">
              Welcome to SuiGym! Let's set up your fitness journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={errors.username ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Starting Weight (kg) - Optional
              </label>
              <div className="relative">
                <Input
                  id="weight"
                  type="number"
                  value={startingWeight}
                  onChange={(e) => setStartingWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className={errors.weight ? "border-red-500" : ""}
                  disabled={isLoading}
                  min="1"
                  max="500"
                  step="0.1"
                />
                <Weight className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              {errors.weight && (
                <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                This helps track your weight loss progress
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating Profile...</span>
                </div>
              ) : (
                "Create Profile & Start Journey"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>🎯 What happens next?</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Your profile will be created on the Sui blockchain</li>
              <li>• You can start logging workouts and earning NFT achievements</li>
              <li>• Track your fitness progress with blockchain transparency</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}