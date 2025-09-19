import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { GraduationCap, Target, Users, Star } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">CareerGuide</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Personalized Career & 
            <span className="text-blue-600"> Skills Advisor</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover your perfect career path with AI-powered recommendations tailored 
            specifically for Indian students. Get personalized guidance based on your interests, 
            skills, and aspirations.
          </p>

          <Button 
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl h-auto"
          >
            Get Started - It's Free!
          </Button>

          <div className="mt-12 text-sm text-gray-500">
            ✨ Completely free • 📚 Built for Indian students • ⚡ Instant results
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 text-center border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Recommendations</h3>
            <p className="text-gray-600">Get career suggestions based on your unique interests, skills, and academic background.</p>
          </Card>

          <Card className="p-6 text-center border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Indian Education System</h3>
            <p className="text-gray-600">Designed specifically for the Indian education system and career landscape.</p>
          </Card>

          <Card className="p-6 text-center border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Skills Development</h3>
            <p className="text-gray-600">Learn what skills you need to develop for your dream career path.</p>
          </Card>
        </div>

        {/* Testimonial */}
        <div className="mt-20 max-w-2xl mx-auto">
          <Card className="p-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-lg text-gray-700 italic mb-4">
                "CareerGuide helped me discover that data science perfectly matches my math skills and curiosity. 
                Now I'm pursuing my dream career with confidence!"
              </p>
              <div className="font-semibold text-gray-900">Priya S.</div>
              <div className="text-sm text-gray-600">Engineering Student, Mumbai</div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}