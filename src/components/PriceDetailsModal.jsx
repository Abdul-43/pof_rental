import React from "react";
import { formatPrice, calcTotals } from "../utils/priceUtils";

export default function PriceDetailsModal({ isOpen, onClose, booking, days }) {
  if (!isOpen) return null;

  const prices = calcTotals(booking, days);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-md border border-gray-200 relative">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Price Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5 text-sm text-gray-700">
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Daily Average Price</span>
            <span className="font-semibold">{formatPrice(prices.pricePerDay)} AED/Day</span>
          </div>

          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Payment Option</span>
            <span className="font-semibold">0 AED</span>
          </div>

          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Mileage Option</span>
            <span className="font-semibold">0 AED</span>
          </div>

          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Protection Package</span>
            <span className="font-semibold">{formatPrice(prices.protectionTotal)} AED</span>
          </div>

          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Extra Addons</span>
            <span className="font-semibold">{formatPrice(prices.extrasTotal)} AED</span>
          </div>

          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Membership Discount</span>
            <span className="text-gray-400">0%</span>
          </div>

          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Rental Days</span>
            <span className="font-semibold">{days} Day(s)</span>
          </div>

          <div className="flex justify-between py-1 border-b border-gray-100 text-gray-600">
            <span>Tax Amount (5% VAT)</span>
            <span className="font-semibold">{formatPrice(prices.tax)} AED</span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 block">TOTAL (INCL. TAX)</span>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(prices.grandTotal)} AED
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white font-bold text-xs rounded hover:bg-gray-800"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
