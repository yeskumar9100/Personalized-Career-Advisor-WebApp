import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { MultiStepForm, FormData } from "./components/MultiStepForm";
import { RecommendationsPage } from "./components/RecommendationsPage";
import { CareerRoadmapPage } from "./components/CareerRoadmapPage";

type AppState = 'landing' | 'form' | 'recommendations' | 'roadmap';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<{ id: string; title: string } | null>(null);
  const [generatedRoadmaps, setGeneratedRoadmaps] = useState<Record<string, any>>({});

  const handleGetStarted = () => {
    setCurrentState('form');
  };

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    setCurrentState('recommendations');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setFormData(null);
  };

  const handleStartOver = () => {
    setCurrentState('landing');
    setFormData(null);
    setSelectedCareer(null);
    setGeneratedRoadmaps({});
  };

  const handleViewRoadmap = (careerId: string, careerTitle: string) => {
    setSelectedCareer({ id: careerId, title: careerTitle });
    setCurrentState('roadmap');
  };

  const handleBackToRecommendations = () => {
    setCurrentState('recommendations');
    setSelectedCareer(null);
  };

  const handleRoadmapReady = (careerId: string, roadmapData: any) => {
    setGeneratedRoadmaps(prev => ({
      ...prev,
      [careerId]: roadmapData
    }));
  };

  return (
    <div className="min-h-screen">
      {currentState === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentState === 'form' && (
        <MultiStepForm 
          onComplete={handleFormComplete} 
          onBack={handleBackToLanding}
        />
      )}
      
      {currentState === 'recommendations' && formData && (
        <RecommendationsPage 
          formData={formData} 
          onStartOver={handleStartOver}
          onViewRoadmap={handleViewRoadmap}
          onRoadmapReady={handleRoadmapReady}
        />
      )}

      {currentState === 'roadmap' && selectedCareer && (
        <CareerRoadmapPage
          careerId={selectedCareer.id}
          careerTitle={selectedCareer.title}
          roadmapData={generatedRoadmaps[selectedCareer.id]}
          onBack={handleBackToRecommendations}
        />
      )}
    </div>
  );
}