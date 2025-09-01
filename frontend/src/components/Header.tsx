import { Button } from "@/components/ui/button"
import { Dumbbell, User, Trophy, BarChart3 } from "lucide-react"

interface HeaderProps {
  isConnected: boolean
  onConnectWallet: () => void
  currentSection: string
  onSectionChange: (section: string) => void
}

export function Header({ isConnected, onConnectWallet, currentSection, onSectionChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sui-green-500">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">
            SuiGym
          </span>
        </div>

        {/* Navigation */}
        {isConnected && (
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onSectionChange('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentSection === 'dashboard'
                  ? 'bg-sui-green-100 text-sui-green-700'
                  : 'text-gray-600 hover:text-sui-green-600'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onSectionChange('achievements')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentSection === 'achievements'
                  ? 'bg-sui-purple-100 text-sui-purple-700'
                  : 'text-gray-600 hover:text-sui-purple-600'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Achievements</span>
            </button>
            <button
              onClick={() => onSectionChange('profile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentSection === 'profile'
                  ? 'bg-sui-blue-100 text-sui-blue-700'
                  : 'text-gray-600 hover:text-sui-blue-600'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </nav>
        )}

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {!isConnected ? (
            <>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button onClick={onConnectWallet} size="sm">
                Connect Wallet
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-sui-green-50 rounded-lg">
                <div className="w-2 h-2 bg-sui-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-sui-green-700">Connected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}