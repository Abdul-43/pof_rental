import React, { useState } from "react";

export const LOCATIONS = [
  "Dubai Sheikh Zayed Road",
];

export default function SearchForm({ booking, setBooking, onNext }) {
  const [error, setError] = useState("");

  const onChange = (field, val) => {
    setError("");
    setBooking((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!booking.pickupLocation) {
      setError("Please select a pickup location.");
      return;
    }
    if (!booking.pickupDate || !booking.pickupTime) {
      setError("Please select pickup date and time.");
      return;
    }
    if (!booking.returnDate || !booking.returnTime) {
      setError("Please select return date and time.");
      return;
    }

    const start = new Date(`${booking.pickupDate}T${booking.pickupTime}`);
    const end = new Date(`${booking.returnDate}T${booking.returnTime}`);

    if (end < start) {
      setError("Return date & time cannot be earlier than pickup date & time.");
      return;
    }

    onNext();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
          Select Dates & Rental Locations
        </h2>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              PICKUP LOCATION *
            </label>
            <select
              value={booking.pickupLocation}
              onChange={(e) => onChange("pickupLocation", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
            >
              <option value="">Select Pickup Location</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-700">
                RETURN LOCATION
              </label>
            </div>
            <select
              value={booking.returnLocation}
              onChange={(e) => onChange("returnLocation", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
            >
              <option value="">Same as Pickup Location ({booking.pickupLocation || "Selected Location"})</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              PICKUP DATE *
            </label>
            <input
              type="date"
              value={booking.pickupDate}
              onChange={(e) => onChange("pickupDate", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              PICKUP TIME *
            </label>
            <input
              type="time"
              value={booking.pickupTime}
              onChange={(e) => onChange("pickupTime", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              RETURN DATE *
            </label>
            <input
              type="date"
              value={booking.returnDate}
              onChange={(e) => onChange("returnDate", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              RETURN TIME *
            </label>
            <input
              type="time"
              value={booking.returnTime}
              onChange={(e) => onChange("returnTime", e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded text-sm"
          >
            SHOW CARS
          </button>
        </div>
      </form>
    </div>
  );
}
