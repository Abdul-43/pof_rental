import React from "react";
import { protections } from "../data/protections";
import ProtectionCard from "../components/ProtectionCard";
import { formatPrice, calcTotals } from "../utils/priceUtils";

export default function ProtectionPage({
  booking,
  setBooking,
  days,
  onOpenModal,
  onNext,
  onBack
}) {
  const selectProtection = (id) => {
    setBooking((prev) => ({
      ...prev,
      protection: id
    }));
  };

  const totals = calcTotals(booking, days);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-bold text-gray-500 block">
            STEP 3 OF 5
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            WHICH PROTECTION PACKAGE YOU NEED?
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Drivers must have held their driver's license for at least 1 year(s) for this vehicle.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-white p-3 rounded border border-gray-200">
          <div>
            <span className="text-[10px] text-gray-400 font-bold block">TOTAL PRICE</span>
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(totals.grandTotal)} AED
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenModal}
            className="px-3 py-1.5 border border-gray-300 text-gray-800 text-xs font-bold rounded hover:bg-gray-50"
          >
            Price details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {protections.map((pkg) => (
          <ProtectionCard
            key={pkg.id}
            pkg={pkg}
            isSelected={booking.protection === pkg.id}
            days={days}
            onSelect={selectProtection}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded text-xs"
        >
          ← BACK TO CARS
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded text-sm"
        >
          NEXT (EXTRAS) →
        </button>
      </div>
    </div>
  );
}
