import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthProviders";

interface StepsProps {
  currentStep: number;
}

const Steps = ({ currentStep }: StepsProps) => {
  const { tradeOnly } = useAuth();

  const steps = [
    { id: 1, label: "Registration" },
    { id: 2, label: "Billing" },
    { id: 3, label: "Delivery" },
    { id: 4, label: "Trade Only" },
    { id: 5, label: "Verify" },
  ];
  
  const steps2 = [
    { id: 1, label: "Registration" },
    { id: 2, label: "Billing" },
    { id: 3, label: "Delivery" },
    { id: 4, label: "Verify" },
  ];

  return (
    <div className="hidden xl:block w-full px-2 sm:px-4 lg:px-6">
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 mt-6 overflow-x-auto">
        {tradeOnly
          ? steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center justify-center flex-shrink-0">
                  <div
                    className={`flex flex-col items-center relative ${
                      index !== steps.length - 1 ? "mr-1 sm:mr-2 md:mr-3 xl:mr-6" : ""
                    }`}
                  >
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 flex items-center justify-center rounded-full border-4 sm:border-6 md:border-7 xl:border-8 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isActive
                          ? "border-green-500 text-green-600"
                          : "border-green-500 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                      ) : (
                        <span className="text-xs sm:text-sm md:text-base">{step.id}</span>
                      )}
                    </div>

                    <div
                      className={`mt-1 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
                        isCompleted || isActive
                          ? "bg-gradient-to-r from-green-700 to-lime-400 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.label}
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-2 sm:top-2.5 md:top-3.5 lg:top-4 xl:top-5 left-[calc(55%+0.25rem)] sm:left-[calc(55%+0.35rem)] md:left-[calc(55%+0.5rem)] lg:left-[calc(55%+0.65rem)] xl:left-[calc(55%+0.75rem)] w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-[3px] sm:h-[4px] ${
                          currentStep > step.id
                            ? "bg-green-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    )}
                  </div>
                </div>
              );
            })
          : steps2.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div
                    className={`flex flex-col items-center relative ${
                      index !== steps2.length - 1 ? "mr-1 sm:mr-2 md:mr-3 xl:mr-6" : ""
                    }`}
                  >
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 flex items-center justify-center rounded-full border-4 sm:border-6 md:border-7 xl:border-8 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isActive
                          ? "border-green-500 text-green-600"
                          : "border-green-500 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                      ) : (
                        <span className="text-xs sm:text-sm md:text-base">{step.id}</span>
                      )}
                    </div>

                    <div
                      className={`mt-1 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
                        isCompleted || isActive
                          ? "bg-gradient-to-r from-green-700 to-lime-400 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.label}
                    </div>

                    {index < steps2.length - 1 && (
                      <div
                        className={`absolute top-2 sm:top-2.5 md:top-3.5 lg:top-4 xl:top-5 left-[calc(55%+0.25rem)] sm:left-[calc(55%+0.35rem)] md:left-[calc(55%+0.5rem)] lg:left-[calc(55%+0.65rem)] xl:left-[calc(55%+0.75rem)] w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-[3px] sm:h-[4px] ${
                          currentStep > step.id
                            ? "bg-green-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Steps;