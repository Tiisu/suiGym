import { useState } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import { GymGallerySection } from './components/GymGallerySection'
import { TestimonialSection } from './components/TestimonialSection'
import { Dashboard } from './components/Dashboard'
import { NFTGallery } from './components/NFTGallery'
import { Footer } from './components/Footer'
import './index.css'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')
  const [userProfile, setUserProfile] = useState(null)

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true)
    setCurrentSection('dashboard')
    
    // Mock user profile
    setUserProfile({
      username: "FitnessWarrior",
      streak: 12,
      total_logs: 45,
      weight_lost: 2500,
      current_weight: 72500,
      starting_weight: 75000,
      total_nfts: 8,
      longest_streak: 18
    })
  }

  const handleStartQuest = () => {
    if (isConnected) {
      setCurrentSection('dashboard')
    } else {
      handleConnectWallet()
    }
  }

  const handleLogWorkout = () => {
    // Simulate logging a workout
    console.log('Workout logged!')
    // In a real app, this would call the smart contract
    alert('🎉 Workout logged successfully! Keep up the great work!')
  }

  const handleUpdateWeight = (weight: number) => {
    // Simulate weight update
    console.log('Weight updated to:', weight)
    // In a real app, this would call the smart contract
    alert(`✅ Weight updated to ${weight} kg!`)
  }

  const renderCurrentSection = () => {
    if (!isConnected) {
      return (
        <>
          <HeroSection onStartQuest={handleStartQuest} />
          <FeaturesSection />
          <GymGallerySection />
          <TestimonialSection />
        </>
      )
    }

    switch (currentSection) {
      case 'dashboard':
        return (
          <Dashboard 
            profile={userProfile}
            onLogWorkout={handleLogWorkout}
            onUpdateWeight={handleUpdateWeight}
          />
        )
      case 'achievements':
        return <NFTGallery />
      case 'profile':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-sui-blue-600 to-sui-purple-600 bg-clip-text text-transparent">
                  Profile Settings
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Profile management features coming soon!
              </p>
            </div>
          </div>
        )
      default:
        return (
          <Dashboard 
            profile={userProfile}
            onLogWorkout={handleLogWorkout}
            onUpdateWeight={handleUpdateWeight}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isConnected={isConnected}
        onConnectWallet={handleConnectWallet}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      
      <main>
        {renderCurrentSection()}
      </main>

      <Footer />
    </div>
  )
}

export default App