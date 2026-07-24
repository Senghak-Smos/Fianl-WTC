import { Link } from "react-router-dom";
import hak from "../image/hak.png";
import fav from "../image/favorite.png";
import fac from "../image/facebook.png";
import git from "../image/github.png";
import tel from "../image/telegram.png";

function Owner() {
  return (
    <div className="pt-32 pb-16 px-4">
      <div className="text-center">
        <h1 className="font-adlam text-3xl sm:text-4xl">
          <u>Founder</u>
        </h1>
        <br />
        <p className="font-biorhyme text-gray-700">
          This project was created to solve room calculation challenges and
          enhance my development skills.
        </p>
      </div>
      <br />
      <br />

      {/* ============== cont pic hak ============ */}
      {/* Changed w-[700px] to max-w-[700px] w-full to stay fully responsive */}
      <div className="max-w-[700px] w-full mx-auto p-4 sm:p-6 rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <img
            src={hak}
            alt="Hak"
            className="rounded-full w-[100px] h-[100px] object-cover border-4 border-white 
                 shadow-[0px_0px_10px_rgba(0,0,0,0.3)] shrink-0"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-6 text-center sm:text-left">
            <div>
              <h1 className="font-adlam text-2xl sm:text-3xl text-blue-800">
                Nang Senghak
              </h1>
              <p className="font-inter text-sm sm:text-base">
                Developer
                <span className="ml-1 sm:ml-2 text-yellow-600 font-bold">
                  Front-End
                </span>{" "}
                &
                <span className="ml-1 sm:ml-2 text-yellow-600 font-bold">
                  Back-End.
                </span>
              </p>
              <img src={fav} className="w-[70px] mx-auto sm:mx-0 mt-1" alt="favorite" />
            </div>

            <div className="flex items-center gap-[10px]">
              <a 
                href="https://web.facebook.com/profile.php?id=61553474692079"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={fac}
                  alt="Facebook"
                  className="w-[45px] sm:w-[50px] border-2 border-white 
                shadow-[0px_0px_10px_rgba(0,0,0,0.2)] rounded-full
                hover:scale-110 cursor-pointer"
                />
              </a>
              <a 
                href="https://t.me/Senghaks"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={tel}
                  alt="Telegram"
                  className="w-[45px] sm:w-[50px] border-2 border-white 
                shadow-[0px_0px_10px_rgba(0,0,0,0.2)] rounded-full
                hover:scale-110 cursor-pointer"
                />
              </a>
              <a 
                href="https://github.com/Senghak-Smos"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={git}
                  alt="GitHub"
                  className="w-[45px] sm:w-[50px] border-2 border-white 
                shadow-[0px_0px_10px_rgba(0,0,0,0.2)] rounded-full
                hover:scale-110 cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="items-center mx-auto max-w-[550px] p-3 sm:p-5 text-center sm:text-left">
          <p className="font-inter leading-relaxed text-sm sm:text-base">
            Built as a passion project to simplify electrical room planning. My
            goal is to provide an efficient tool for everyone while advancing my
            full-stack development expertise. <br />
            <br />
            <span className="text-gray-500">
              Thank you for understanding and using it!
            </span>
          </p>
        </div>
      </div><br /><br /><br />
    </div>
  );
}

export default Owner;