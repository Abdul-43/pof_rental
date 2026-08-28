import React from "react";
import SearchForm from "../components/SearchForm";

export default function SearchPage({ booking, setBooking, onNext }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Car Rental Booking
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <SearchForm
          booking={booking}
          setBooking={setBooking}
          onNext={onNext}
        />
      </div>
    </div>
  );
}
