import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Users, BookOpen, Keyboard, X } from "lucide-react"

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  onGoToAbout: () => void
}

export function WelcomeModal({ isOpen, onClose, onGoToAbout }: WelcomeModalProps) {
  const [showKeyboardHint, setShowKeyboardHint] = useState(false)
  const [showReminder, setShowReminder] = useState(false)

  const handleCloseAttempt = () => {
    setShowReminder(true)
    // Hide reminder after 3 seconds
    setTimeout(() => {
      setShowReminder(false)
    }, 3000)
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyPress = (event: KeyboardEvent) => {
      // Press Q to continue
      if (event.key.toLowerCase() === 'q' && !event.ctrlKey && !event.shiftKey) {
        event.preventDefault()
        onClose()
      }
      
      // Press Ctrl + Shift + Q to go to about page
      if (event.key.toLowerCase() === 'q' && event.ctrlKey && event.shiftKey) {
        event.preventDefault()
        onGoToAbout()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    
    // Show keyboard hint after 2 seconds
    const timer = setTimeout(() => {
      setShowKeyboardHint(true)
    }, 2000)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      clearTimeout(timer)
    }
  }, [isOpen, onClose, onGoToAbout])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl mx-auto bg-white border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-sui-green-500 to-sui-blue-500 p-6 text-white relative">
            <button
              onClick={handleCloseAttempt}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Reminder Message */}
            {showReminder && (
              <div className="absolute top-16 right-4 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg animate-bounce">
                <div className="text-sm font-bold">Please press Q to continue!</div>
              </div>
            )}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome to SuiGym! 🏋️‍♂️</h2>
                <p className="text-white text-opacity-90">A Team 7 Learning Project</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Project Info */}
            <div className="text-center">
              <div className="w-16 h-16 bg-sui-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-sui-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3-Day Developer Workshop Project
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
                This project was started by <strong>Team 7</strong> during the 3-day developer workshop 
                organized by <strong>Sui Ghana Network</strong> at <strong>Hackerboost</strong>. 
                SuiGym represents our journey into learning Move programming language and 
                Sui blockchain development.
              </p>
            </div>

            {/* Learning Focus */}
            <div className="bg-sui-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="h-5 w-5 text-sui-blue-600" />
                <h4 className="font-semibold text-sui-blue-900">Learning Objectives</h4>
              </div>
              <ul className="text-sui-blue-800 text-sm space-y-1">
                <li>• Master Move programming language fundamentals</li>
                <li>• Build real-world dApps on Sui blockchain</li>
                <li>• Integrate smart contracts with React frontend</li>
                <li>• Explore NFT and achievement systems</li>
              </ul>
            </div>


            {/* Keyboard Instructions - Prominent */}
            <div className="text-center pt-6 border-t border-gray-200">
              <div className={`rounded-lg p-6 mb-4 transition-all duration-300 ${
                showReminder ? 'bg-red-50 border-2 border-red-200' : 'bg-sui-green-50'
              }`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    showReminder ? 'text-red-700 animate-pulse' : 'text-sui-green-700'
                  }`}>
                    Press <kbd className={`px-4 py-2 text-white rounded-lg text-3xl font-bold mx-2 ${
                      showReminder ? 'bg-red-600' : 'bg-sui-green-600'
                    }`}>Q</kbd> to Continue
                  </div>
                  <p className={`text-sm ${
                    showReminder ? 'text-red-600' : 'text-sui-green-600'
                  }`}>
                    Or press <strong>Ctrl + Shift + Q</strong> to learn about the project
                  </p>
                  {showReminder && (
                    <p className="text-red-700 font-bold text-sm mt-2 animate-bounce">
                      ⚠️ You must use the keyboard to continue!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Built with ❤️ by Team 7 • Sui Ghana Network • Hackerboost Workshop
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}