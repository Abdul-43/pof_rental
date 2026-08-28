import React from "react";
import { Check } from "lucide-react";

export default function StepHeader({ step, onStepClick }) {
  const steps = [
    { number: 1, title: "Search" },
    { number: 2, title: "Select Car" },
    { number: 3, title: "Protection" },
    { number: 4, title: "Extras" },
    { number: 5, title: "Review & Confirm" }
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav>
          <ol className="flex items-center justify-between w-full text-xs sm:text-sm font-medium">
            {steps.map((item, idx) => {
              const done = step > item.number;
              const active = step === item.number;
              const canClick = item.number < step;

              return (
                <li key={item.number} className="flex-1 flex items-center">
                  <button
                    disabled={!canClick}
                    onClick={() => canClick && onStepClick(item.number)}
                    className={`flex items-center space-x-2 text-left ${
                      canClick ? "cursor-pointer hover:text-black" : "cursor-default"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        done
                          ? "bg-black text-white"
                          : active
                          ? "bg-yellow-400 text-black font-bold"
                          : "bg-gray-100 text-gray-400 border border-gray-200"
                      }`}
                    >
                      {done ? <Check className="w-4 h-4 text-white" /> : item.number}
                    </span>
                    <span
                      className={`hidden sm:inline font-semibold ${
                        active
                          ? "text-gray-900 font-bold"
                          : done
                          ? "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                  {idx < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 sm:mx-4 ${
                        item.number < step ? "bg-black" : "bg-gray-200"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
