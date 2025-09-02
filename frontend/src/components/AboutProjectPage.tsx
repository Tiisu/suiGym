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
  const acknowledgments = [
    {
      id: 1,
      name: "Mr. Sahabia Yakubu",
      role: "MERN Stack Development Mentor",
      photo: "/images/mentors/sahabia.jpg", // Upload his image here
      message: "Heartfelt gratitude to Mr. Sahabia for his exceptional guidance in MERN stack development. Your patient teaching laid the foundation for building this dApp's frontend.",
      twitter: "@sahadevgh"
    },
    {
      id: 2,
      name: "Mrs. Uju Edeh",
      role: "Founder - Sui Network Ghana",
      photo: "/images/mentors/uju.jpg", // Upload her image here
      message: "Immense appreciation to Mrs. Uju, the visionary founder of Sui Network Ghana. Thank you for fostering a community where blockchain innovation thrives in Ghana.",
      twitter: "@ujunwaedeh"
    },
    {
      id: 3,
      name: "Mr. Samuel (Lion)",
      role: "Move Language & Sui Blockchain Mentor",
      photo: "/images/mentors/samuel.jpg", // Upload his image here
      message: "Profound thanks to Mr. Samuel for being an incredible mentor in Move programming and Sui blockchain development. This project wouldn't exist without your guidance and expertise.",
      twitter: "@lionprado17"
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
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={onBack}
              variant="ghost" 
              size="sm"
              className="flex items-center space-x-2 self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 sm:h-6 sm:w-6 text-sui-green-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">About This Project</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Introduction */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            My Journey into <span className="text-sui-green-600">Move</span> & <span className="text-sui-blue-600">Sui</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
            SuiGym is more than just a fitness app - it's my hands-on exploration into the world of 
            Move programming language and Sui blockchain development. This project represents my commitment 
            to learning cutting-edge Web3 technologies while building something meaningful.
          </p>
        </div>

        {/* Learning Journey */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">What I Learned</h3>
            <p className="text-gray-600 max-w-2xl mx-auto px-2">
              This project challenged me to dive deep into blockchain development, combining theoretical 
              knowledge with practical implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Acknowledgments</h3>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto px-2">
              This learning journey wouldn't have been possible without the incredible support, guidance, 
              and patience from these amazing individuals who believed in my potential and shared their knowledge freely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {acknowledgments.map((person) => (
              <Card key={person.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <img 
                      src={person.photo}
                      alt={person.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100"
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=10b981&color=fff&size=96`
                      }}
                    />
                    <h4 className="text-lg font-bold text-gray-900">{person.name}</h4>
                    <p className="text-sm text-sui-green-600 font-medium mb-3">{person.role}</p>
                    
                    {/* Twitter Link */}
                    <div className="flex justify-center mb-4">
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
        <div className="mb-12 sm:mb-16">
          <Card className="bg-sui-green-50 border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sui-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Special Thanks to Sui Ghana Community 🇬🇭
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-2">
                  A heartfelt appreciation to the <strong>Sui Ghana Community</strong> for creating an 
                  inclusive and supportive environment where developers can learn, grow, and build together. 
                  Your workshops, mentorship programs, collaborative spirit, and commitment to fostering 
                  blockchain education in Ghana made this learning journey not just possible, but truly enjoyable.
                </p>
                <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-2">
                  The community's dedication to nurturing local talent and building a strong blockchain 
                  ecosystem in Ghana is inspiring. Thank you for believing in developers like me and 
                  providing the resources, support, and encouragement needed to explore new technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                  <Button 
                    className="bg-sui-green-600 hover:bg-sui-green-700 text-white"
                    onClick={() => window.open('https://x.com/SuiNetworkGhana', '_blank')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Join Sui Ghana Community
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-sui-green-600 text-sui-green-600 hover:bg-sui-green-100"
                    onClick={() => window.open('https://docs.sui.io/concepts/sui-move-concepts', '_blank')}
                  >
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
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                Explore the Code & Learn
              </h3>
              <p className="text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                This project is completely open source! Feel free to explore the Move smart contracts, 
                React frontend implementation, and learn from the code. I welcome contributions, feedback, 
                and discussions about the implementation. Let's build and learn together!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <Button 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => window.open('https://github.com/Tiisu/suiGym', '_blank')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code on GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => window.open('https://docs.sui.io/', '_blank')}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Sui Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}