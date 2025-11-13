import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const Steps = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const pathName = usePathname();
    const getCurrentPath = () => {
    if (pathName.includes("signup/verify")) return 5;
    if (pathName.includes("signup/trade-only")) return 4;
    if (pathName.includes("signup/billing/delivery")) return 3;
    if (pathName.includes("signup/billing")) return 2;
    return 1;
  };

    //Top Progress Bar:
  const steps = [
    { id: 1, label: "Registration" },
    { id: 2, label: "Billing" },
    { id: 3, label: "Delivery" },
    { id: 4, label: "Trade Only" },
    { id: 5, label: "Verify" },
  ];

  const currentPath = getCurrentPath();
  return (
    <div>
      {/*Progress Bar top*/}
      <div className="flex items-center justify-center gap-6 mt-6">
        {steps.map((step, index) => {
          const isCompleted = currentPath > step.id;
          const isActive = currentPath === step.id;

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

                {/* connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-[calc(55%+0.75rem)] w-24 h-[4px] ${
                      currentStep > step.id ? "bg-green-500" : "bg-green-500"
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
