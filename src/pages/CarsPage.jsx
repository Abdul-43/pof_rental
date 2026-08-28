import React, { useState } from "react";
import carsData from "../data/cars.json";
import CarCard from "../components/CarCard";
import VehicleSelection from "../components/VehicleSelection";

export default function CarsPage({
  booking,
  setBooking,
  days,
  onOpenModal,
  onNext,
  onBack
}) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");

  const brands = ["all", ...new Set(carsData.map((c) => c.name.split(" ")[0]))];

  const filteredCars = carsData.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brand === "all" || car.name.startsWith(brand);
    return matchesSearch && matchesBrand;
  });

  const selectCar = (car) => {
    setBooking((prev) => ({
      ...prev,
      selectedCar: car
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-xs rounded"
        >
          ← BACK TO SEARCH
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <input
          type="text"
          placeholder="Search model (e.g. Ferrari)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs w-full px-3 py-2 bg-white border border-gray-300 rounded text-xs focus:outline-none"
        />

        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`px-3 py-1 rounded text-xs font-bold capitalize ${
                brand === b ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Available Vehicles ({filteredCars.length})
        </h3>

        {filteredCars.length === 0 ? (
          <div className="bg-white rounded border border-gray-200 p-8 text-center text-gray-500 text-sm">
            No vehicles match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => {
              const isSelected = booking.selectedCar?.id === car.id;
              return (
                <React.Fragment key={car.id}>
                  <CarCard
                    car={car}
                    isSelected={isSelected}
                    onSelect={(selected) => {
                      if (isSelected) {
                        selectCar(null);
                      } else {
                        selectCar(selected);
                      }
                    }}
                  />
                  {isSelected && (
                    <div className="col-span-full">
                      <VehicleSelection
                        car={car}
                        days={days}
                        onOpenModal={onOpenModal}
                        onNext={onNext}
                        onClose={() => selectCar(null)}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
