import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Heart, Users, BookOpen, Github, ExternalLink } from "lucide-react"

export function AboutProjectSection() {
  // You can replace these with actual photos and details
  const acknowledgments = [
    {
      id: 1,
      name: "John Doe",
      role: "Move Language Mentor",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      message: "Thank you for guiding me through the complexities of Move programming and helping me understand blockchain fundamentals."
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Sui Blockchain Expert",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      message: "Your expertise in Sui development and patient explanations made this learning journey possible. Forever grateful!"
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Code Review & Feedback",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      message: "Thank you for the countless code reviews and constructive feedback that helped me write better Move contracts."
    }
  ]

  const learningHighlights = [
    {
      icon: Code,
      title: "Move Programming Language",
      description: "Learned the fundamentals of Move, Sui's smart contract language, including object-oriented programming and resource management.",
      color: "text-sui-green-600",
      bgColor: "bg-sui-green-50"
    },
    {
      icon: BookOpen,
      title: "Sui Blockchain Architecture",
      description: "Explored Sui's unique consensus mechanism, object model, and how it differs from other blockchain platforms.",
      color: "text-sui-blue-600",
      bgColor: "bg-sui-blue-50"
    },
    {
      icon: Users,
      title: "dApp Development",
      description: "Built a complete decentralized application integrating frontend React components with Move smart contracts.",
      color: "text-sui-purple-600",
      bgColor: "bg-sui-purple-50"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="h-8 w-8 text-sui-green-600" />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              About This Project
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            SuiGym is more than just a fitness app - it's my journey into the world of 
            <span className="font-semibold text-sui-green-600"> Move programming</span> and 
            <span className="font-semibold text-sui-blue-600"> Sui blockchain development</span>
          </p>
        </div>

        {/* Learning Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">My Learning Journey</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This project represents my exploration into blockchain development, combining my passion for 
              fitness with cutting-edge Web3 technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {learningHighlights.map((highlight, index) => (
              <Card key={index} className={`${highlight.bgColor} border-0 shadow-sm hover:shadow-md transition-all`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <highlight.icon className={`h-8 w-8 ${highlight.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{highlight.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Goals */}
          <Card className="bg-gray-50 border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Project Goals</h4>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🎯 Technical Learning</h5>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Master Move programming language syntax and concepts</li>
                      <li>• Understand Sui's object-oriented blockchain model</li>
                      <li>• Learn smart contract security best practices</li>
                      <li>• Integrate blockchain with modern frontend frameworks</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🌟 Personal Growth</h5>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Build a complete dApp from concept to deployment</li>
                      <li>• Combine fitness passion with blockchain technology</li>
                      <li>• Contribute to the growing Sui ecosystem</li>
                      <li>• Share knowledge with the developer community</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acknowledgments */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <h3 className="text-3xl font-bold text-gray-900">Acknowledgments</h3>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This project wouldn't have been possible without the incredible support and guidance 
              from these amazing people who believed in my learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {acknowledgments.map((person) => (
              <Card key={person.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <img 
                      src={person.photo}
                      alt={person.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100"
                    />
                    <h4 className="text-lg font-bold text-gray-900">{person.name}</h4>
                    <p className="text-sm text-sui-green-600 font-medium">{person.role}</p>
                  </div>
                  <blockquote className="text-gray-600 italic text-sm leading-relaxed text-center">
                    "{person.message}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sui Ghana Community */}
        <div className="mb-16">
          <Card className="bg-sui-green-50 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-sui-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Special Thanks to Sui Ghana Community 🇬🇭
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                  A heartfelt appreciation to the <strong>Sui Ghana Community</strong> for creating an 
                  inclusive environment where developers can learn, grow, and build together. Your workshops, 
                  mentorship programs, and collaborative spirit made this learning journey not just possible, 
                  but enjoyable. The community's commitment to fostering blockchain education in Ghana is 
                  truly inspiring.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-sui-green-600 hover:bg-sui-green-700 text-white">
                    <Users className="mr-2 h-4 w-4" />
                    Join Sui Ghana Community
                  </Button>
                  <Button variant="outline" className="border-sui-green-600 text-sui-green-600 hover:bg-sui-green-50">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Learn More About Sui
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gray-900 border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Interested in the Code?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                This project is open source! Feel free to explore the Move smart contracts, 
                React frontend, and learn from the implementation. Contributions and feedback are welcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}