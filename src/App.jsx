import React, { useState } from "react";
import Header from "./components/Header";
import StepHeader from "./components/StepHeader";
import PriceDetailsModal from "./components/PriceDetailsModal";

import SearchPage from "./pages/SearchPage";
import CarsPage from "./pages/CarsPage";
import ProtectionPage from "./pages/ProtectionPage";
import ExtrasPage from "./pages/ExtrasPage";
import ReviewPage from "./pages/ReviewPage";

import { calcDays, getToday, getTomorrow } from "./utils/dateUtils";
import { formatPrice, calcTotals } from "./utils/priceUtils";
import { LOCATIONS } from "./components/SearchForm";

export default function App() {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const [booking, setBooking] = useState({
    pickupLocation: LOCATIONS[0],
    returnLocation: LOCATIONS[0],
    pickupDate: getToday(),
    pickupTime: "01:00",
    returnDate: getTomorrow(),
    returnTime: "01:00",

    selectedCar: null,
    paymentOption: "best-price",
    mileageOption: "250km",
    protection: "basic",

    extras: {
      freeDeposit: false,
      delivery: false,
      pickup: false,
      additionalDriver: false,
      babySeat: 0
    }
  });

  const rentalDays = calcDays(
    booking.pickupDate,
    booking.pickupTime,
    booking.returnDate,
    booking.returnTime
  );

  const nextStep = () => {
    setStep((prev) => Math.min(5, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (num) => {
    if (num < step) {
      setStep(num);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetBooking = () => {
    setIsBooked(false);
    setStep(1);
    setBooking((prev) => ({
      ...prev,
      selectedCar: null,
      protection: "basic",
      extras: {
        freeDeposit: false,
        delivery: false,
        pickup: false,
        additionalDriver: false,
        babySeat: 0
      }
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totals = calcTotals(booking, rentalDays);
  console.log(step, "step")
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header onReset={resetBooking} />
      {isBooked ? null : <StepHeader step={step} onStepClick={goToStep} />}

      <div className="flex-1">
        {isBooked ? (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <span className="text-xs font-bold bg-yellow-400 px-3 py-1 rounded inline-block">
                  BOOKING CONFIRMED
                </span>
                <h1 className="text-2xl font-bold mt-1">Reservation Confirmed!</h1>
              </div>

              <div className="flex items-center space-x-4 bg-white p-3 rounded border border-gray-200">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block">TOTAL PRICE</span>
                  <div className="text-lg font-bold">
                    {formatPrice(totals.grandTotal)} AED
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-3 py-1.5 border border-gray-300 text-xs font-bold rounded hover:bg-gray-50"
                >
                  Price details
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="text-base font-bold border-b border-gray-100 pb-2">
                Selected Vehicle
              </h3>

              <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center border border-gray-200 h-[460px] sm:h-[500px] justify-center">
                <img
                  src={booking.selectedCar?.image}
                  alt={booking.selectedCar?.name}
                  className="w-full h-full object-contain max-h-[440px]"
                />
                <h4 className="font-bold text-xl mt-3">
                  {booking.selectedCar?.name} ({booking.selectedCar?.year})
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {booking.selectedCar?.seats} Seats • {booking.selectedCar?.transmission} • {booking.selectedCar?.fuel}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-y border-gray-100 py-4 text-gray-700">
                <div>
                  <span className="text-gray-400 font-bold block">PICKUP LOCATION</span>
                  <span className="font-semibold text-sm">{booking.pickupLocation}</span>
                </div>

                <div>
                  <span className="text-gray-400 font-bold block">RETURN LOCATION</span>
                  <span className="font-semibold text-sm">{booking.returnLocation || booking.pickupLocation}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={resetBooking}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded text-sm"
                >
                  BOOK ANOTHER CAR
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <SearchPage
                booking={booking}
                setBooking={setBooking}
                onNext={nextStep}
              />
            )}

            {step === 2 && (
              <CarsPage
                booking={booking}
                setBooking={setBooking}
                days={rentalDays}
                onOpenModal={() => setShowModal(true)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 3 && (
              <ProtectionPage
                booking={booking}
                setBooking={setBooking}
                days={rentalDays}
                onOpenModal={() => setShowModal(true)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 4 && (
              <ExtrasPage
                booking={booking}
                setBooking={setBooking}
                days={rentalDays}
                onOpenModal={() => setShowModal(true)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 5 && (
              <ReviewPage
                booking={booking}
                days={rentalDays}
                onOpenModal={() => setShowModal(true)}
                onConfirm={() => setIsBooked(true)}
                onBack={prevStep}
              />
            )}
          </>
        )}
      </div>

      <PriceDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        booking={booking}
        days={rentalDays}
      />
    </div>
  );
}
