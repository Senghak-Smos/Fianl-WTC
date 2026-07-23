import { Link } from "react-router-dom";

function Service() {
  return (
    
    <div id="service" className="pt-16 pb-16 scroll-mt-[100px]">
      <div className="text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-adlam">
          <u>Our Service</u>
        </h1>
        <br />
        <p className="font-biorhyme text-gray-700">
          Everyone can find your Service for solving bellow.
        </p>
      </div>
      <br />
      <br />

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-8 max-w-[1200px] mx-auto">
        {/* ===== 1 ===== */}
        <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.2)] p-6 text-center rounded-[10px] bg-white flex flex-col justify-between items-center">
          <div>
            <h1 className="font-adlam text-2xl text-blue-600">
              Lighting Requirement
            </h1>
            <br />
            <p className="font-inter text-gray-700">
              Calculate optimal lumens and number of LED bulbs based on your room
              area and purpose.
            </p>
          </div>
          <br />
          <Link to="/lighting">
            <button
              className="border-2 border-white px-5 py-1 
              rounded-[40px] bg-blue-600 font-bold text-white 
              shadow-[0px_0px_10px_rgba(0,0,0,0.3)] 
              hover:scale-110 
              hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              Cal Now!
            </button>
          </Link>
        </div>

        {/* ===== 2 ===== */}
        <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.2)] p-6 text-center rounded-[10px] bg-white flex flex-col justify-between items-center">
          <div>
            <h1 className="font-adlam text-2xl text-blue-600">
              Air Conditioner Sizing
            </h1>
            <br />
            <p className="font-inter text-gray-700">
              Determine the exact BTU and Horsepower (HP) required for efficient
              cooling.
            </p>
          </div>
          <br />
          <Link to="/air">
            <button
              className="shadow-[0px_0px_10px_rgba(0,0,0,0.2)] border-2 border-white px-5 py-1 
              rounded-[40px] bg-blue-600 font-bold text-white 
              shadow-[0px_0px_10px_rgba(0,0,0,0.3)] 
              hover:scale-110 
              hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              Cal Now!
            </button>
          </Link>
        </div>

        {/* ===== 3 ===== */}
        <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.2)] p-6 text-center rounded-[10px] bg-white flex flex-col justify-between items-center">
          <div>
            <h1 className="font-adlam text-2xl text-blue-600">
              Fan Estimation
            </h1>
            <br />
            <p className="font-inter text-gray-700">
              Recommend the right number and type of fans for optimal air
              circulation.
            </p>
          </div>
          <br />
          <Link to="/fan">
            <button
              className="border-2 border-white px-5 py-1 
              rounded-[40px] bg-blue-600 font-bold text-white 
              shadow-[0px_0px_10px_rgba(0,0,0,0.3)] 
              hover:scale-110 
              hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              Cal Now!
            </button>
          </Link>
        </div>

        {/* ===== 4 ===== */}
        <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.2)] p-6 text-center rounded-[10px] bg-white flex flex-col justify-between items-center">
          <div>
            <h1 className="font-adlam text-2xl text-blue-600">
              Wire Length & Size
            </h1>
            <br />
            <p className="font-inter text-gray-700">
              Estimate cable lengths and recommended wire gauge sizes (mm²) for
              safe setup.
            </p>
          </div>
          <br />
          <Link to="/wire">
            <button
              className="font-bold border-2 border-white px-5 py-1 
              rounded-[40px] bg-blue-600 text-white 
              shadow-[0px_0px_10px_rgba(0,0,0,0.3)] 
              hover:scale-110 
              hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              Cal Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Service;