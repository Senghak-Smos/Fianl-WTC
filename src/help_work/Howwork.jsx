import { useEffect } from "react";
import { Link } from "react-router-dom";

function Howwork() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[90px] pb-12 px-4 min-h-screen flex flex-col justify-between">
      <div className="max-w-[800px] mx-auto w-full">
        <div className="max-w-[1000px] mx-auto mb-4">
          <Link
            to="/#footer"
            className="border-2 border-white shadow-lg inline-flex 
          items-center gap-2 px-2 py-1 bg-blue-400 text-white hover:bg-gray-300 text-black font-bold rounded-[10px] transition-all"
          >
            ← Back
          </Link>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-adlam text-black">
            <u>Help & Support</u>
          </h1>
          <div className="mt-4">
            <p className="text-xl sm:text-2xl font-bold text-green-800">
              <u>How It Works</u>
            </p>
          </div>
        </div>

        {/* Informational Cards */}
        <div className="space-y-6">
          {/* General Overview & Exchange Rate */}
          <div className="border-2 border-black rounded-[10px] p-5 bg-gray-100">
            <h2 className="text-xl font-bold text-blue-800 font-adlam mb-2">
              1. General Calculations & Currency
            </h2>
            <ul className="list-disc list-inside space-y-1 font-inter text-sm sm:text-base text-gray-800">
              <li>
                <strong>Area Calculation:</strong> Calculated as{" "}
                <code className="bg-gray-200 px-1 rounded">Length (m) × Width (m)</code>.
              </li>
              <li>
                <strong>Dual-Currency Conversion:</strong> All USD values are automatically converted to Cambodian Riel (KHR) using a fixed static rate of <strong>1 USD = 4,100 KHR</strong>.
              </li>
            </ul>
          </div>

          {/* AC Calculation */}
          <div className="border-2 border-black rounded-[10px] p-5 bg-gray-100">
            <h2 className="text-xl font-bold text-blue-800 font-adlam mb-2">
              2. Air Conditioner (BTU) Calculator
            </h2>
            <p className="font-inter text-sm sm:text-base text-gray-800 mb-2">
              Determines cooling needs based on room area, sunlight exposure, and occupancy:
            </p>
            <ul className="list-disc list-inside space-y-1 font-inter text-sm sm:text-base text-gray-800">
              <li>
                <strong>Base BTU:</strong> Room Area × Room Type Factor (600 BTU/m² for normal bedrooms, 700 BTU/m² for living rooms, 800 BTU/m² for sunny/glass rooms).
              </li>
              <li>
                <strong>Occupants:</strong> Adds +500 BTU per person.
              </li>
              <li>
                <strong>HP Conversion:</strong> Recommends 1.0 HP (≤9k BTU), 1.5 HP (≤12k BTU), 2.0 HP (≤18k BTU), or 2.5 HP (≤24k BTU). For higher loads, it calculates the number of multiple 2.5 HP units needed.
              </li>
            </ul>
          </div>

          {/* Fan Calculation */}
          <div className="border-2 border-black rounded-[10px] p-5 bg-gray-100">
            <h2 className="text-xl font-bold text-blue-800 font-adlam mb-2">
              3. Fan Estimator
            </h2>
            <p className="font-inter text-sm sm:text-base text-gray-800 mb-2">
              Calculates total required fan units by dividing the total room area by the coverage capacity of the selected fan type:
            </p>
            <ul className="list-disc list-inside space-y-1 font-inter text-sm sm:text-base text-gray-800">
              <li><strong>Ceiling Fan:</strong> ~15 m² / fan</li>
              <li><strong>Standing / Wall Fan:</strong> ~10 m² / fan</li>
              <li><strong>Exhaust Fan:</strong> ~8 m² / fan</li>
            </ul>
          </div>

          {/* Wire & Breaker Calculation */}
          <div className="border-2 border-black rounded-[10px] p-5 bg-gray-100">
            <h2 className="text-xl font-bold text-blue-800 font-adlam mb-2">
              4. Wire & Breaker Size Calculator
            </h2>
            <p className="font-inter text-sm sm:text-base text-gray-800 mb-2">
              Determines electrical current (Amps) and recommends safe wire gauge and circuit breaker sizes:
            </p>
            <ul className="list-disc list-inside space-y-1 font-inter text-sm sm:text-base text-gray-800">
              <li>
                <strong>Operating Current:</strong> Calculated as{" "}
                <code className="bg-gray-200 px-1 rounded">Wattage / (220V × 0.85 Power Factor)</code>.
              </li>
              <li>
                <strong>Safety Current:</strong> Applies a <strong>+25% safety buffer</strong> (1.25 multiplier) for continuous electrical loads.
              </li>
              <li>
                <strong>Recommended Wire/Breaker:</strong> Matches the safety current against standard electrical gauge tables (1.5mm², 2.5mm², 4.0mm², 6.0mm², 10.0mm²).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t border-gray-400/40 w-full max-w-[800px] mx-auto mt-12">
        <p className="text-gray-400 font-biorhyme text-xs sm:text-sm">
          2026 C-E-R. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Howwork;