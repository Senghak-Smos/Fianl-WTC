import room from "../image/home_room.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleStartNow = () => {
    if (user) {
      navigate("/#service");

      setTimeout(() => {
        const serviceSection = document.getElementById("service");
        if (serviceSection) {
          serviceSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);

    } else {
      navigate("/login");
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 px-4 max-w-[1280px] mx-auto min-h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 text-center lg:text-left">
        {/* Image Wrapper */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={room}
            alt="Home Room"
            className="up-down-homw w-full max-w-[600px] rounded-[10px] border-2 border-white shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Content Wrapper */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-adlam font-bold text-gray-900">
            Welcome to C-E-R
          </h1>
          <p className="left-right text-blue-700 font-bold text-lg sm:text-xl">
            We provide calculation for room electrical requirements.
          </p>
          <p className="max-w-[500px] font-biorhyme text-gray-600 leading-relaxed">
            We provide fast, accurate calculations for room electrical
            requirements including Lighting, AC BTU sizing, Fan estimation, and
            Wire sizing.
          </p>

          {/* Button Start Now */}
          <div className="mt-2 flex justify-center">
            <button
              onClick={handleStartNow}
              className="text-white font-bold bg-green-700 border-2 border-white px-6 py-2.5 rounded-[20px] 
                         hover:scale-110 hover:bg-blue-600 transition duration-300 shadow-md cursor-pointer"
            >
              Start Now!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;