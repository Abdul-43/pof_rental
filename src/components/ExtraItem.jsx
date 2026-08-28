import React from "react";
import { formatPrice } from "../utils/priceUtils";

export default function ExtraItem({ extra, val, days, onChange }) {
  const hasQty = extra.isQuantity;
  const qty = typeof val === "number" ? val : 0;
  const added = typeof val === "boolean" ? val : qty > 0;

  const cost = hasQty
    ? extra.price * qty * days
    : extra.type === "PerDay"
    ? extra.price * days
    : extra.price;

  return (
    <div
      className={`bg-white rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        added ? "border-yellow-400" : "border-gray-200"
      }`}
    >
      <div>
        <div className="flex items-center space-x-2">
          <h4 className="font-bold text-gray-900 text-sm">{extra.name}</h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {extra.type === "PerDay" ? "PER DAY" : "ONE TIME"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">
            {formatPrice(extra.price)} AED
          </div>
          {added && (
            <span className="text-xs font-semibold text-gray-900 block">
              Total: {formatPrice(cost)} AED
            </span>
          )}
        </div>

        {hasQty ? (
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded border border-gray-300">
            <button
              type="button"
              onClick={() => onChange(extra.id, Math.max(0, qty - 1))}
              disabled={qty === 0}
              className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center font-bold text-xs disabled:opacity-40"
            >
              -
            </button>
            <span className="w-6 text-center text-xs font-bold text-gray-900">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => onChange(extra.id, qty + 1)}
              className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center font-bold text-xs text-black"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onChange(extra.id, !added)}
            className={`px-3 py-1.5 rounded text-xs font-bold ${
              added ? "bg-black text-white" : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {added ? "ADDED" : "ADD"}
          </button>
        )}
      </div>
    </div>
  );
}
