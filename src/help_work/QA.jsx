import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function QA() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How is the currency conversion calculated?",
      answer:
        "All cost calculations use a fixed static exchange rate of 1 USD = 4,100 KHR (Cambodian Riel). Prices in USD are automatically multiplied by 4,100 to show the total in Riel.",
    },
    {
      question: "How does the AC BTU calculator determine required HP?",
      answer:
        "The calculator multiplies your room area (Length x Width) by the selected room condition factor (600–800 BTU/m²) and adds 500 BTU per occupant. If total BTU exceeds 24,000, it calculates the required number of 2.5 HP units.",
    },
    {
      question: "What safety factor is used in the Wire Size Calculator?",
      answer:
        "The Wire Size Calculator applies a standard +25% continuous load safety factor (1.25 multiplier) to the calculated operating current (Amps) before matching it to recommended wire gauge and circuit breaker sizes.",
    },
    {
      question: "How are fan quantity recommendations calculated?",
      answer:
        "The Fan Calculator divides the total room area by the recommended coverage area per fan (e.g., ~15 m² for ceiling fans, ~10 m² for standing/wall fans, ~8 m² for exhaust fans) and rounds up using Math.ceil().",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

        {/* Section Header matching image layout */}
        <div className="text-center max-w-[800px] mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-adlam text-black">
            <u>Help & Support</u>
          </h1>
          <div className="mt-4 space-y-1">
            <p className="text-xl sm:text-2xl font-bold text-green-800">
              <u>Q&A</u>
            </p>
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-black rounded-[10px] overflow-hidden bg-gray-100"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-4 font-inter font-bold flex justify-between items-center text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <span>{faq.question}</span>
                <span className="text-xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border-t border-gray-300 font-inter text-sm sm:text-base text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
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

export default QA;
