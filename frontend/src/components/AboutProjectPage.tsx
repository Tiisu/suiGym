import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Heart, Users, BookOpen, Github, ExternalLink, ArrowLeft } from "lucide-react"

// Fallback Twitter icon component
const TwitterIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
)

interface AboutProjectPageProps {
  onBack: () => void
}

export function AboutProjectPage({ onBack }: AboutProjectPageProps) {
  // You can replace these with actual photos and details
  const acknowledgments = [
    {
      id: 1,
      name: "John Doe",
      role: "Move Language Mentor",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      message: "Thank you for guiding me through the complexities of Move programming and helping me understand blockchain fundamentals.",
      twitter: "@johndoe_dev"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Sui Blockchain Expert",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      message: "Your expertise in Sui development and patient explanations made this learning journey possible. Forever grateful!",
      twitter: "@janesmith_sui"
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Code Review & Feedback",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      message: "Thank you for the countless code reviews and constructive feedback that helped me write better Move contracts.",
      twitter: "@mikejohnson_code"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onBack}
              variant="ghost" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-sui-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">About This Project</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My Journey into <span className="text-sui-green-600">Move</span> & <span className="text-sui-blue-600">Sui</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            SuiGym is more than just a fitness app - it's my hands-on exploration into the world of 
            Move programming language and Sui blockchain development. This project represents my commitment 
            to learning cutting-edge Web3 technologies while building something meaningful.
          </p>
        </div>

        {/* Learning Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What I Learned</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This project challenged me to dive deep into blockchain development, combining theoretical 
              knowledge with practical implementation.
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

          {/* Detailed Learning Outcomes */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">🎯 Technical Skills Gained</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Mastered Move programming language syntax and resource management</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Understanding Sui's object-oriented blockchain architecture</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Smart contract security best practices and testing methodologies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Frontend integration with blockchain using TypeScript and React</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">🌟 Personal Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Built confidence in tackling complex blockchain development challenges</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Learned to combine personal interests (fitness) with technology</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Developed problem-solving skills specific to Web3 development</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-sui-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Gained experience in end-to-end dApp development lifecycle</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Acknowledgments */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <h3 className="text-3xl font-bold text-gray-900">Acknowledgments</h3>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This learning journey wouldn't have been possible without the incredible support, guidance, 
              and patience from these amazing individuals who believed in my potential and shared their knowledge freely.
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
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100"
                    />
                    <h4 className="text-lg font-bold text-gray-900">{person.name}</h4>
                    <p className="text-sm text-sui-green-600 font-medium mb-2">{person.role}</p>
                    
                    {/* Twitter Handle */}
                    <a 
                      href={`https://twitter.com/${person.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors text-sm"
                    >
                      <TwitterIcon />
                      <span>{person.twitter}</span>
                    </a>
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
            <CardContent className="p-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-sui-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Special Thanks to Sui Ghana Community 🇬🇭
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8 text-lg">
                  A heartfelt appreciation to the <strong>Sui Ghana Community</strong> for creating an 
                  inclusive and supportive environment where developers can learn, grow, and build together. 
                  Your workshops, mentorship programs, collaborative spirit, and commitment to fostering 
                  blockchain education in Ghana made this learning journey not just possible, but truly enjoyable.
                </p>
                <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
                  The community's dedication to nurturing local talent and building a strong blockchain 
                  ecosystem in Ghana is inspiring. Thank you for believing in developers like me and 
                  providing the resources, support, and encouragement needed to explore new technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-sui-green-600 hover:bg-sui-green-700 text-white">
                    <Users className="mr-2 h-4 w-4" />
                    Join Sui Ghana Community
                  </Button>
                  <Button variant="outline" className="border-sui-green-600 text-sui-green-600 hover:bg-sui-green-100">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Learn More About Sui
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Source & Repository */}
        <div className="text-center">
          <Card className="bg-gray-900 border-0 shadow-xl">
            <CardContent className="p-10">
              <h3 className="text-3xl font-bold text-white mb-6">
                Explore the Code & Learn
              </h3>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                This project is completely open source! Feel free to explore the Move smart contracts, 
                React frontend implementation, and learn from the code. I welcome contributions, feedback, 
                and discussions about the implementation. Let's build and learn together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code on GitHub
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}