import { useState } from "react";
import { Registration } from "./components/setup/registration";
import { Organization } from "./components/setup/organization";
import { WebsiteScraping } from "./components/setup/website-scraping";
import { Integration } from "./components/setup/integration";
import { motion } from "framer-motion";
import { Bot, Building2, Globe, Wrench } from "lucide-react";

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
      <nav className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BeyondChats</span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-12">
          <div className="mx-auto max-w-xl">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.label} className="flex flex-1 items-center">
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
                      <div className="absolute -bottom-6 whitespace-nowrap text-sm font-medium">{step.label}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && <div className={`h-0.5 flex-1 ${index < currentStep ? "bg-green-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center py-8">
          {currentStep === 0 && <Registration onComplete={handleNext} />}
          {currentStep === 1 && <Organization onComplete={handleNext} />}
          {currentStep === 2 && <WebsiteScraping onComplete={handleNext} />}
          {currentStep === 3 && <Integration />}
        </div>
      </main>
    </div>
  );
}

export default App;
