import { Card } from "@/components/ui/card"
import { Users, Heart, Zap, Target } from "lucide-react"

export function GymGallerySection() {
  const gymImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "People working out with weights",
      title: "Strength Training",
      description: "Build muscle and earn Epic NFTs"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
      alt: "Person running on treadmill",
      title: "Cardio Workouts",
      description: "Boost endurance and unlock achievements"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Group fitness class",
      title: "Group Classes",
      description: "Train together and compete for rare NFTs"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Person doing yoga",
      title: "Flexibility & Recovery",
      description: "Balance your routine and earn wellness badges"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Person doing push-ups",
      title: "Bodyweight Training",
      description: "No equipment needed, just dedication"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Person celebrating workout completion",
      title: "Achievement Unlocked",
      description: "Every milestone deserves recognition"
    }
  ]

  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Active Members",
      color: "text-sui-green-600"
    },
    {
      icon: Heart,
      value: "500K+",
      label: "Workouts Completed",
      color: "text-sui-orange-600"
    },
    {
      icon: Zap,
      value: "1.2M+",
      label: "NFTs Earned",
      color: "text-sui-purple-600"
    },
    {
      icon: Target,
      value: "95%",
      label: "Goals Achieved",
      color: "text-sui-cyan-600"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sui-orange-600 to-sui-purple-600 bg-clip-text text-transparent">
              Join the Fitness Revolution
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how thousands of fitness enthusiasts are transforming their workouts into epic NFT quests. 
            Every rep counts, every milestone matters.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Gym Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gymImages.map((image, index) => (
            <Card 
              key={image.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating achievement badge */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-white text-lg">
                    {index % 5 === 0 ? '🏆' : index % 4 === 0 ? '💎' : index % 3 === 0 ? '🥇' : index % 2 === 0 ? '🥈' : '🥉'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-sui-green-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {image.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sui-green-500 to-sui-cyan-500 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Your Fitness Journey?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of fitness enthusiasts earning NFT achievements on the blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sui-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                Start Your Quest
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}