import { useState, useEffect } from 'react'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import { GymGallerySection } from './components/GymGallerySection'
import { TestimonialSection } from './components/TestimonialSection'
import { AboutProjectPage } from './components/AboutProjectPage'
import { FAQSection } from './components/FAQSection'
import { Dashboard } from './components/Dashboard'
import { NFTGallery } from './components/NFTGallery'
import { Footer } from './components/Footer'
import { WalletSelector } from './components/WalletSelector'
import { useSuiGym } from './hooks/useSuiGym'
import './index.css'

function App() {
  const currentAccount = useCurrentAccount()
  const [currentSection, setCurrentSection] = useState('hero')
  const [showWalletSelector, setShowWalletSelector] = useState(false)
  const { 
    profile, 
    isLoading, 
    createProfile, 
    logWorkout, 
    updateWeight, 
    getUserProfile,
    isConnected 
  } = useSuiGym()

  // Load user profile when wallet connects
  useEffect(() => {
    if (currentAccount) {
      getUserProfile()
    }
  }, [currentAccount, getUserProfile])

  const handleConnectWallet = () => {
    setShowWalletSelector(true)
  }

  const handleWalletConnected = () => {
    setCurrentSection('dashboard')
  }

  const handleStartQuest = () => {
    if (isConnected && profile) {
      setCurrentSection('dashboard')
    } else if (isConnected && !profile) {
      // User is connected but doesn't have a profile yet
      setCurrentSection('dashboard') // This will show the profile creation form
    } else {
      handleConnectWallet()
    }
  }

  const handleCreateProfile = async (username: string, startingWeight?: number) => {
    if (!isConnected) {
      handleConnectWallet()
      return
    }

    try {
      await createProfile(username, startingWeight)
      alert('🎉 Profile created successfully! Welcome to SuiGym!')
      
      // Refresh profile data
      setTimeout(() => {
        getUserProfile()
        setCurrentSection('dashboard')
      }, 2000)
    } catch (error) {
      console.error('Failed to create profile:', error)
      alert('❌ Failed to create profile. Please try again.')
    }
  }

  const handleLogWorkout = async (workoutData?: any) => {
    if (!profile) {
      alert('Please create a profile first!')
      return
    }

    try {
      if (workoutData) {
        // Detailed workout logging
        await logWorkout(profile.id, workoutData)
      } else {
        // Simple workout logging (backward compatibility)
        await logWorkout(profile.id, {
          exercises: [{
            exerciseType: 'general_workout',
            repsOrDuration: 1,
            sets: 1
          }],
          durationMinutes: 30,
          notes: ''
        })
      }
      
      alert('🎉 Workout logged successfully! Keep up the great work!')
      
      // Refresh profile data
      setTimeout(() => {
        getUserProfile()
      }, 2000)
    } catch (error) {
      console.error('Failed to log workout:', error)
      alert('❌ Failed to log workout. Please try again.')
    }
  }

  const handleUpdateWeight = async (weight: number) => {
    if (!profile) {
      alert('Please create a profile first!')
      return
    }

    try {
      await updateWeight(profile.id, weight)
      alert(`✅ Weight updated to ${weight} kg!`)
      
      // Refresh profile data
      setTimeout(() => {
        getUserProfile()
      }, 2000)
    } catch (error) {
      console.error('Failed to update weight:', error)
      alert('❌ Failed to update weight. Please try again.')
    }
  }

  const renderCurrentSection = () => {
    // Handle About Project page first (available to all users)
    if (currentSection === 'about') {
      return <AboutProjectPage onBack={() => setCurrentSection('hero')} />
    }

    // Handle homepage for non-connected users
    if (!isConnected) {
      return (
        <>
          <HeroSection onStartQuest={handleStartQuest} />
          <FeaturesSection />
          <GymGallerySection />
          <TestimonialSection />
          <FAQSection />
        </>
      )
    }

    // Handle connected user sections
    switch (currentSection) {
      case 'dashboard':
        return (
          <Dashboard 
            profile={profile}
            onLogWorkout={handleLogWorkout}
            onUpdateWeight={handleUpdateWeight}
            onCreateProfile={handleCreateProfile}
            isLoading={isLoading}
          />
        )
      case 'achievements':
        return <NFTGallery />
      case 'profile':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-600 text-lg">
                Profile management features coming soon!
              </p>
            </div>
          </div>
        )
      case 'hero':
        return (
          <>
            <HeroSection onStartQuest={handleStartQuest} />
            <FeaturesSection />
            <GymGallerySection />
            <TestimonialSection />
            <FAQSection />
          </>
        )
      default:
        return (
          <Dashboard 
            profile={profile}
            onLogWorkout={handleLogWorkout}
            onUpdateWeight={handleUpdateWeight}
            onCreateProfile={handleCreateProfile}
            isLoading={isLoading}
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
      
      <WalletSelector
        isOpen={showWalletSelector}
        onClose={() => setShowWalletSelector(false)}
        onSuccess={handleWalletConnected}
      />
    </div>
  )
}

export default App