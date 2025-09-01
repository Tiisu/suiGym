import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, Star, Trophy, Flame } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  photo: string
  quote: string
  achievement: string
  nftsEarned: number
  streakDays: number
  location: string
  gradient: string
}

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Amara Okafor",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      quote: "SuiGym completely transformed my fitness journey! Earning NFTs for my workouts made every session feel like an epic quest. I've never been more motivated to stay consistent.",
      achievement: "Legendary Streak Master",
      nftsEarned: 23,
      streakDays: 127,
      location: "Lagos, Nigeria",
      bgColor: "bg-sui-green-500"
    },
    {
      id: 2,
      name: "Kwame Asante",
      photo: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      quote: "The gamification aspect is incredible! I went from working out twice a week to daily sessions. My rare NFT collection is now my pride and joy, and I'm in the best shape of my life.",
      achievement: "Weight Loss Champion",
      nftsEarned: 31,
      streakDays: 89,
      location: "Accra, Ghana",
      bgColor: "bg-sui-orange-500"
    },
    {
      id: 3,
      name: "Zara Mwangi",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      quote: "As someone who struggled with consistency, SuiGym's NFT rewards system was a game-changer. Each achievement feels like a real accomplishment that I can actually own and show off!",
      achievement: "Consistency Queen",
      nftsEarned: 18,
      streakDays: 156,
      location: "Nairobi, Kenya",
      bgColor: "bg-sui-purple-500"
    },
    {
      id: 4,
      name: "Thabo Molefe",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      quote: "The blockchain aspect adds real value to my fitness achievements. My NFTs represent months of hard work, and knowing they're permanently stored on-chain makes them feel truly special.",
      achievement: "Blockchain Fitness Pioneer",
      nftsEarned: 42,
      streakDays: 203,
      location: "Cape Town, South Africa",
      bgColor: "bg-sui-cyan-500"
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from real SuiGym users who transformed their fitness journey into an epic NFT quest
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden border-0 shadow-2xl bg-white">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left Column - User Photo and Stats */}
                  <div className="p-12 flex flex-col items-center justify-center bg-gray-50 relative">
                    <div className="text-center">
                      {/* User Photo */}
                      <div className="relative mb-8">
                        <img 
                          src={currentTestimonial.photo}
                          alt={currentTestimonial.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-xl mx-auto"
                        />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-sui-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* User Info */}
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{currentTestimonial.name}</h3>
                      <p className="text-gray-600 mb-6">{currentTestimonial.location}</p>
                      
                      {/* Achievement Badge */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
                        <div className="text-sm font-medium text-gray-600 mb-1">Achievement</div>
                        <div className="font-bold text-sui-green-600">{currentTestimonial.achievement}</div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
                          <div className="text-2xl font-bold text-sui-purple-600">{currentTestimonial.nftsEarned}</div>
                          <div className="text-sm text-gray-600">NFTs Earned</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
                          <div className="text-2xl font-bold flex items-center justify-center text-sui-orange-600">
                            <Flame className="h-5 w-5 mr-1" />
                            {currentTestimonial.streakDays}
                          </div>
                          <div className="text-sm text-gray-600">Day Streak</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Testimonial Content */}
                  <div className="p-12 flex flex-col justify-center">
                    <div className="relative">
                      {/* Quote Icon */}
                      <Quote className="h-12 w-12 text-sui-green-300 mb-6" />
                      
                      {/* Quote Text */}
                      <blockquote className="text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed mb-8">
                        "{currentTestimonial.quote}"
                      </blockquote>

                      {/* Star Rating */}
                      <div className="flex items-center space-x-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 fill-sui-orange-400 text-sui-orange-400" />
                        ))}
                        <span className="ml-2 text-gray-600 font-medium">5.0 out of 5</span>
                      </div>

                      {/* User Attribution */}
                      <div className="border-l-4 border-sui-green-400 pl-4">
                        <div className="font-bold text-gray-800">{currentTestimonial.name}</div>
                        <div className="text-gray-600">SuiGym User Since 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-6">
          {/* Previous Button */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border-2 border-sui-green-200 hover:bg-sui-green-50 hover:border-sui-green-400 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-sui-green-500 w-8'
                    : 'bg-gray-300 hover:bg-sui-green-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border-2 border-sui-green-200 hover:bg-sui-green-50 hover:border-sui-green-400 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-gray-500 hover:text-sui-green-600 transition-colors"
          >
            {isAutoPlaying ? '⏸️ Pause auto-play' : '▶️ Resume auto-play'}
          </button>
        </div>
      </div>
    </section>
  )
}