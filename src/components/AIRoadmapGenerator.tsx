import { FormData } from "./MultiStepForm";

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
  personalizedNote: string;
}

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function generatePersonalizedRoadmap(
  careerId: string,
  careerTitle: string,
  userProfile: FormData
): Promise<CareerRoadmap> {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GOOGLE_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a detailed career roadmap for the role "${careerTitle}" considering this user profile: ${JSON.stringify(
                    userProfile
                  )}. Return JSON format matching the CareerRoadmap interface.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.[0]?.text;

    if (!aiText) {
      console.error("No AI content returned.");
      return createPersonalizedRoadmap(careerId, careerTitle, userProfile);
    }

    const aiRoadmap: CareerRoadmap = JSON.parse(aiText);
    return aiRoadmap;

  } catch (error) {
    console.error("Error generating AI roadmap:", error);
    return createPersonalizedRoadmap(careerId, careerTitle, userProfile);
  }
}

// Single fallback function
function createPersonalizedRoadmap(
  careerId: string,
  careerTitle: string,
  userProfile: FormData
): CareerRoadmap {
  const templates: Record<string, (title: string, profile: FormData) => CareerRoadmap> = {
    "product-manager": createProductManagerRoadmap,
    "software-engineer": createSoftwareEngineerRoadmap,
    "data-scientist": createDataScientistRoadmap,
    "ux-designer": createUXDesignerRoadmap,
    "digital-marketer": createDigitalMarketerRoadmap,
    "business-analyst": createBusinessAnalystRoadmap,
    "cybersecurity-specialist": createCybersecurityRoadmap
  };

  const createRoadmap = templates[careerId] || createGenericRoadmap;
  return createRoadmap(careerTitle, userProfile);
}

function createProductManagerRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  const hasBusinessInterest = userProfile.interests.includes("Business & Finance");
  const hasTechSkills = userProfile.skills.includes("Technical Skills");
  const isExperienced = userProfile.educationLevel === "postgraduate";

  return {
    id: "product-manager",
    title: careerTitle,
    overview: `Product Management combines business strategy, technology, and user experience - perfect for someone with your ${userProfile.interests.slice(0, 2).join(" and ")} interests. In India's booming tech ecosystem, PMs are the bridge between ideas and successful products.`,
    totalDuration: isExperienced ? "2-4 years to senior PM level" : "3-5 years to senior PM level",
    personalizedNote: `Based on your ${userProfile.stream || userProfile.educationLevel} background and interests in ${userProfile.interests.slice(0, 2).join(" and ")}, you're well-positioned for Product Management. ${hasBusinessInterest ? "Your business interest gives you an edge in understanding market needs." : ""} ${hasTechSkills ? "Your technical skills will help you collaborate effectively with engineering teams." : ""}`,
    industryInsights: [
      `High demand in ${userProfile.location === "metro" ? "metro cities like Bangalore, Mumbai, Delhi NCR" : "growing tier-2 cities and remote opportunities"}`,
      "Average salary growth of 25-30% annually in first 5 years",
      "Indian startups like Flipkart, Zomato, Paytm are aggressively hiring PMs",
      `${userProfile.workStyle === "team" ? "Perfect for your collaborative work style" : "Requires strong cross-functional collaboration skills"}`,
      "Strong emphasis on understanding Indian market nuances and user behavior"
    ],
    stages: [
      {
        id: "entry",
        title: `Entry Level (0-${isExperienced ? "18" : "24"} months)`,
        duration: isExperienced ? "6-18 months" : "6-24 months",
        description: `Build foundational PM skills leveraging your ${userProfile.stream || "educational"} background. Focus on understanding product development cycles and user needs.`,
        skills: [
          "Product thinking & user empathy",
          `${userProfile.subjects.includes("Mathematics") ? "Advanced data analysis (building on your math background)" : "Basic data analysis (Excel, SQL basics)"}`,
          "Communication & presentation",
          "Agile/Scrum methodology",
          `Market research & competitive analysis ${userProfile.subjects.includes("Economics") ? "(leveraging your economics knowledge)" : ""}`,
          "Basic wireframing tools (Figma, Balsamiq)"
        ].filter(Boolean),
        courses: [
          "Google Product Management Certificate",
          "Coursera - Digital Product Management",
          `${userProfile.subjects.includes("Business Studies") ? "Advanced Product Strategy (ISB)" : "Product School - Product Management Fundamentals"}`,
          "Udemy - Complete Product Management Course",
          `${userProfile.educationLevel.includes("graduate") ? "NPTEL - Technology Management" : "Basic Business Fundamentals"}`
        ].filter(Boolean),
        certifications: [
          "Certified Scrum Product Owner (CSPO)",
          "Google Analytics Certified",
          `${hasBusinessInterest ? "HubSpot Inbound Marketing" : "HubSpot Content Marketing"}`,
          "Meta Social Media Marketing"
        ],
        projects: [
          `Redesign a popular Indian app relevant to your interests (${userProfile.interests.includes("Healthcare & Medicine") ? "HealthTech like Practo" : userProfile.interests.includes("Education & Teaching") ? "EdTech like BYJU'S" : "Swiggy, Ola, etc."})`,
          "Create a product requirement document (PRD)",
          `Conduct user interviews for a ${userProfile.location === "hometown" ? "local business in your hometown" : "startup or local business"}`,
          `Build a product roadmap for a startup idea in ${userProfile.interests[0] || "technology"}`,
          "Analyze competitor products in Indian market"
        ],
        milestones: [
          `Get your first PM/APM role${isExperienced ? " or consulting project" : " or PM internship"}`,
          "Ship your first feature end-to-end",
          "Conduct 20+ user interviews",
          "Present to senior stakeholders",
          "Lead a cross-functional project"
        ],
        networking: [
          "Join Product Management communities (PM Hive, Product Coalition)",
          `Attend ProductCon India events ${userProfile.location === "metro" ? "in your city" : "virtually or in nearest metro"}`,
          "Follow Indian PM leaders on LinkedIn",
          `Join local PM meetups ${userProfile.location === "metro" ? "in your city" : "virtually"}`,
          "Connect with PMs at target companies"
        ],
        salaryRange: isExperienced ? "₹6-15 LPA" : "₹4-12 LPA"
      },
      {
        id: "growth",
        title: "Growth Level (2-5 years)",
        duration: "2-3 years",
        description: `Develop specialized PM skills and lead larger initiatives. ${hasTechSkills ? "Your technical background will be valuable for complex product decisions." : "Build technical depth to work effectively with engineering teams."}`,
        skills: [
          `${userProfile.subjects.includes("Mathematics") || userProfile.subjects.includes("Computer Science") ? "Advanced analytics (Python/R, Tableau)" : "Analytics & data interpretation"}`,
          "Growth hacking & experimentation",
          "Product strategy & vision",
          `Stakeholder management ${userProfile.skills.includes("Leadership") ? "(building on your leadership skills)" : ""}`,
          "Team leadership & mentoring",
          `Business model understanding ${hasBusinessInterest ? "(leveraging your business interest)" : ""}`,
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
          `${hasTechSkills ? "AWS Solutions Architect" : "AWS Cloud Practitioner"}`
        ],
        projects: [
          "Lead a 0-1 product initiative",
          "Design and run A/B tests",
          "Build a growth funnel strategy",
          `Launch product in new Indian market/city ${userProfile.location === "international" ? "or international market" : ""}`,
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
        salaryRange: "₹15-30 LPA"
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
          `${userProfile.educationLevel === "postgraduate" ? "Advanced Strategy Programs" : "IIM Executive MBA"}`,
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
          `${userProfile.location === "international" ? "Launch products internationally" : "Launch products in multiple Indian markets"}`,
          "Lead merger/acquisition product integration"
        ],
        milestones: [
          "Become VP Product or CPO",
          "Successfully fundraise based on product traction",
          "Scale product team to 20+ members",
          `${userProfile.location === "international" ? "Launch product in 3+ countries" : "Scale product across India"}`,
          "Be recognized as top PM in India (awards, lists)"
        ],
        networking: [
          "Join C-level executive networks",
          "Become a startup advisor/angel investor",
          "Join industry boards and committees",
          "Mentor at top accelerators (Accel, Sequoia)",
          "Build relationships with media and analysts"
        ],
        salaryRange: "₹30-80 LPA + equity"
      }
    ],
    longTermOptions: [
      "Chief Product Officer at major Indian unicorn",
      "Start your own product-focused company",
      "Become a VC focusing on product investments",
      "Join as Product Advisor for multiple startups",
      "Transition to CEO role at product company",
      `${userProfile.location === "international" ? "Lead product at international expansion (US, SEA)" : "Lead product expansion internationally"}`
    ],
    keyCompanies: [
      ...(userProfile.location === "metro" ? ["Flipkart", "Zomato", "Paytm", "PhonePe"] : ["Flipkart", "Zomato", "Paytm"]),
      "Cred", "Razorpay", "Ola", "Swiggy", "Myntra", "BigBasket",
      ...(userProfile.interests.includes("Education & Teaching") ? ["Unacademy", "BYJU'S", "Vedantu"] : []),
      ...(userProfile.interests.includes("Healthcare & Medicine") ? ["Practo", "PharmEasy", "1mg"] : []),
      "Google India", "Microsoft India", "Amazon India", "Meta India"
    ]
  };
}

function createSoftwareEngineerRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  const hasCSBackground = userProfile.subjects.includes("Computer Science") || userProfile.stream === "engineering";
  const hasMathSkills = userProfile.subjects.includes("Mathematics");

  return {
    id: "software-engineer",
    title: careerTitle,
    overview: `Software Engineering is perfect for your analytical mindset and ${userProfile.interests.includes("Technology & Computers") ? "passion for technology" : "problem-solving abilities"}. India's tech sector offers incredible opportunities from startups to global giants.`,
    totalDuration: hasCSBackground ? "3-5 years to senior level" : "4-6 years to senior level",
    personalizedNote: `With your ${userProfile.stream || userProfile.educationLevel} background${hasCSBackground ? " and computer science foundation" : ""}${hasMathSkills ? " and strong mathematical skills" : ""}, you're well-positioned for software engineering. Focus on building practical coding skills and real-world projects.`,
    industryInsights: [
      `${userProfile.location === "metro" ? "Abundant opportunities in tech hubs like Bangalore, Hyderabad, Pune" : "Growing remote work culture opens global opportunities"}`,
      "India is a global software development hub with opportunities across all sectors",
      `${userProfile.workStyle === "independent" ? "Perfect for your independent work style with flexibility for remote work" : "Strong collaborative culture in Indian tech companies"}`,
      "Continuous learning essential due to rapidly evolving tech stack",
      "High demand for full-stack developers and cloud specialists"
    ],
    stages: [
      {
        id: "entry",
        title: "Entry Level (0-2 years)",
        duration: hasCSBackground ? "3-18 months" : "6-24 months",
        description: `Master programming fundamentals${hasCSBackground ? " and apply your CS knowledge to real projects" : " starting from basics"}. Build a strong foundation in data structures and algorithms.`,
        skills: [
          `Programming languages ${hasCSBackground ? "(Java, Python, JavaScript - building on your CS background)" : "(start with Python or JavaScript)"}`,
          `Data structures & algorithms ${hasMathSkills ? "(leveraging your mathematical background)" : ""}`,
          "Version control (Git)",
          "Web development (HTML, CSS, React)",
          "Database fundamentals (SQL)",
          "Testing and debugging"
        ].filter(Boolean),
        courses: [
          `${hasCSBackground ? "Advanced Algorithms and Data Structures" : "CS50 - Introduction to Computer Science"}`,
          "The Complete Web Developer Bootcamp",
          `${hasMathSkills ? "Advanced Algorithms Specialization" : "Data Structures and Algorithms Specialization"}`,
          "NPTEL - Programming courses",
          "FreeCodeCamp full curriculum"
        ],
        certifications: [
          "AWS Certified Cloud Practitioner",
          `${hasCSBackground ? "Oracle Java Certification" : "Python Programming Certification"}`,
          "Google IT Automation Certificate",
          "MongoDB Developer Certification"
        ],
        projects: [
          `Build a full-stack web application ${userProfile.interests.includes("Healthcare & Medicine") ? "related to healthcare" : userProfile.interests.includes("Education & Teaching") ? "for education" : "solving a real problem"}`,
          "Contribute to open source projects",
          `Create a mobile app ${userProfile.interests[0] ? "related to " + userProfile.interests[0].toLowerCase() : ""}`,
          "Build REST APIs and microservices",
          "Deploy applications to cloud platforms"
        ],
        milestones: [
          "Get first software engineering job",
          "Make first meaningful open source contribution",
          "Deploy first production application",
          `${hasMathSkills ? "Solve 300+ coding problems" : "Solve 200+ coding problems"}`,
          "Complete first code review cycle"
        ],
        networking: [
          "Join developer communities (Stack Overflow, GitHub)",
          `Attend local tech meetups ${userProfile.location === "metro" ? "in your city" : "virtually"}`,
          "Participate in hackathons",
          "Follow tech leaders on Twitter/LinkedIn",
          "Join coding bootcamp alumni networks"
        ],
        salaryRange: hasCSBackground ? "₹4-18 LPA" : "₹3-15 LPA"
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
          `${userProfile.interests.includes("Science & Research") ? "Machine Learning Specialization" : "Advanced Backend Development"}`
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
          "Optimize application performance by 50%+",
          "Build automated CI/CD pipelines",
          "Mentor junior developers"
        ],
        milestones: [
          "Get promoted to Senior Software Engineer",
          "Lead a technical team of 3-5 engineers",
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
        salaryRange: "₹18-45 LPA"
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
        salaryRange: "₹50-1.5Cr + equity"
      }
    ],
    longTermOptions: [
      "Chief Technology Officer at major company",
      "Start a tech company as technical co-founder",
      `${userProfile.location === "international" ? "Principal engineer at FAANG companies" : "Lead engineering at unicorn startups"}`,
      "Join as technical advisor for multiple startups",
      "Lead R&D at major tech corporation",
      "Transition to tech investor/VC technical partner"
    ],
    keyCompanies: [
      "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix",
      "Flipkart", "Zomato", "Paytm", "Swiggy", "Ola", "CRED",
      ...(userProfile.location !== "international" ? ["TCS", "Infosys", "Wipro", "HCL"] : []),
      ...(userProfile.interests.includes("Healthcare & Medicine") ? ["Practo", "PharmEasy"] : []),
      ...(userProfile.interests.includes("Education & Teaching") ? ["BYJU'S", "Unacademy"] : [])
    ]
  };
}

function createDataScientistRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  const hasMathBackground = userProfile.subjects.includes("Mathematics") || userProfile.subjects.includes("Physics");
  const hasStatsBackground = userProfile.subjects.includes("Computer Science") || userProfile.stream === "science";

  return {
    id: "data-scientist",
    title: careerTitle,
    overview: `Data Science combines ${hasMathBackground ? "your strong mathematical foundation" : "mathematics"}, programming, and business insights. Perfect for someone with your ${userProfile.interests.includes("Science & Research") ? "research-oriented mindset" : "analytical thinking abilities"}.`,
    totalDuration: hasMathBackground ? "3-5 years to senior level" : "4-6 years to senior level",
    personalizedNote: `Your ${userProfile.stream || userProfile.educationLevel} background${hasMathBackground ? " with strong mathematical skills" : ""} provides ${hasMathBackground ? "an excellent" : "a solid"} foundation for data science. ${userProfile.skills.includes("Analytical Thinking") ? "Your analytical thinking skills are perfectly suited for this field." : ""}`,
    industryInsights: [
      `High demand in ${userProfile.interests.includes("Business & Finance") ? "fintech" : userProfile.interests.includes("Healthcare & Medicine") ? "healthcare and pharma" : "e-commerce and tech"}`,
      "India becoming a global AI/ML development hub",
      "Strong emphasis on practical ML implementation",
      `${userProfile.workStyle === "independent" ? "Perfect balance of independent research and team collaboration" : "Growing importance of cross-functional collaboration"}`,
      "Salary growth of 30-40% annually in first few years"
    ],
    stages: [
      {
        id: "entry",
        title: "Entry Level (0-2 years)",
        duration: hasMathBackground ? "4-18 months" : "6-24 months",
        description: `Build foundation in statistics, programming, and ML${hasMathBackground ? " building on your mathematical background" : " starting with statistical fundamentals"}.`,
        skills: [
          "Python/R programming",
          `${hasMathBackground ? "Advanced statistics & probability" : "Statistics & probability"}`,
          "SQL & database querying",
          "Data visualization (Matplotlib, Seaborn)",
          "Basic machine learning algorithms",
          "Excel & business analysis"
        ],
        courses: [
          "Andrew Ng's Machine Learning Course",
          "Python for Data Science (Coursera)",
          `${hasMathBackground ? "Advanced Statistics for Data Science" : "Statistics for Data Science"}`,
          "SQL for Data Science",
          `${userProfile.educationLevel.includes("graduate") ? "Advanced Analytics Programs" : "Great Learning Data Science Program"}`
        ],
        certifications: [
          "Google Data Analytics Professional Certificate",
          "IBM Data Science Professional Certificate",
          "Microsoft Azure Data Scientist Associate",
          "Tableau Desktop Specialist"
        ],
        projects: [
          `Predict ${userProfile.interests.includes("Business & Finance") ? "stock prices or financial trends" : userProfile.interests.includes("Healthcare & Medicine") ? "health outcomes using medical data" : "house prices using Indian real estate data"}`,
          `Analyze ${userProfile.interests.includes("Business & Finance") ? "financial market" : "e-commerce customer"} behavior`,
          "Build recommendation system",
          `${userProfile.interests[0] ? "Create ML model for " + userProfile.interests[0].toLowerCase() : "Stock market prediction model"}`,
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
          `Attend PyData meetups ${userProfile.location === "metro" ? "in your city" : "virtually"}`,
          "Follow data science influencers",
          "Join data science Slack communities"
        ],
        salaryRange: hasMathBackground ? "₹5-15 LPA" : "₹4-12 LPA"
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
          `${userProfile.educationLevel.includes("graduate") ? "ISB Data Science for Managers" : "Business Analytics Certificate"}`,
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
          `Develop ${userProfile.interests.includes("Creative Arts & Design") ? "computer vision" : "predictive analytics"} application`,
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
        salaryRange: "₹15-35 LPA"
      },
      {
        id: "leadership",
        title: "Leadership Level (5+ years)",
        duration: "3+ years",
        description: "Lead data strategy, build data organizations, and drive AI transformation.",
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
          `Stanford - AI in ${userProfile.interests.includes("Healthcare & Medicine") ? "Healthcare" : userProfile.interests.includes("Business & Finance") ? "Finance" : "Business"}`,
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
        salaryRange: "₹35-1Cr + equity"
      }
    ],
    longTermOptions: [
      "Chief Data Officer at major corporation",
      "Start AI/ML focused company",
      `${userProfile.interests.includes("Science & Research") ? "Join as AI researcher at top institutions" : "Lead AI consulting practice"}`,
      "Become technical advisor for AI startups",
      "Lead AI initiatives at consulting firms",
      "Transition to AI-focused venture capital"
    ],
    keyCompanies: [
      "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Uber",
      "Flipkart", "Zomato", "Paytm", "Swiggy", "PhonePe", "Cred",
      "Mu Sigma", "Fractal Analytics", "LatentView", "Tiger Analytics",
      ...(userProfile.interests.includes("Healthcare & Medicine") ? ["Practo", "PharmEasy", "HealthifyMe"] : []),
      ...(userProfile.interests.includes("Business & Finance") ? ["Razorpay", "Zerodha", "PolicyBazaar"] : [])
    ]
  };
}

function createUXDesignerRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  const hasDesignBackground = userProfile.subjects.includes("Arts & Crafts") || userProfile.interests.includes("Creative Arts & Design");
  const hasPsychologyBackground = userProfile.subjects.includes("Psychology");

  return {
    id: "ux-designer",
    title: careerTitle,
    overview: `UX Design combines creativity, psychology, and technology${hasDesignBackground ? " - perfect for your creative background" : ""}. ${hasPsychologyBackground ? "Your psychology knowledge will be invaluable for understanding user behavior." : ""}`,
    totalDuration: hasDesignBackground ? "2-4 years to senior level" : "3-5 years to senior level",
    personalizedNote: `${hasDesignBackground ? "Your creative arts background gives you a strong foundation for UX design." : ""} ${hasPsychologyBackground ? "Your psychology knowledge will help you understand user motivations and behaviors." : ""} Focus on building user empathy and design thinking skills.`,
    industryInsights: [
      "High demand in Indian tech startups and MNCs",
      "Growing importance of user-centered design in Indian products",
      `${userProfile.workStyle === "team" ? "Highly collaborative role perfect for your team-oriented approach" : "Balance of independent design work and collaborative feedback"}`,
      "Strong portfolio more important than formal qualifications",
      "Remote work opportunities expanding globally"
    ],
    stages: [
      {
        id: "entry",
        title: "Entry Level (0-2 years)",
        duration: hasDesignBackground ? "6-18 months" : "6-24 months",
        description: `Build UX fundamentals and create your first portfolio${hasDesignBackground ? " leveraging your design background" : ""}.`,
        skills: [
          "User research methods",
          "Wireframing & prototyping",
          "Design thinking process",
          `${hasPsychologyBackground ? "Advanced user psychology" : "Basic user psychology"}`,
          "Figma, Sketch, Adobe XD",
          "Information architecture"
        ],
        courses: [
          "Google UX Design Certificate",
          "Interaction Design Foundation courses",
          `${hasDesignBackground ? "Advanced UX Research Methods" : "Intro to UX Design"}`,
          "Human-Computer Interaction",
          "Design Thinking Bootcamp"
        ],
        certifications: [
          "Google UX Design Professional Certificate",
          "Adobe Certified Expert",
          "HFI Certified Usability Analyst",
          "Nielsen Norman Group UX Certificate"
        ],
        projects: [
          `Redesign a popular Indian app ${userProfile.interests.includes("Healthcare & Medicine") ? "in healthcare" : userProfile.interests.includes("Education & Teaching") ? "in education" : "(Swiggy, Zomato, etc.)"}`,
          "Conduct usability testing study",
          "Create end-to-end design for mobile app",
          "Design accessibility improvements",
          "Build design system components"
        ],
        milestones: [
          "Build portfolio with 3-5 projects",
          "Get first UX role or internship",
          "Conduct first user interviews",
          "Present design to stakeholders",
          "Complete first usability test"
        ],
        networking: [
          "Join UX communities (IXDA India)",
          "Attend design meetups and conferences",
          "Follow UX leaders on LinkedIn/Twitter",
          "Join design Slack communities",
          "Participate in design challenges"
        ],
        salaryRange: hasDesignBackground ? "₹4-12 LPA" : "₹3-10 LPA"
      },
      {
        id: "growth",
        title: "Growth Level (2-5 years)",
        duration: "2-3 years",
        description: "Specialize in UX areas, lead design projects, and mentor junior designers.",
        skills: [
          "Advanced user research",
          "Service design",
          "Design systems",
          "Cross-functional collaboration",
          "Design leadership",
          "Business strategy integration",
          "Advanced prototyping"
        ],
        courses: [
          "Service Design courses",
          "Design Systems certification",
          "UX Strategy and Management",
          "Advanced User Research",
          "Design Leadership Program"
        ],
        certifications: [
          "Certified User Experience Professional",
          "Design Systems certification",
          "Service Design certificate",
          "UX Strategy certification"
        ],
        projects: [
          "Lead complete product redesign",
          "Build design system for company",
          "Conduct complex user research study",
          "Design for accessibility and inclusion",
          "Create design strategy for new product"
        ],
        milestones: [
          "Get promoted to Senior UX Designer",
          "Lead design for major product",
          "Mentor junior designers",
          "Speak at design conference",
          "Win design award or recognition"
        ],
        networking: [
          "Speak at design conferences",
          "Mentor junior designers",
          "Join design leadership groups",
          "Collaborate with product managers",
          "Build relationships with developers"
        ],
        salaryRange: "₹12-25 LPA"
      },
      {
        id: "leadership",
        title: "Leadership Level (5+ years)",
        duration: "3+ years",
        description: "Lead design organizations, drive design strategy, and shape company culture.",
        skills: [
          "Design strategy",
          "Team building & management",
          "Design operations",
          "Business impact measurement",
          "Executive communication",
          "Design culture building",
          "Innovation leadership"
        ],
        courses: [
          "Design Leadership MBA",
          "Executive Design Strategy",
          "Design Operations certification",
          "Business for Designers",
          "Innovation Management"
        ],
        certifications: [
          "Design Leadership Certificate",
          "Executive Design Strategy",
          "Design Operations Professional",
          "Innovation Leadership Certificate"
        ],
        projects: [
          "Build design team from 5 to 50+",
          "Lead company-wide design transformation",
          "Establish design operations",
          "Drive design-led innovation",
          "Create design measurement framework"
        ],
        milestones: [
          "Become Design Director/VP Design",
          "Build and scale design teams",
          "Drive business results through design",
          "Establish design thought leadership",
          "Launch award-winning products"
        ],
        networking: [
          "Join design executive networks",
          "Become design advisor to startups",
          "Speak at major design conferences",
          "Join design advisory boards",
          "Build relationships with design VCs"
        ],
        salaryRange: "₹25-60 LPA + equity"
      }
    ],
    longTermOptions: [
      "Chief Design Officer at major company",
      "Start design-focused company",
      "Become principal designer at top companies",
      "Join as design advisor for multiple startups",
      "Lead design at consulting firms",
      "Transition to design-focused venture capital"
    ],
    keyCompanies: [
      "Google", "Microsoft", "Amazon", "Meta", "Apple", "Adobe",
      "Flipkart", "Zomato", "Paytm", "Swiggy", "Ola", "CRED",
      "Razorpay", "PhonePe", "Myntra", "BigBasket",
      ...(userProfile.interests.includes("Healthcare & Medicine") ? ["Practo", "PharmEasy"] : []),
      ...(userProfile.interests.includes("Education & Teaching") ? ["BYJU'S", "Unacademy"] : [])
    ]
  };
}

