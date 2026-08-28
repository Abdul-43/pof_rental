import React from "react";
import { formatPrice, calcTotals } from "../utils/priceUtils";
import { formatDate } from "../utils/dateUtils";

export default function ReviewPage({
  booking,
  days,
  onOpenModal,
  onConfirm,
  onBack
}) {
  const totals = calcTotals(booking, days);
  const car = booking.selectedCar;
  const returnLoc = booking.returnLocation || booking.pickupLocation;

  if (!car) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-bold text-gray-500 block">STEP 5 OF 5</span>
          <h1 className="text-2xl font-bold text-gray-900">REVIEW AND CONFIRM</h1>
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

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
          Selected Vehicle
        </h3>

        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center border border-gray-200 h-[460px] sm:h-[500px] justify-center">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-contain max-h-[440px]"
          />
          <h4 className="font-bold text-gray-900 text-xl mt-3">
            {car.name} ({car.year})
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {car.seats} Seats • {car.transmission} • {car.fuel}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-y border-gray-100 py-4 text-gray-700">
          <div>
            <span className="text-gray-400 font-bold block">PICKUP</span>
            <span className="font-semibold text-sm">{booking.pickupLocation}</span>
            <span className="block text-gray-500 text-xs mt-0.5">
              {formatDate(booking.pickupDate)} at {booking.pickupTime}
            </span>
          </div>

          <div>
            <span className="text-gray-400 font-bold block">RETURN</span>
            <span className="font-semibold text-sm">{returnLoc}</span>
            <span className="block text-gray-500 text-xs mt-0.5">
              {formatDate(booking.returnDate)} at {booking.returnTime}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Vehicle Daily Rate</span>
            <span>{formatPrice(car.pricePerDay)} AED/day</span>
          </div>
          <div className="flex justify-between">
            <span>Base Rental ({days} {days === 1 ? "day" : "days"})</span>
            <span>{formatPrice(totals.baseRental)} AED</span>
          </div>
          <div className="flex justify-between">
            <span>Protection Package</span>
            <span>{formatPrice(totals.protectionTotal)} AED</span>
          </div>
          <div className="flex justify-between">
            <span>Extras Addons</span>
            <span>{formatPrice(totals.extrasTotal)} AED</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-gray-100">
            <span>5% VAT Tax</span>
            <span>{formatPrice(totals.tax)} AED</span>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-black flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 block">GRAND TOTAL</span>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(totals.grandTotal)} AED
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="text-xs font-bold text-black underline"
          >
            Price details
          </button>
        </div>

        <div className="pt-4 flex items-center justify-between gap-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 font-bold rounded text-xs"
          >
            ← BACK TO EXTRAS
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded text-sm"
          >
            CONFIRM / PURCHASE
          </button>
        </div>
      </div>
    </div>
  );
}
