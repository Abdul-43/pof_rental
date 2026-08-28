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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header onReset={resetBooking} />
      <StepHeader step={step} onStepClick={goToStep} />

      <div className="flex-1">
        {isBooked ? (
          <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-black bg-yellow-400 px-3 py-1 rounded">
                BOOKING CONFIRMED
              </span>
              <h1 className="text-2xl font-bold text-gray-900">
                Reservation Confirmed!
              </h1>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 text-left space-y-3 text-xs ">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                <img
                  src={booking.selectedCar?.image}
                  alt={booking.selectedCar?.name}
                  className="w-96 h-72 object-contain bg-gray-50 rounded p-2 border"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{booking.selectedCar?.name}</h3>
                  <br />
                  <p className="text-gray-500">
                    {rentalDays} Day(s) • Total Paid: <span className="font-bold text-gray-900">{formatPrice(totals.grandTotal)} AED</span>
                  </p>
                  <br />
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="px-3 py-1.5 border border-gray-300 text-gray-800 text-xs font-bold rounded hover:bg-gray-50"
                  >
                    Price details
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 font-bold block">PICKUP LOCATION</span>
                  <span className="font-semibold">{booking.pickupLocation}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block">RETURN LOCATION</span>
                  <span className="font-semibold">{booking.returnLocation || booking.pickupLocation}</span>
                </div>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded text-xs mx-auto block"
            >
              BOOK ANOTHER CAR
            </button>
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
