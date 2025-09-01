import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Shield, Gem, Target, Zap, TrendingUp } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Gamepad2,
      title: "Gamified Wellness",
      description: "Transform your fitness routine into an engaging game with streaks, achievements, and rewards that keep you motivated every day.",
      gradient: "feature-gradient-1",
      iconColor: "text-sui-orange-100",
      textColor: "text-white"
    },
    {
      icon: Shield,
      title: "Blockchain Tracking",
      description: "All your progress is securely stored on the Sui blockchain, ensuring your achievements are permanent and verifiable.",
      gradient: "feature-gradient-2", 
      iconColor: "text-sui-blue-100",
      textColor: "text-white"
    },
    {
      icon: Gem,
      title: "Collectible NFTs",
      description: "Earn unique, rare NFT achievements that showcase your fitness milestones and can be traded or displayed with pride.",
      gradient: "feature-gradient-3",
      iconColor: "text-sui-purple-100", 
      textColor: "text-white"
    }
  ]

  const stats = [
    {
      icon: Target,
      value: "10,000+",
      label: "Workouts Logged",
      color: "text-sui-green-600"
    },
    {
      icon: Zap,
      value: "500+",
      label: "NFTs Minted",
      color: "text-sui-orange-600"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "User Retention",
      color: "text-sui-purple-600"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sui-green-600 to-sui-purple-600 bg-clip-text text-transparent">
              Why Choose SuiGym?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of fitness tracking with blockchain technology, 
            gamification, and NFT rewards that make every workout count.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`${feature.gradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group`}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <CardTitle className={`text-2xl font-bold ${feature.textColor}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`text-center ${feature.textColor} opacity-90 leading-relaxed`}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Join the Fitness Revolution
            </h3>
            <p className="text-gray-600 text-lg">
              Thousands of users are already transforming their fitness journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}