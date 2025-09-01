import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle, Zap, Shield, Coins } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: 'general' | 'nfts' | 'blockchain' | 'fitness'
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "What is SuiGym and how does it work?",
      answer: "SuiGym is a Web3 fitness application that gamifies your workout routine by turning achievements into collectible NFTs. You log workouts, track progress, and earn unique NFT rewards for hitting milestones like workout streaks, weight loss goals, and fitness achievements. All your progress is securely stored on the Sui blockchain.",
      category: 'general'
    },
    {
      id: 2,
      question: "How do I earn NFT achievements?",
      answer: "You earn NFTs by completing various fitness milestones: maintaining workout streaks (7, 14, 30+ days), reaching total workout counts (10, 25, 50+ sessions), achieving weight loss goals, and completing special challenges. Each NFT has different rarity levels from Common to Mythic based on the difficulty of the achievement.",
      category: 'nfts'
    },
    {
      id: 3,
      question: "What makes SuiGym NFTs valuable?",
      answer: "SuiGym NFTs represent real fitness achievements and are permanently stored on the Sui blockchain. They serve as proof of your dedication and progress, can be displayed in your profile, traded with other users, and some rare NFTs may unlock special features or rewards within the platform.",
      category: 'nfts'
    },
    {
      id: 4,
      question: "Do I need a crypto wallet to use SuiGym?",
      answer: "Yes, you'll need a Sui-compatible wallet to connect to SuiGym. We support popular wallets like Sui Wallet, Ethos Wallet, and others. Don't worry if you're new to crypto - we provide step-by-step guides to help you set up your wallet and get started safely.",
      category: 'blockchain'
    },
    {
      id: 5,
      question: "Is my fitness data secure on the blockchain?",
      answer: "Absolutely! Your fitness data is securely stored on the Sui blockchain, which provides transparency, immutability, and decentralization. Only you control your data, and it cannot be altered or deleted by third parties. We follow best practices for data privacy and security.",
      category: 'blockchain'
    },
    {
      id: 6,
      question: "What types of workouts can I track?",
      answer: "SuiGym supports all types of physical activities including gym workouts, running, cycling, swimming, yoga, home workouts, sports, and more. The focus is on consistency and personal progress rather than specific workout types, so any physical activity counts toward your streaks and achievements.",
      category: 'fitness'
    },
    {
      id: 7,
      question: "Can I lose my NFTs if I miss workouts?",
      answer: "No! Once you earn an NFT achievement, it's permanently yours and stored on the blockchain. Missing workouts might break your current streak, but it won't affect the NFTs you've already earned. You can always start a new streak and work toward new achievements.",
      category: 'nfts'
    },
    {
      id: 8,
      question: "Is SuiGym free to use?",
      answer: "Yes, SuiGym is free to use! You only pay small transaction fees (gas fees) when minting NFTs on the Sui blockchain, which are typically very low. There are no subscription fees or hidden costs - just start working out and earning achievements.",
      category: 'general'
    },
    {
      id: 9,
      question: "How accurate is the weight tracking?",
      answer: "Weight tracking in SuiGym relies on manual input from users. We recommend weighing yourself at the same time each day (preferably in the morning) for consistency. The app tracks your progress over time and celebrates weight loss milestones with special NFT achievements.",
      category: 'fitness'
    },
    {
      id: 10,
      question: "Can I trade or sell my SuiGym NFTs?",
      answer: "Yes! Since SuiGym NFTs are stored on the Sui blockchain, they can be traded on NFT marketplaces that support Sui. However, we encourage users to view these NFTs as personal achievement badges that represent your fitness journey and dedication.",
      category: 'blockchain'
    }
  ]

  const categories = [
    { id: 'general', name: 'General', icon: HelpCircle, color: 'text-sui-green-600' },
    { id: 'nfts', name: 'NFTs & Rewards', icon: Zap, color: 'text-sui-orange-600' },
    { id: 'blockchain', name: 'Blockchain & Security', icon: Shield, color: 'text-sui-blue-600' },
    { id: 'fitness', name: 'Fitness Tracking', icon: Coins, color: 'text-sui-purple-600' }
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>('general')

  const filteredFAQs = faqs.filter(faq => faq.category === selectedCategory)

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about SuiGym, NFT achievements, and blockchain fitness tracking
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-white shadow-lg text-gray-900 border-2 border-gray-200'
                  : 'bg-white/50 text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <category.icon className={`h-5 w-5 ${category.color}`} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ Content - Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* FAQ Items - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <CardTitle className="flex items-center justify-between text-left">
                      <span className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  {openItems.includes(faq.id) && (
                    <CardContent className="pt-0">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support - Right Column (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  {/* Support Image */}
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                      alt="Customer support team"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center w-16 h-16 bg-sui-green-50 rounded-full mx-auto mb-6">
                    <HelpCircle className="h-8 w-8 text-sui-green-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Still have questions?
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-center">
                    Can't find the answer you're looking for? Our support team is here to help you get started with your fitness NFT journey.
                  </p>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-sui-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sui-green-600 transition-colors shadow-lg">
                      Contact Support
                    </button>
                    <button className="w-full border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Join Community
                    </button>
                  </div>

                  {/* Additional Help Options */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4 text-center">Quick Help</h4>
                    <div className="space-y-3 text-sm">
                      <a href="#" className="flex items-center text-gray-600 hover:text-sui-green-600 transition-colors">
                        <span className="w-2 h-2 bg-sui-green-500 rounded-full mr-3"></span>
                        Getting Started Guide
                      </a>
                      <a href="#" className="flex items-center text-gray-600 hover:text-sui-green-600 transition-colors">
                        <span className="w-2 h-2 bg-sui-orange-500 rounded-full mr-3"></span>
                        Wallet Setup Tutorial
                      </a>
                      <a href="#" className="flex items-center text-gray-600 hover:text-sui-green-600 transition-colors">
                        <span className="w-2 h-2 bg-sui-purple-500 rounded-full mr-3"></span>
                        NFT Collection Guide
                      </a>
                      <a href="#" className="flex items-center text-gray-600 hover:text-sui-green-600 transition-colors">
                        <span className="w-2 h-2 bg-sui-blue-500 rounded-full mr-3"></span>
                        Troubleshooting
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}