// Additional career template functions would go here...
function createDigitalMarketerRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  // Implementation for Digital Marketing roadmap
  return createGenericRoadmap(careerTitle, userProfile);
}

function createBusinessAnalystRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  // Implementation for Business Analyst roadmap  
  return createGenericRoadmap(careerTitle, userProfile);
}

function createCybersecurityRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  // Implementation for Cybersecurity roadmap
  return createGenericRoadmap(careerTitle, userProfile);
}

function createGenericRoadmap(careerTitle: string, userProfile: FormData): CareerRoadmap {
  return {
    id: "generic",
    title: careerTitle,
    overview: `${careerTitle} is an exciting career path that aligns well with your interests in ${userProfile.interests.slice(0, 2).join(" and ")}. This field offers great opportunities for growth and impact.`,
    totalDuration: "4-6 years to senior level",
    personalizedNote: `Based on your ${userProfile.stream || userProfile.educationLevel} background and skills in ${userProfile.skills.slice(0, 2).join(" and ")}, you have a solid foundation for ${careerTitle}.`,
    industryInsights: [
      `Growing demand for ${careerTitle} professionals in India`,
      "Strong career progression opportunities",
      "Competitive salaries and benefits",
      "Remote work opportunities available",
      "Continuous learning and skill development important"
    ],
    stages: [
      {
        id: "entry",
        title: "Entry Level (0-2 years)",
        duration: "6-24 months",
        description: `Build foundational skills in ${careerTitle}`,
        skills: ["Core technical skills", "Communication", "Problem solving", "Industry knowledge"],
        courses: ["Foundational course 1", "Industry certification prep", "Practical skills bootcamp"],
        certifications: ["Industry standard certification", "Professional certification"],
        projects: ["Entry-level project 1", "Portfolio project", "Real-world application"],
        milestones: ["Get first job", "Complete first project", "Build professional network"],
        networking: ["Join professional communities", "Attend industry events", "Connect with professionals"],
        salaryRange: "₹3-10 LPA"
      },
      {
        id: "growth",
        title: "Growth Level (2-5 years)",
        duration: "2-3 years", 
        description: "Develop specialized skills and take on leadership responsibilities",
        skills: ["Advanced technical skills", "Leadership", "Strategic thinking", "Mentoring"],
        courses: ["Advanced specialization", "Leadership development", "Strategic thinking"],
        certifications: ["Advanced certification", "Leadership certificate"],
        projects: ["Lead major project", "Cross-functional initiative", "Innovation project"],
        milestones: ["Get promoted", "Lead a team", "Drive significant results"],
        networking: ["Speak at events", "Mentor others", "Build industry relationships"],
        salaryRange: "₹10-25 LPA"
      },
      {
        id: "leadership",
        title: "Leadership Level (5+ years)",
        duration: "3+ years",
        description: "Drive strategy and lead organizations",
        skills: ["Strategic leadership", "Organization building", "Executive communication", "Innovation"],
        courses: ["Executive leadership", "Strategic management", "Innovation leadership"],
        certifications: ["Executive certificate", "Strategic leadership"],
        projects: ["Transform organization", "Build teams", "Drive strategy"],
        milestones: ["Become executive", "Build successful teams", "Drive organizational change"],
        networking: ["Executive networks", "Board positions", "Industry leadership"],
        salaryRange: "₹25-60 LPA + equity"
      }
    ],
    longTermOptions: [
      `C-level executive in ${careerTitle}`,
      "Start own company",
      "Become industry consultant",
      "Join venture capital",
      "Board positions"
    ],
    keyCompanies: [
      "Google", "Microsoft", "Amazon", "Flipkart", "Zomato", "Paytm"
    ]
  };
}