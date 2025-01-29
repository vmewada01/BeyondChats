import { useState } from "react";
import { Registration } from "./components/setup/registration";
import { Organization } from "./components/setup/organization";
import { WebsiteScraping } from "./components/setup/website-scraping";
import { Integration } from "./components/setup/integration";
import { motion } from "framer-motion";
import { Bot, Building2, Globe, Wrench } from "lucide-react";
import Navbar from "./components/ui/Navbar";

interface StepperProps {
  currentStep: number;
  steps: typeof steps;
}
interface StepContentProps {
  currentStep: number;
  handleNext: () => void;
  setCurrentStep: (step: number) => void;
}

const steps = [
  { icon: Bot, label: "Registration" },
  { icon: Building2, label: "Organization" },
  { icon: Globe, label: "Website Analysis" },
  { icon: Wrench, label: "Integration" },
] as const;

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setCurrentStep={setCurrentStep} />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Stepper currentStep={currentStep} steps={steps} />
        <StepContent currentStep={currentStep} handleNext={handleNext} setCurrentStep={setCurrentStep} />
      </main>
    </div>
  );
}

export default App;

const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="mb-12">
      <div className="mx-auto max-w-xl">
        <div className="flex justify-between items-center align-middle">
          {steps.map((step, index) => (
            <div key={step.label} className="flex flex-1 items-center ml-10">
              <div className={`flex items-center ${index === currentStep ? "text-blue-600" : index < currentStep ? "text-green-600" : "text-gray-400"}`}>
                <div className="relative flex items-center justify-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: index === currentStep ? 1.2 : 1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <step.icon className="h-6 w-6" />
                  </motion.div>
                  <div className="absolute -bottom-6 whitespace-nowrap text-sm font-medium hidden sm:block">{step.label}</div>
                </div>
              </div>
              {index < steps.length - 1 && <div className={`h-0.5 flex-1 ${index < currentStep ? "bg-green-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StepContent = ({ currentStep, handleNext, setCurrentStep }: StepContentProps) => {
  return (
    <div className="flex justify-center py-8">
      {currentStep === 0 && <Registration onComplete={handleNext} />}
      {currentStep === 1 && <Organization onComplete={handleNext} />}
      {currentStep === 2 && <WebsiteScraping onComplete={handleNext} />}
      {currentStep === 3 && <Integration setCurrentStep={setCurrentStep} />}
    </div>
  );
};
