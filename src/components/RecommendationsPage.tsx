import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { GraduationCap, ArrowLeft, Star, TrendingUp, Users, MapPin, Route, Sparkles } from "lucide-react";
import { FormData } from "./MultiStepForm";
import { generatePersonalizedRoadmap } from "./AIRoadmapGenerator";

interface Career {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  averageSalary: string;
  growthProspects: string;
  workEnvironment: string;
  requiredSkills: string[];
  educationPath: string[];
  popularCompanies: string[];
  whyMatch: string[];
}

interface RecommendationsPageProps {
  formData: FormData;
  onStartOver: () => void;
  onViewRoadmap: (careerId: string, careerTitle: string) => void;
  onRoadmapReady: (careerId: string, roadmapData: any) => void;
}

const generateRecommendations = (formData: FormData): Career[] => {
  // Enhanced AI-powered recommendation engine
  const allCareers: Career[] = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Design, develop, and maintain software applications and systems. Work with cutting-edge technologies to solve real-world problems.",
      matchPercentage: 85,
      averageSalary: "₹6-25 LPA",
      growthProspects: "Excellent - High demand in tech industry",
      workEnvironment: "Office/Remote, Collaborative teams",
      requiredSkills: ["Programming", "Problem Solving", "Analytical Thinking", "Technical Skills", "Teamwork"],
      educationPath: ["B.Tech/B.E. in Computer Science", "Learn programming languages", "Build projects", "Internships"],
      popularCompanies: ["TCS", "Infosys", "Google", "Microsoft", "Flipkart", "Zomato"],
      whyMatch: ["Strong interest in Technology & Computers", "Good mathematical and analytical skills", "Enjoys problem-solving"]
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Analyze complex data to help organizations make informed decisions. Use statistics, machine learning, and programming to extract insights.",
      matchPercentage: 82,
      averageSalary: "₹8-30 LPA",
      growthProspects: "Excellent - Growing field with high demand",
      workEnvironment: "Office/Remote, Research-oriented",
      requiredSkills: ["Analytical Thinking", "Mathematical Skills", "Problem Solving", "Research", "Technical Skills"],
      educationPath: ["B.Tech/B.Sc. in relevant field", "Learn Python/R", "Statistics and ML courses", "Data analysis projects"],
      popularCompanies: ["Amazon", "Netflix", "Uber", "Paytm", "BYJU'S", "Swiggy"],
      whyMatch: ["Strong mathematical and analytical abilities", "Interest in research and problem-solving", "Tech-savvy background"]
    },
    {
      id: "product-manager",
      title: "Product Manager",
      description: "Lead product development from concept to launch. Work with engineering, design, and business teams to create successful products.",
      matchPercentage: 78,
      averageSalary: "₹12-40 LPA",
      growthProspects: "Very Good - High growth potential",
      workEnvironment: "Office-based, Cross-functional collaboration",
      requiredSkills: ["Leadership", "Communication", "Analytical Thinking", "Teamwork", "Problem Solving"],
      educationPath: ["Bachelor's degree", "MBA (preferred)", "Product management courses", "Business experience"],
      popularCompanies: ["Flipkart", "Ola", "Razorpay", "Myntra", "PhonePe", "Cred"],
      whyMatch: ["Strong leadership and communication skills", "Business and technology interests", "Team collaboration abilities"]
    },
    {
      id: "ux-designer",
      title: "UX Designer",
      description: "Research user needs and design intuitive, user-friendly digital experiences. Combine creativity with data-driven insights.",
      matchPercentage: 75,
      averageSalary: "₹4-20 LPA",
      growthProspects: "Very Good - Growing importance of user experience",
      workEnvironment: "Collaborative, Creative studios/offices",
      requiredSkills: ["Creativity", "Communication", "Problem Solving", "Analytical Thinking", "Artistic Skills"],
      educationPath: ["Design degree (preferred)", "UX bootcamp", "Build portfolio", "Internships/Projects"],
      popularCompanies: ["Google", "Microsoft", "Flipkart", "Zomato", "Paytm", "Adobe"],
      whyMatch: ["Creative thinking abilities", "Interest in technology and human behavior", "Problem-solving mindset"]
    },
    {
      id: "digital-marketer",
      title: "Digital Marketing Specialist",
      description: "Create and execute digital marketing strategies across various platforms. Combine creativity with data analytics.",
      matchPercentage: 72,
      averageSalary: "₹3-15 LPA",
      growthProspects: "Very Good - Digital transformation driving demand",
      workEnvironment: "Fast-paced, Creative agencies/companies",
      requiredSkills: ["Communication", "Creativity", "Analytical Thinking", "Writing", "Technical Skills"],
      educationPath: ["Marketing/Business degree", "Digital marketing courses", "Certifications", "Practical campaigns"],
      popularCompanies: ["Google", "Meta", "Amazon", "Flipkart", "Zomato", "Swiggy"],
      whyMatch: ["Strong communication skills", "Creative and analytical thinking", "Interest in technology and business"]
    },
    {
      id: "business-analyst",
      title: "Business Analyst",
      description: "Bridge the gap between business needs and technology solutions. Analyze processes and recommend improvements.",
      matchPercentage: 70,
      averageSalary: "₹5-18 LPA",
      growthProspects: "Good - Essential for digital transformation",
      workEnvironment: "Collaborative, Cross-functional teams",
      requiredSkills: ["Analytical Thinking", "Communication", "Problem Solving", "Organization", "Technical Skills"],
      educationPath: ["Business/Engineering degree", "BA certification", "Domain expertise", "Project experience"],
      popularCompanies: ["TCS", "Infosys", "Accenture", "Deloitte", "Flipkart", "Paytm"],
      whyMatch: ["Strong analytical and communication skills", "Business and technology interests", "Problem-solving abilities"]
    }
  ];

  // Advanced AI-style matching algorithm
  const scoredCareers = allCareers.map(career => {
    let score = career.matchPercentage;
    
    // Interest-based scoring
    const interestBoost = {
      "Technology & Computers": ["software-engineer", "data-scientist", "product-manager"],
      "Creative Arts & Design": ["ux-designer", "digital-marketer"],
      "Business & Finance": ["product-manager", "business-analyst", "digital-marketer"],
      "Science & Research": ["data-scientist", "software-engineer"],
      "Media & Communication": ["digital-marketer", "ux-designer"],
      "Healthcare & Medicine": ["data-scientist", "ux-designer"],
      "Education & Teaching": ["ux-designer", "product-manager"]
    };

    formData.interests.forEach(interest => {
      if (interestBoost[interest as keyof typeof interestBoost]?.includes(career.id)) {
        score += 8;
      }
    });

    // Skills-based scoring
    const matchingSkills = career.requiredSkills.filter(skill => 
      formData.skills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    score += matchingSkills.length * 3;

    // Education and stream based scoring
    if (formData.stream === "science" && ["software-engineer", "data-scientist"].includes(career.id)) score += 5;
    if (formData.stream === "commerce" && ["business-analyst", "digital-marketer"].includes(career.id)) score += 5;
    if (formData.stream === "arts" && ["ux-designer", "digital-marketer"].includes(career.id)) score += 5;
    if (formData.stream === "engineering" && ["software-engineer", "product-manager"].includes(career.id)) score += 5;

    // Subject-based scoring
    if (formData.subjects.includes("Computer Science") && ["software-engineer", "data-scientist"].includes(career.id)) score += 6;
    if (formData.subjects.includes("Mathematics") && ["data-scientist", "software-engineer"].includes(career.id)) score += 6;
    if (formData.subjects.includes("Arts & Crafts") && ["ux-designer"].includes(career.id)) score += 6;
    if (formData.subjects.includes("Economics") && ["business-analyst", "product-manager"].includes(career.id)) score += 4;
    if (formData.subjects.includes("Psychology") && ["ux-designer", "digital-marketer"].includes(career.id)) score += 4;

    // Work style preferences
    if (formData.workStyle === "team" && ["product-manager", "ux-designer"].includes(career.id)) score += 3;
    if (formData.workStyle === "independent" && ["software-engineer", "data-scientist"].includes(career.id)) score += 3;
    if (formData.workStyle === "leadership" && ["product-manager", "business-analyst"].includes(career.id)) score += 4;

    return { ...career, matchPercentage: Math.min(Math.max(score, 65), 98) };
  });

  return scoredCareers.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 3);
};

