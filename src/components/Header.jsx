import React from "react";

export default function Header({ onReset }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onReset}
            className="flex items-center focus:outline-none py-2"
            aria-label="POF Rental Home"
          >
            <img
              src="https://www.pofrental.com/_next/static/media/pof-logo.0j2c~8-.iyd~~.png"
              alt="POF Rental"
              className="h-9 w-auto object-contain"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
