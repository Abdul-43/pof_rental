import React from "react";
import { formatPrice } from "../utils/priceUtils";

export default function CarCard({ car, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(car)}
      className={`cursor-pointer bg-white rounded-xl border p-4 flex flex-col justify-between ${
        isSelected
          ? "border-yellow-400 bg-yellow-50/20"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div>
        <div className="bg-gray-50 h-88 sm:h-96 rounded-lg flex items-center justify-center p-4 mb-4">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        <h3 className="font-bold text-lg text-gray-900">
          {car.name} ({car.year})
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {car.seats} Seats • {car.transmission}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block">Per Day</span>
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(car.pricePerDay)} AED
          </span>
        </div>

        <span
          className={`px-4 py-2 rounded text-xs font-bold ${
            isSelected ? "bg-black text-white" : "bg-yellow-400 text-black"
          }`}
        >
          {isSelected ? "SELECTED" : "SELECT"}
        </span>
      </div>
    </div>
  );
}
