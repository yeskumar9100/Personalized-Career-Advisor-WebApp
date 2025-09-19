import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { 
  GraduationCap, 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  Briefcase,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Circle,
  Sparkles
} from "lucide-react";

interface RoadmapStage {
  id: string;
  title: string;
  duration: string;
  description: string;
  skills: string[];
  courses: string[];
  certifications: string[];
  projects: string[];
  milestones: string[];
  networking: string[];
  salaryRange: string;
}

interface CareerRoadmap {
  id: string;
  title: string;
  overview: string;
  totalDuration: string;
  industryInsights: string[];
  stages: RoadmapStage[];
  longTermOptions: string[];
  keyCompanies: string[];
}

interface CareerRoadmapPageProps {
  careerId: string;
  careerTitle: string;
  roadmapData?: CareerRoadmap;
  onBack: () => void;
}

const CAREER_ROADMAPS: Record<string, CareerRoadmap> = {
  "product-manager": {
    id: "product-manager",
    title: "Product Manager",
    overview: "Product Management is one of the fastest-growing fields in India's tech ecosystem. PMs bridge business, technology, and user experience to build successful products.",
    totalDuration: "3-5 years to senior PM level",
    industryInsights: [
      "High demand in Indian startups and MNCs like Flipkart, Zomato, Paytm",
      "Average salary growth of 25-30% annually in first 5 years",
      "Bangalore, Mumbai, Delhi NCR are major PM hubs",
      "Strong emphasis on understanding Indian market nuances and user behavior",
      "Cross-functional collaboration is highly valued in Indian companies"
    ],
    stages: [
      {
        id: "entry",
        title: "Entry Level (0-2 years)",
        duration: "6 months - 2 years",
        description: "Build foundational PM skills and gain hands-on experience with product development cycles.",
        skills: [
          "Product thinking & user empathy",
          "Basic data analysis (Excel, SQL basics)",
          "Communication & presentation",
          "Agile/Scrum methodology",
          "Market research & competitive analysis",
          "Basic wireframing tools (Figma, Balsamiq)"
        ],
        courses: [
          "Google Product Management Certificate",
          "Coursera - Digital Product Management",
          "Product School - Product Management Fundamentals",
          "Udemy - Complete Product Management Course",
          "NPTEL - Technology Management"
        ],
        certifications: [
          "Certified Scrum Product Owner (CSPO)",
          "Google Analytics Certified",
          "HubSpot Content Marketing",
          "Meta Social Media Marketing"
        ],
        projects: [
          "Redesign a popular Indian app (Swiggy, Ola, etc.)",
          "Create a product requirement document (PRD)",
          "Conduct user interviews for a local business",
          "Build a product roadmap for a startup idea",
          "Analyze competitor products in Indian market"
        ],
        milestones: [
          "Get your first PM/APM role or PM internship",
          "Ship your first feature end-to-end",
          "Conduct 20+ user interviews",
          "Present to senior stakeholders",
          "Lead a cross-functional project"
        ],
        networking: [
          "Join Product Management communities (PM Hive, Product Coalition)",
          "Attend ProductCon India events",
          "Follow Indian PM leaders on LinkedIn",
          "Join local PM meetups in your city",
          "Connect with PMs at target companies"
        ],
        salaryRange: "₹4-12 LPA"
      },
      {
        id: "growth",
        title: "Growth Level (2-5 years)",
        duration: "2-3 years",
        description: "Develop specialized PM skills, lead larger initiatives, and build expertise in specific product areas.",
        skills: [
          "Advanced analytics (Python/R, Tableau)",
          "Growth hacking & experimentation",
          "Product strategy & vision",
          "Stakeholder management",
          "Team leadership & mentoring",
          "Business model understanding",
          "Technical depth (APIs, databases)"
        ],
        courses: [
          "Stanford - Customer Development & Validation",
          "ISB Executive Program - Product Management",
          "Reforge - Growth & Product Strategy",
          "First Round Review - PM Courses",
          "Indian School of Business - Digital Strategy"
        ],
        certifications: [
          "Reforge - Growth Series",
          "Pragmatic Institute - Product Management",
          "SAFe Product Owner/Product Manager",
          "AWS Cloud Practitioner"
        ],
        projects: [
          "Lead a 0-1 product initiative",
          "Design and run A/B tests",
          "Build a growth funnel strategy",
          "Launch product in new Indian market/city",
          "Develop pricing strategy for Indian users"
        ],
        milestones: [
          "Get promoted to Senior PM",
          "Manage a team of junior PMs",
          "Launch a successful product/feature",
          "Achieve significant business metrics (GMV, DAU)",
          "Speak at a product conference"
        ],
        networking: [
          "Mentor junior PMs or APMs",
          "Join PM leadership groups",
          "Speak at local tech meetups",
          "Build relationships with VCs/investors",
          "Connect with founders and CPOs"
        ],
        salaryRange: "₹12-25 LPA"
      },
      {
        id: "leadership",
        title: "Leadership Level (5+ years)",
        duration: "3+ years",
        description: "Drive product strategy at organizational level, build and lead product teams, and shape company direction.",
        skills: [
          "Product portfolio management",
          "Strategic thinking & planning",
          "Team building & culture",
          "P&L responsibility",
          "Board-level communication",
          "Market expansion strategy",
          "Fundraising & investor relations"
        ],
        courses: [
          "IIM Executive MBA",
          "Stanford Graduate School - Strategic Leadership",
          "Harvard Business Review - Leadership",
          "Y Combinator - Startup School",
          "Product Leadership Intensive Programs"
        ],
        certifications: [
          "PMP (Project Management Professional)",
          "Executive Leadership Certificate",
          "Board of Directors Certification",
          "Six Sigma Black Belt"
        ],
        projects: [
          "Lead product strategy for new market entry",
          "Build and scale product org from 5 to 50+",
          "Drive company-wide digital transformation",
          "Launch products internationally",
          "Lead merger/acquisition product integration"
        ],
        milestones: [
          "Become VP Product or CPO",
          "Successfully fundraise based on product traction",
          "Scale product team to 20+ members",
          "Launch product in 3+ countries",
          "Be recognized as top PM in India (awards, lists)"
        ],
        networking: [
          "Join C-level executive networks",
          "Become a startup advisor/angel investor",
          "Join industry boards and committees",
          "Mentor at top accelerators (Accel, Sequoia)",
          "Build relationships with media and analysts"
        ],
        salaryRange: "₹25-80 LPA + equity"
      }
    ],
    longTermOptions: [
      "Chief Product Officer at major Indian unicorn",
      "Start your own product-focused company",
      "Become a VC focusing on product investments",
      "Join as Product Advisor for multiple startups",
      "Transition to CEO role at product company",
      "Lead product at international expansion (US, SEA)"
    ],
    keyCompanies: [
      "Flipkart", "Zomato", "Paytm", "PhonePe", "Cred", "Razorpay",
      "Ola", "Swiggy", "Myntra", "BigBasket", "Unacademy", "BYJU'S",
      "Google India", "Microsoft India", "Amazon India", "Meta India"
    ]
  },
  "software-engineer": {
    id: "software-engineer",
    title: "Software Engineer",
    overview: "Software Engineering is the backbone of India's tech revolution. From building apps for millions of users to working on cutting-edge AI, SWEs have diverse opportunities.",
    totalDuration: "4-6 years to senior/staff level",
    industryInsights: [
      "India is a global tech hub with opportunities in FAANG, startups, and services",
      "Strong focus on full-stack development and cloud technologies",
      "Remote work culture has opened global opportunities",
      "Open source contribution highly valued",
      "Continuous learning essential due to rapidly evolving tech stack"
    ],
    stages: [
      {
        id: "entry",
        title: "Entry Level (0-2 years)",
        duration: "6 months - 2 years",
        description: "Master programming fundamentals and contribute to real-world projects.",
        skills: [
          "Programming languages (Python, Java, JavaScript)",
          "Data structures & algorithms",
          "Version control (Git)",
          "Basic web development (HTML, CSS, React)",
          "Database fundamentals (SQL)",
          "Testing and debugging"
        ],
        courses: [
          "CS50 - Introduction to Computer Science",
          "The Complete Web Developer Bootcamp",
          "Data Structures and Algorithms Specialization",
          "NPTEL - Programming courses",
          "FreeCodeCamp full curriculum"
        ],
        certifications: [
          "AWS Certified Cloud Practitioner",
          "Oracle Java Certification",
          "Google IT Automation Certificate",
          "MongoDB Developer Certification"
        ],
        projects: [
          "Build a full-stack web application",
          "Contribute to open source projects",
          "Create a mobile app",
          "Build APIs and microservices",
          "Deploy applications to cloud"
        ],
        milestones: [
          "Get first software engineering job",
          "Make first open source contribution",
          "Deploy first production application",
          "Solve 200+ coding problems",
          "Complete first code review cycle"
        ],
        networking: [
          "Join developer communities (Stack Overflow, GitHub)",
          "Attend local tech meetups",
          "Participate in hackathons",
          "Follow tech leaders on Twitter/LinkedIn",
          "Join coding bootcamp alumni networks"
        ],
        salaryRange: "₹3-15 LPA"
      },
      {
        id: "growth",
        title: "Growth Level (2-5 years)",
        duration: "2-3 years",
        description: "Specialize in technologies, lead technical initiatives, and mentor junior developers.",
        skills: [
          "Advanced programming & design patterns",
          "System design & architecture",
          "Cloud platforms (AWS, Azure, GCP)",
          "DevOps & CI/CD",
          "Team leadership & code reviews",
          "Performance optimization",
          "Security best practices"
        ],
        courses: [
          "MIT OpenCourseWare - Advanced CS",
          "System Design Interview Course",
          "Kubernetes & Docker Mastery",
          "Advanced React/Node.js courses",
          "Machine Learning Specialization"
        ],
        certifications: [
          "AWS Solutions Architect",
          "Google Professional Cloud Architect",
          "Certified Kubernetes Administrator",
          "Microsoft Azure Developer"
        ],
        projects: [
          "Design and build scalable systems",
          "Lead a technical migration project",
          "Optimize application performance",
          "Build CI/CD pipelines",
          "Mentor junior developers"
        ],
        milestones: [
          "Get promoted to Senior SWE",
          "Lead a technical team",
          "Design system handling 1M+ users",
          "Speak at tech conferences",
          "Become tech lead for major project"
        ],
        networking: [
          "Speak at developer conferences",
          "Contribute to major open source projects",
          "Join technical steering committees",
          "Mentor at coding bootcamps",
          "Build relationships with tech recruiters"
        ],
        salaryRange: "₹15-40 LPA"
      },
      {
        id: "leadership",
        title: "Leadership Level (5+ years)",
        duration: "3+ years",
        description: "Drive technical strategy, build engineering organizations, and solve complex technical challenges.",
        skills: [
          "Engineering management",
          "Technical strategy & roadmaps",
          "Cross-functional collaboration",
          "Hiring & team building",
          "Budget & resource planning",
          "Technology evaluation",
          "Innovation & R&D leadership"
        ],
        courses: [
          "Stanford - Engineering Leadership",
          "IIT Advanced Software Engineering",
          "Engineering Management Accelerator",
          "Technical Program Management",
          "Executive Leadership Programs"
        ],
        certifications: [
          "PMP (Project Management Professional)",
          "Certified Engineering Manager",
          "Executive Leadership Certificate",
          "Advanced Cloud Architect Certifications"
        ],
        projects: [
          "Build engineering org from 10 to 100+",
          "Lead company-wide tech modernization",
          "Establish engineering best practices",
          "Drive technical due diligence for M&A",
          "Launch new technology initiatives"
        ],
        milestones: [
          "Become Engineering Manager/Director",
          "Build and scale engineering teams",
          "Drive successful product launches",
          "Establish company's technical vision",
          "Be recognized as tech industry leader"
        ],
        networking: [
          "Join CTO/VP Engineering networks",
          "Become technical advisor to startups",
          "Speak at major tech conferences",
          "Join technical advisory boards",
          "Build relationships with tech VCs"
        ],
        salaryRange: "₹40-1.5Cr + equity"
      }
    ],
    longTermOptions: [
      "Chief Technology Officer at major company",
      "Start a tech company as technical co-founder",
      "Become a principal engineer at FAANG",
      "Join as technical advisor for multiple startups",
      "Lead R&D at major tech corporation",
      "Transition to tech investor/VC technical partner"
    ],
    keyCompanies: [
      "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix",
      "Flipkart", "Zomato", "Paytm", "Swiggy", "Ola", "CRED",
      "TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Accenture"
    ]
  },
  "data-scientist": {
    id: "data-scientist",
    title: "Data Scientist",
    overview: "Data Science is transforming Indian businesses across sectors. From e-commerce to healthcare, data scientists are driving insights and building AI-powered solutions.",
    totalDuration: "4-6 years to senior level",
    industryInsights: [
      "High demand across fintech, e-commerce, and healthcare",
      "Strong emphasis on practical ML implementation",
      "Growing importance of MLOps and production systems",
      "India becoming a global AI/ML development hub",
      "Cross-industry applications from agriculture to space tech"
    ],
    stages: [
      {
        id: "entry",
        title: "Entry Level (0-2 years)",
        duration: "6 months - 2 years",
        description: "Build strong foundation in statistics, programming, and machine learning fundamentals.",
        skills: [
          "Python/R programming",
          "Statistics & probability",
          "SQL & database querying",
          "Data visualization (Matplotlib, Seaborn)",
          "Basic machine learning algorithms",
          "Excel & business analysis"
        ],
        courses: [
          "Andrew Ng's Machine Learning Course",
          "Python for Data Science (Coursera)",
          "Statistics for Data Science",
          "SQL for Data Science",
          "Great Learning Data Science Program"
        ],
        certifications: [
          "Google Data Analytics Professional Certificate",
          "IBM Data Science Professional Certificate",
          "Microsoft Azure Data Scientist Associate",
          "Tableau Desktop Specialist"
        ],
        projects: [
          "Predict house prices using Indian real estate data",
          "Analyze e-commerce customer behavior",
          "Build recommendation system",
          "Stock market prediction model",
          "Social media sentiment analysis"
        ],
        milestones: [
          "Get first data analyst/scientist role",
          "Complete first end-to-end ML project",
          "Build portfolio of 5+ projects",
          "Make first data-driven business recommendation",
          "Present insights to stakeholders"
        ],
        networking: [
          "Join Analytics Vidhya community",
          "Participate in Kaggle competitions",
          "Attend PyData meetups",
          "Follow data science influencers",
          "Join data science Slack communities"
        ],
        salaryRange: "₹4-12 LPA"
      },
      {
        id: "growth",
        title: "Growth Level (2-5 years)",
        duration: "2-3 years",
        description: "Develop advanced ML skills, work on complex problems, and start leading data initiatives.",
        skills: [
          "Advanced ML algorithms (ensemble, neural networks)",
          "Deep learning (TensorFlow, PyTorch)",
          "Big data tools (Spark, Hadoop)",
          "MLOps & model deployment",
          "A/B testing & experimentation",
          "Business strategy & communication",
          "Cloud platforms (AWS, GCP, Azure)"
        ],
        courses: [
          "Deep Learning Specialization",
          "Advanced Machine Learning on Coursera",
          "MLOps Specialization",
          "ISB Data Science for Managers",
          "Advanced Statistics and Probability"
        ],
        certifications: [
          "AWS Certified Machine Learning",
          "Google Professional ML Engineer",
          "TensorFlow Developer Certificate",
          "SAS Certified Advanced Analytics Professional"
        ],
        projects: [
          "Build production ML pipeline",
          "Lead cross-functional data project",
          "Develop computer vision application",
          "Create real-time recommendation engine",
          "Build predictive models for business KPIs"
        ],
        milestones: [
          "Get promoted to Senior Data Scientist",
          "Lead a data science team",
          "Deploy models to production",
          "Drive significant business impact with ML",
          "Speak at data science conferences"
        ],
        networking: [
          "Mentor junior data scientists",
          "Contribute to open source ML projects",
          "Join AI/ML research groups",
          "Speak at data science meetups",
          "Build relationships with ML engineers"
        ],
        salaryRange: "₹12-30 LPA"
      },
      {
        id: "leadership",
        title: "Leadership Level (5+ years)",
        duration: "3+ years",
        description: "Lead data strategy, build data organizations, and drive AI transformation across the company.",
        skills: [
          "Data strategy & governance",
          "Team building & management",
          "AI ethics & responsible ML",
          "Business acumen & ROI analysis",
          "Stakeholder management",
          "Data architecture & infrastructure",
          "Innovation & research leadership"
        ],
        courses: [
          "MIT Sloan - AI for Leaders",
          "Stanford - AI in Healthcare/Finance",
          "Executive Data Science Programs",
          "Chief Data Officer Certification",
          "AI Strategy and Leadership"
        ],
        certifications: [
          "Certified Analytics Professional (CAP)",
          "Chief Data Officer Certification",
          "Executive AI Leadership Certificate",
          "Data Management Professional (CDMP)"
        ],
        projects: [
          "Lead company-wide AI transformation",
          "Build data science org from 5 to 50+",
          "Establish data governance framework",
          "Drive AI innovation initiatives",
          "Lead strategic data partnerships"
        ],
        milestones: [
          "Become Head of Data Science/CDO",
          "Build and scale data teams",
          "Drive AI strategy for organization",
          "Establish industry thought leadership",
          "Lead successful AI product launches"
        ],
        networking: [
          "Join Chief Data Officer networks",
          "Become AI advisor to startups",
          "Speak at major AI conferences",
          "Join AI ethics committees",
          "Build relationships with AI VCs"
        ],
        salaryRange: "₹30-80 LPA + equity"
      }
    ],
    longTermOptions: [
      "Chief Data Officer at major corporation",
      "Start AI/ML focused company",
      "Join as AI researcher at top institutions",
      "Become technical advisor for AI startups",
      "Lead AI initiatives at consulting firms",
      "Transition to AI-focused venture capital"
    ],
    keyCompanies: [
      "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Uber",
      "Flipkart", "Zomato", "Paytm", "Swiggy", "PhonePe", "Cred",
      "Mu Sigma", "Fractal Analytics", "LatentView", "Tiger Analytics"
    ]
  }
};

