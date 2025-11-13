import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthProviders";

interface StepsProps {
  currentStep: number;  // Accepts current step directly as a prop
}

const Steps = ({ currentStep }: StepsProps) => {
  const { tradeOnly } = useAuth();

  // Steps depending on tradeOnly value
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
    <div>
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-6 mt-6">
        {tradeOnly
          ? steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center relative ${
                      index !== steps.length - 1 ? "mr-6" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-8 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isActive
                          ? "border-green-500 text-green-600"
                          : "border-green-500 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={22} />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>

                    <div
                      className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                        isCompleted || isActive
                          ? "bg-gradient-to-r from-green-700 to-lime-400 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.label}
                    </div>

                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-5 left-[calc(55%+0.75rem)] w-24 h-[4px] ${
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
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center relative ${
                      index !== steps2.length - 1 ? "mr-6" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-8 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isActive
                          ? "border-green-500 text-green-600"
                          : "border-green-500 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={22} />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>

                    <div
                      className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                        isCompleted || isActive
                          ? "bg-gradient-to-r from-green-700 to-lime-400 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.label}
                    </div>

                    {/* Connector line */}
                    {index < steps2.length - 1 && (
                      <div
                        className={`absolute top-5 left-[calc(55%+0.75rem)] w-24 h-[4px] ${
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
