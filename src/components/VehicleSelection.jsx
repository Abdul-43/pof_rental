import React from "react";
import { formatPrice } from "../utils/priceUtils";

export default function VehicleSelection({
  car,
  days,
  onOpenModal,
  onNext,
  onClose
}) {
  const baseTotal = car.pricePerDay * days;

  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 relative my-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          {car.name} ({car.year})
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 font-bold text-lg"
          >
            ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center border border-gray-200 h-[460px] sm:h-[500px] justify-center">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-contain max-h-[440px]"
          />
          <p className="text-xs text-gray-500 font-medium mt-3">
            {car.seats} Seats • {car.transmission} • {car.fuel}
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-gray-500 block">Payment Option</span>
              <h5 className="font-bold text-gray-900 text-sm">Best Price</h5>
              <p className="text-xs text-gray-500">Pay now, cancel anytime</p>
            </div>
            <span className="text-xs font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded">
              Included
            </span>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-gray-500 block">Mileage Option</span>
              <h5 className="font-bold text-gray-900 text-sm">250 KM Per Day</h5>
              <p className="text-xs text-gray-500">Extra: {car.priceExtraMileage} AED/KM</p>
            </div>
            <span className="text-xs font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded">
              Included
            </span>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 block">
                Base Price ({days} {days === 1 ? "Day" : "Days"})
              </span>
              <div className="text-xl font-bold text-gray-900">
                {formatPrice(baseTotal)} AED
              </div>
              <button
                type="button"
                onClick={onOpenModal}
                className="text-xs text-gray-700 underline font-semibold mt-0.5 block"
              >
                Price details
              </button>
            </div>

            <button
              onClick={onNext}
              className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded text-sm"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
