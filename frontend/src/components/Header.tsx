import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/user-reducer";
import { RootState } from "../store";
import { RiBardFill } from "react-icons/ri";
import clearConversation from "../helper/clearConversation";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { LuLoader2 } from "react-icons/lu";
import { FaCirclePlus } from "react-icons/fa6";
import axiosInstance from "../config/axiosConfig";
import playSound from "../utils/playSound";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const currentPath = window.location.pathname;
  // console.log(currentPath);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const logoutHandler = async () => {
    playSound();
    try {
      // const fetchResponse = await fetch(
      //   "http://localhost:5000/api/v1/user/logout",
      //   {
      //     method: "get",
      //     credentials: "include",
      //   }
      // );
      const fetchResponse = await axiosInstance.get("/user/logout");
      const dataRespose = fetchResponse.data;

      if (dataRespose.success) {
        toast.success(dataRespose.message);
        dispath(logout());
        navigate("/");
      } else {
        throw new Error(dataRespose.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message); // Error has a message property
      } else {
        toast.error("Something went Worg"); // Fallback for unknown errors
      }
    }
  };

  const [clearLoading, serClearLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const handleNewChat = async () => {
    playSound();
    try {
      serClearLoading(true);
      await clearConversation();
      await authContext?.fetchUserDatails();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message); // Error has a message property
      } else {
        toast.error("Something went Worg"); // Fallback for unknown errors
      }
    }
    serClearLoading(false);
  };

  return (
    <div className="flex items-center justify-between w-[90%] mx-auto my-2 ">
      <Link
        to="/"
        className="flex items-center gap-2 border-1"
        onClick={() => {
          playSound();
        }}
      >
        <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl rounded-full ">
          <RiBardFill />
        </h2>
        <h2 className="text-md sm:text-xl md:text-3xl  font-medium ">
          ChatGenius
        </h2>
      </Link>
      <div className="flex items-center text-base sm:text-md md:text-lg lg:text-xl">
        {user.loggedIn ? (
          <div className="flex items-center ">
            {currentPath === "/" && (
              <Link
                to={"/chat"}
                onClick={playSound}
                className="mx-5 rounded-md px-4 py-1 bg-green-500 shadow-md hover:text-green-500 hover:bg-white font-semibold"
              >
                Let's Chat
              </Link>
            )}
            {currentPath === "/chat" && (
              <button
                className="md:hidden flex  mx-5 rounded-md px-2 py-1 bg-green-500 shadow-md hover:text-green-500 hover:bg-white font-semibold"
                onClick={handleNewChat}
              >
                {clearLoading || (
                  <span className=" inline text-2xl">
                    <FaCirclePlus />
                  </span>
                )}
                {clearLoading && (
                  <span className=" animate-spin inline text-2xl">
                    <LuLoader2 />
                  </span>
                )}
              </button>
            )}
            <button
              onClick={logoutHandler}
              className=" rounded-md px-4 py-1 bg-green-500 shadow-md hover:text-green-500 hover:bg-white font-semibold"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            onClick={playSound}
            to="/login"
            className=" rounded-md px-4 py-1 bg-green-500 shadow-md hover:text-green-500 hover:bg-white font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