export function CareerRoadmapPage({ careerId, careerTitle, roadmapData, onBack }: CareerRoadmapPageProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [activeStage, setActiveStage] = useState("entry");

  // Use AI-generated roadmap if available, fallback to static data
  const roadmap = roadmapData || CAREER_ROADMAPS[careerId];

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">AI Generating Your Roadmap</h2>
          <p className="text-gray-600 mb-6">
            Our AI is creating a personalized roadmap for {careerTitle} based on your unique profile. 
            This usually takes a few moments...
          </p>
          <Button onClick={onBack} variant="outline">Go Back</Button>
        </Card>
      </div>
    );
  }

  const toggleCompletion = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
  };

  const getStageProgress = (stage: RoadmapStage) => {
    const totalItems = stage.skills.length + stage.courses.length + stage.projects.length + stage.milestones.length;
    const completedInStage = [
      ...stage.skills.map(s => `${stage.id}-skill-${s}`),
      ...stage.courses.map(c => `${stage.id}-course-${c}`),
      ...stage.projects.map(p => `${stage.id}-project-${p}`),
      ...stage.milestones.map(m => `${stage.id}-milestone-${m}`)
    ].filter(id => completedItems.has(id)).length;
    
    return Math.round((completedInStage / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CareerGuide</h1>
          </div>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Recommendations
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                AI-Personalized for You
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {roadmap.title} Career Roadmap
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              {roadmap.overview}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {roadmap.totalDuration}
              </span>
              <span className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {roadmap.stages.length} Stages
              </span>
            </div>
          </div>

          {/* Personalization Note */}
          {roadmap.personalizedNote && (
            <Card className="p-6 mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Personalized for Your Profile
              </h3>
              <p className="text-gray-700">{roadmap.personalizedNote}</p>
            </Card>
          )}

          {/* Industry Insights */}
          <Card className="p-6 mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Indian Market Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {roadmap.industryInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Stage Navigation */}
          <div className="mb-8">
            <Tabs value={activeStage} onValueChange={setActiveStage}>
              <TabsList className="grid w-full grid-cols-3">
                {roadmap.stages.map((stage) => (
                  <TabsTrigger key={stage.id} value={stage.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold flex items-center justify-center">
                      {getStageProgress(stage)}%
                    </div>
                    {stage.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {roadmap.stages.map((stage) => (
                <TabsContent key={stage.id} value={stage.id} className="mt-6">
                  <Card className="p-8 border-0 shadow-lg">
                    {/* Stage Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{stage.title}</h2>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {stage.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {stage.salaryRange}
                            </span>
                          </div>
                          <p className="text-gray-700">{stage.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {getStageProgress(stage)}%
                          </div>
                          <div className="text-sm text-gray-600">Complete</div>
                        </div>
                      </div>
                      <Progress value={getStageProgress(stage)} className="h-3" />
                    </div>

                    {/* Stage Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Skills */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Target className="h-5 w-5 text-green-600" />
                            Skills to Develop
                          </h3>
                          <div className="space-y-2">
                            {stage.skills.map((skill, index) => {
                              const itemId = `${stage.id}-skill-${skill}`;
                              return (
                                <div key={index} className="flex items-center gap-3">
                                  <Checkbox
                                    id={itemId}
                                    checked={completedItems.has(itemId)}
                                    onCheckedChange={() => toggleCompletion(itemId)}
                                  />
                                  <label 
                                    htmlFor={itemId} 
                                    className={`text-sm ${completedItems.has(itemId) ? 'line-through text-gray-500' : 'text-gray-700'}`}
                                  >
                                    {skill}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Courses */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            Recommended Courses
                          </h3>
                          <div className="space-y-2">
                            {stage.courses.map((course, index) => {
                              const itemId = `${stage.id}-course-${course}`;
                              return (
                                <div key={index} className="flex items-center gap-3">
                                  <Checkbox
                                    id={itemId}
                                    checked={completedItems.has(itemId)}
                                    onCheckedChange={() => toggleCompletion(itemId)}
                                  />
                                  <label 
                                    htmlFor={itemId} 
                                    className={`text-sm ${completedItems.has(itemId) ? 'line-through text-gray-500' : 'text-gray-700'}`}
                                  >
                                    {course}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Certifications */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-600" />
                            Valuable Certifications
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {stage.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Projects */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-purple-600" />
                            Hands-on Projects
                          </h3>
                          <div className="space-y-2">
                            {stage.projects.map((project, index) => {
                              const itemId = `${stage.id}-project-${project}`;
                              return (
                                <div key={index} className="flex items-center gap-3">
                                  <Checkbox
                                    id={itemId}
                                    checked={completedItems.has(itemId)}
                                    onCheckedChange={() => toggleCompletion(itemId)}
                                  />
                                  <label 
                                    htmlFor={itemId} 
                                    className={`text-sm ${completedItems.has(itemId) ? 'line-through text-gray-500' : 'text-gray-700'}`}
                                  >
                                    {project}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Milestones */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            Key Milestones
                          </h3>
                          <div className="space-y-2">
                            {stage.milestones.map((milestone, index) => {
                              const itemId = `${stage.id}-milestone-${milestone}`;
                              return (
                                <div key={index} className="flex items-center gap-3">
                                  <Checkbox
                                    id={itemId}
                                    checked={completedItems.has(itemId)}
                                    onCheckedChange={() => toggleCompletion(itemId)}
                                  />
                                  <label 
                                    htmlFor={itemId} 
                                    className={`text-sm ${completedItems.has(itemId) ? 'line-through text-gray-500' : 'text-gray-700'}`}
                                  >
                                    {milestone}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Networking */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Users className="h-5 w-5 text-indigo-600" />
                            Networking Strategies
                          </h3>
                          <div className="space-y-2">
                            {stage.networking.map((strategy, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-700">{strategy}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Long-term Options & Key Companies */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Long-term Growth */}
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Long-term Career Options
              </h3>
              <div className="space-y-3">
                {roadmap.longTermOptions.map((option, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">{option}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Key Companies */}
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Target Companies in India
              </h3>
              <div className="flex flex-wrap gap-2">
                {roadmap.keyCompanies.map((company, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {company}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Action Items */}
          <Card className="mt-8 p-6 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
            <h3 className="font-semibold text-gray-900 mb-4">🚀 Ready to Get Started?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">This Week:</h4>
                <ul className="space-y-1">
                  <li>• Set up your learning environment and tools</li>
                  <li>• Join relevant communities and forums</li>
                  <li>• Start your first recommended course</li>
                  <li>• Update your LinkedIn profile</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">This Month:</h4>
                <ul className="space-y-1">
                  <li>• Complete your first project</li>
                  <li>• Attend a local meetup or webinar</li>
                  <li>• Connect with 5 professionals in the field</li>
                  <li>• Start building your portfolio</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}