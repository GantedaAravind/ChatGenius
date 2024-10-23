import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosConfig";
import { RootState } from "../store";
import playSound from "../utils/playSound";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    playSound();
    try {
      setLoading(true);
      // console.log(email, password);
      // const fetchResponse = await fetch(
      //   "http://localhost:5000/api/v1/user/login",
      //   {
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email,
      //       password,
      //     }),
      //     credentials: "include",
      //   }
      // );

      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      const dataRespose = response.data;

      if (dataRespose.success) {
        toast.success(dataRespose.message);
        authContext?.fetchUserDatails();
        navigate("/chat");
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
    setLoading(false);
  };

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/chat");
    }
  }, [user]);

  return (
    <div className="mx-auto  rounded-md flex  w-fit items-center mt-16">
      <div className="w-96 hidden md:block ">
        <img src="/robott.png" alt="Login" className="transform scale-x-[-1]" />
      </div>
      <div className=" h-full my-auto  rounded-xl p-4 border md:border-none shadowGreen ">
        <h2 className="text-md sm:text-lg  md:text-xl lg:text-2xl text-center font-medium">
          Login
        </h2>
        <form className="my-auto w-80 sm:w-96 flex flex-col mx-3">
          <div className="my-3 text-sm sm:text-base md:text-md lg:text-lg">
            <label
              htmlFor="email"
              className="block font-semibold cursor-pointer"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="focus:rounded-md outline-none bg-[#05101c] my-2 border-b-2  p-2 focus:bg-white focus:text-[#05101c] w-full  py-2"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3 text-sm sm:text-base md:text-md lg:text-lg">
            <label
              htmlFor="password"
              className="block font-semibold cursor-pointer"
            >
              Password
            </label>
            <div className="flex items-center gap-1 relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                placeholder="Enter Your password"
                className="outline-none bg-[#05101c] my-2 p-2 w-full border-b-2  focus:bg-white focus:text-black py-2"
                name="password"
                onChange={handleInputChange}
              />
              <div className="p-1 rounded-full cursor-pointer absolute right-0 text-green-500">
                {showPassword ? (
                  <FaRegEye
                    className="text-2xl "
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    className="text-2xl "
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-md sm:text-lg  md:text-xl lg:text-2xl bg-green-500 rounded font-semibold px-3 mt-4 py-1 text-center mx-auto disabled:cursor-not-allowed disabled:opacity-65  flex items-center gap-2"
            onClick={handleSignIn}
            disabled={loading}
          >
            Sign In
            {loading && (
              <span className=" animate-spin inline text-base sm:text-md md:text-lg lg:text-xl">
                <LuLoader2 />
              </span>
            )}
          </button>
        </form>
        <p className="text-sm sm:text-base md:text-md lg:text-lg capitalize my-5 font-normal ">
          New to our ChatGenius?{" "}
          <Link
            onClick={playSound}
            to="/signup"
            className="text-red-500 capitalize hover:underline cursor-pointer "
          >
            create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
