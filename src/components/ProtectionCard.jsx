import React from "react";
import { Check, X } from "lucide-react";
import { formatPrice } from "../utils/priceUtils";

export default function ProtectionCard({
  pkg,
  isSelected,
  days,
  onSelect
}) {
  const total = pkg.pricePerDay * days;

  return (
    <div
      onClick={() => onSelect(pkg.id)}
      className={`cursor-pointer bg-white rounded-xl border p-5 flex flex-col justify-between ${
        isSelected
          ? "border-yellow-400 bg-yellow-50/20"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div>
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 text-base">
            {pkg.name}
          </h4>
          <span className="text-xs text-gray-500 font-semibold block mt-0.5">
            {pkg.isIncluded ? "Included" : `${formatPrice(pkg.pricePerDay)} AED/day`}
          </span>
        </div>

        <ul className="space-y-2.5 my-4 border-t border-gray-100 pt-3 text-xs font-medium">
          {pkg.features.map((feat, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              {feat.included ? (
                <Check className="w-4 h-4 text-black" />
              ) : (
                <X className="w-4 h-4 text-gray-300" />
              )}
              <span className={feat.included ? "text-gray-900 font-medium" : "text-gray-400 line-through"}>
                {feat.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[11px] text-gray-400 block font-medium">
            Total ({days} {days === 1 ? "Day" : "Days"})
          </span>
          <div className="text-base font-bold text-gray-900">
            {pkg.isIncluded ? "Included" : `${formatPrice(total)} AED`}
          </div>
        </div>

        <button
          type="button"
          className={`px-4 py-2 rounded text-xs font-bold ${
            isSelected ? "bg-black text-white" : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
        >
          {isSelected ? "SELECTED" : "SELECT"}
        </button>
      </div>
    </div>
  );
}