export function RecommendationsPage({ formData, onStartOver, onViewRoadmap, onRoadmapReady }: RecommendationsPageProps) {
  const [recommendations, setRecommendations] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapGenerationStatus, setRoadmapGenerationStatus] = useState<Record<string, 'idle' | 'generating' | 'ready'>>({});

  useEffect(() => {
    // Generate initial recommendations
    const initialRecommendations = generateRecommendations(formData);
    setRecommendations(initialRecommendations);
    setIsLoading(false);

    // Start generating personalized roadmaps for each career
    const generateAllRoadmaps = async () => {
      const status: Record<string, 'idle' | 'generating' | 'ready'> = {};
      
      // Initialize status for all careers
      initialRecommendations.forEach(career => {
        status[career.id] = 'generating';
      });
      setRoadmapGenerationStatus(status);

      // Generate roadmaps in parallel
      const roadmapPromises = initialRecommendations.map(async (career) => {
        try {
          const roadmapData = await generatePersonalizedRoadmap(career.id, career.title, formData);
          onRoadmapReady(career.id, roadmapData);
          
          setRoadmapGenerationStatus(prev => ({
            ...prev,
            [career.id]: 'ready'
          }));
        } catch (error) {
          console.error(`Failed to generate roadmap for ${career.title}:`, error);
          setRoadmapGenerationStatus(prev => ({
            ...prev,
            [career.id]: 'idle'
          }));
        }
      });

      await Promise.all(roadmapPromises);
    };

    generateAllRoadmaps();
  }, [formData, onRoadmapReady]);

  const getRoadmapButtonContent = (careerId: string) => {
    const status = roadmapGenerationStatus[careerId] || 'idle';
    
    switch (status) {
      case 'generating':
        return (
          <>
            <Sparkles className="h-4 w-4 animate-pulse" />
            AI Generating...
          </>
        );
      case 'ready':
        return (
          <>
            <Route className="h-4 w-4" />
            View AI Roadmap
          </>
        );
      default:
        return (
          <>
            <Route className="h-4 w-4" />
            Generate Roadmap
          </>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CareerGuide</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>

            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-8 border-0 shadow-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-8 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">CareerGuide</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your AI-Powered Career Recommendations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              Based on your interests, skills, and preferences, here are the top career paths 
              that align with your profile. Our AI is generating personalized roadmaps for each career.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>AI-powered personalized roadmaps generating...</span>
            </div>
          </div>

          {/* Summary Card */}
          <Card className="p-6 mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Your Profile Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Top Interests:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.interests.slice(0, 3).map(interest => (
                    <Badge key={interest} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Key Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Career Recommendations */}
          <div className="space-y-8">
            {recommendations.map((career, index) => (
              <Card key={career.id} className="p-8 border-0 shadow-lg bg-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      #{index + 1}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{career.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-lg font-semibold text-green-600">
                          {career.matchPercentage}% Match
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {career.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Average Salary</div>
                        <div className="text-gray-600">{career.averageSalary}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Growth Prospects</div>
                        <div className="text-gray-600">{career.growthProspects}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Work Environment</div>
                        <div className="text-gray-600">{career.workEnvironment}</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-900 mb-2">Required Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.map(skill => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className={`${
                              formData.skills.includes(skill) 
                                ? 'bg-green-100 text-green-800 border-green-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {skill}
                            {formData.skills.includes(skill) && " ✓"}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-gray-900 mb-2">Why This Matches You</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {career.whyMatch.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education Path */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-gray-900">Recommended Education Path</div>
                    <Button
                      onClick={() => onViewRoadmap(career.id, career.title)}
                      variant="outline"
                      className={`flex items-center gap-2 text-sm ${
                        roadmapGenerationStatus[career.id] === 'ready' ? 'bg-green-50 border-green-200 text-green-700' : ''
                      }`}
                      disabled={roadmapGenerationStatus[career.id] === 'generating'}
                    >
                      {getRoadmapButtonContent(career.id)}
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Steps to Take:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {career.educationPath.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">{idx + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Popular Companies:</div>
                      <div className="flex flex-wrap gap-2">
                        {career.popularCompanies.map(company => (
                          <Badge key={company} variant="outline" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-gray-600">
              Want to explore different options or update your preferences?
            </p>
            <Button
              onClick={onStartOver}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="mt-8 p-6 border-0 shadow-lg bg-blue-50/50">
            <h3 className="font-semibold text-gray-900 mb-3">💡 Next Steps</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>• Research these careers further by talking to professionals in these fields</p>
              <p>• Consider internships or shadowing opportunities to gain practical experience</p>
              <p>• Start building relevant skills through online courses and projects</p>
              <p>• Connect with career counselors at your school or college for personalized guidance</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}