import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";

export interface FormData {
  interests: string[];
  educationLevel: string;
  currentClass: string;
  stream: string;
  subjects: string[];
  skills: string[];
  workStyle: string;
  location: string;
}

interface MultiStepFormProps {
  onComplete: (data: FormData) => void;
  onBack: () => void;
}

const INTERESTS = [
  "Technology & Computers", "Healthcare & Medicine", "Business & Finance", "Creative Arts & Design",
  "Science & Research", "Education & Teaching", "Sports & Fitness", "Social Service",
  "Engineering", "Law & Justice", "Media & Communication", "Environment & Nature"
];

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics",
  "English", "Hindi", "History", "Geography", "Political Science", "Psychology",
  "Commerce", "Accountancy", "Business Studies", "Arts & Crafts"
];

const SKILLS = [
  "Problem Solving", "Communication", "Leadership", "Creativity", "Analytical Thinking",
  "Teamwork", "Public Speaking", "Technical Skills", "Research", "Writing",
  "Mathematical Skills", "Artistic Skills", "Organization", "Time Management"
];

export function MultiStepForm({ onComplete, onBack }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    interests: [],
    educationLevel: "",
    currentClass: "",
    stream: "",
    subjects: [],
    skills: [],
    workStyle: "",
    location: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, newArray);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.interests.length > 0;
      case 2: return formData.educationLevel && formData.currentClass;
      case 3: return formData.subjects.length > 0;
      case 4: return formData.skills.length > 0 && formData.workStyle;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

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
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 border-0 shadow-lg">
            {/* Step 1: Interests */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What interests you most?</h2>
                <p className="text-gray-600 mb-6">Select all areas that spark your curiosity and passion.</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {INTERESTS.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={() => toggleArrayItem('interests', interest)}
                      />
                      <label htmlFor={interest} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>

                {formData.interests.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Selected interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="bg-blue-100 text-blue-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your education</h2>
                <p className="text-gray-600 mb-6">Help us understand your current academic level.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Education Level</label>
                    <Select value={formData.educationLevel} onValueChange={(value) => updateFormData('educationLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="secondary">Secondary School (Classes 9-10)</SelectItem>
                        <SelectItem value="senior-secondary">Senior Secondary (Classes 11-12)</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Current Class/Year</label>
                    <Select value={formData.currentClass} onValueChange={(value) => updateFormData('currentClass', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current class/year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">Class 9</SelectItem>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                        <SelectItem value="1st-year">1st Year</SelectItem>
                        <SelectItem value="2nd-year">2nd Year</SelectItem>
                        <SelectItem value="3rd-year">3rd Year</SelectItem>
                        <SelectItem value="4th-year">4th Year</SelectItem>
                        <SelectItem value="masters">Master's</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.educationLevel === 'senior-secondary' || formData.educationLevel === 'undergraduate') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Stream</label>
                      <Select value={formData.stream} onValueChange={(value) => updateFormData('stream', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your stream" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="commerce">Commerce</SelectItem>
                          <SelectItem value="arts">Arts/Humanities</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Subjects */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Which subjects do you enjoy?</h2>
                <p className="text-gray-600 mb-6">Select the subjects you find most interesting or excel in.</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {SUBJECTS.map(subject => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={formData.subjects.includes(subject)}
                        onCheckedChange={() => toggleArrayItem('subjects', subject)}
                      />
                      <label htmlFor={subject} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {subject}
                      </label>
                    </div>
                  ))}
                </div>

                {formData.subjects.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Selected subjects:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.subjects.map(subject => (
                        <Badge key={subject} variant="secondary" className="bg-green-100 text-green-800">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Skills & Preferences */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your strengths?</h2>
                <p className="text-gray-600 mb-6">Select skills you have or would like to develop.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">Skills & Aptitudes</label>
                    <div className="grid grid-cols-2 gap-3">
                      {SKILLS.map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={formData.skills.includes(skill)}
                            onCheckedChange={() => toggleArrayItem('skills', skill)}
                          />
                          <label htmlFor={skill} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Work Style Preference</label>
                    <Select value={formData.workStyle} onValueChange={(value) => updateFormData('workStyle', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How do you prefer to work?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team">Working in teams</SelectItem>
                        <SelectItem value="independent">Working independently</SelectItem>
                        <SelectItem value="mixed">Mix of both</SelectItem>
                        <SelectItem value="leadership">Leading others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Preferred Work Location</label>
                    <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Where would you like to work?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metro">Metro cities (Mumbai, Delhi, Bangalore)</SelectItem>
                        <SelectItem value="tier2">Tier 2 cities</SelectItem>
                        <SelectItem value="hometown">My hometown</SelectItem>
                        <SelectItem value="flexible">Flexible/Remote</SelectItem>
                        <SelectItem value="international">International opportunities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.skills.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Selected skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentStep === 1 ? 'Back to Home' : 'Previous'}
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                {currentStep === totalSteps ? 'Get My Recommendations' : 'Next'}
                {currentStep < totalSteps && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}