import { useSelector } from "react-redux";
import { RootState } from "../store";
import MessageRenderer from "../components/MessageRenderer";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TbLoader2 } from "react-icons/tb";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import { LuLoader2 } from "react-icons/lu";
import { RiBardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import clearConversation from "../helper/clearConversation";
import axiosInstance from "../config/axiosConfig";
import playSound from "../utils/playSound";

interface Chat {
  role: string;
  content: string;
  _id: string;
}

const Chat = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const promptRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [clearLoading, serClearLoading] = useState<boolean>(false);

  const chats: Chat[] = user.loggedIn ? user.chats : [];

  const authContext = useContext(AuthContext);

  const handleClearConversation = async () => {
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

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // This enables smooth scrolling
      });
    }
  };

  const handleSubmitPrompt = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    playSound();
    event.preventDefault(); // console.log(promptRef?.current?.value);
    try {
      if (!promptRef.current) return;
      const prompt = promptRef.current?.value ?? "";
      if (!prompt.trim()) return; // Prevent empty prompt submission

      setLoading(true);
      // const fetchResponse = await fetch(
      //   "http://localhost:5000/api/v1/chats/bard",
      //   {
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       message: prompt,
      //     }),
      //     credentials: "include",
      //   }
      // );
      // const dataRespose = await fetchResponse.json();

      const response = await axiosInstance.post("/chats/bard", {
        message: prompt,
      });

      if (response.data.success) {
        // toast.success(response.data.message);
        promptRef.current.value = "";
        await authContext?.fetchUserDatails();
        scrollToBottom();
      } else {
        throw new Error(response.data.message);
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
  // Effect to scroll to bottom whenever chats change
  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/login");
    } else {
      scrollToBottom();
    }
  }, [chats]);

  return (
    <div className="flex justify-around md:m-10 md:gap-10 ">
      <motion.div initial={{
            opacity: 0,
            x: -100,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1.5,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
           className=" max-w-[25%] hidden md:block ">
        <div className="border-slate-400 rounded-md mt-10 border-2 p-4">
          <p className=" text-xl lg:text-2xl px-3 py-1 mx-auto text-center rounded-full bg-green-600 w-fit">
            {user.name[0]}
          </p>
          <p className="w-fit mx-auto mt-5">You are talking to a ChatBOT</p>

          <p className="mt-20 indent-10">
            🤖Your intelligent chatbot companion where you can ask any questions
            ❓ and receive instant, accurate responses tailored just for you! 🌟
            Dive into a world of knowledge and curiosity with Chat Genius today!
            🚀
          </p>
          <button
            className="mx-auto flex items-center justify-center w-full bg-red-500 hover:bg-red-600 hover:scale-105 transition-all rounded px-3 py-1 mt-10 text-center disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-red-700 "
            onClick={handleClearConversation}
            disabled={clearLoading}
          >
            Clear Conversation
            {clearLoading && (
              <span className=" animate-spin inline text-xl">
                <LuLoader2 />
              </span>
            )}
          </button>
        </div>
      </motion.div>

      <motion.div
      initial={{
        opacity: 0,
        x: 100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1.5,
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
        className="w-[95%]  max-h-[calc(100vh-25vh)] sm:max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-200px)] lg:max-w-[70] p-0 overflow-y-scroll"
        ref={chatContainerRef}
      >
        {chats.length === 0 && (
          <div className=" flex mx-auto items-center justify-center h-full ">
            <img
              className=""
              src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*e2FF0IBng9p4TxJart2Zmw.gif"
            />
          </div>
        )}
        {chats.map((chat) => {
          return (
            <div
              key={chat._id}
              className={`w-full flex mt-1 gap-5 text-base sm:text-md md:text-lg my-2 md:my-4 ${
                chat.role === "user" ? "bg-green-500" : ""
              } rounded-md`}
            >
              <div className="text-xl ">
                {chat.role === "user" ? (
                  <div className="rounded-full px-3 py-1 font-semibold text-xl bg-[#05101c] m-1 ">
                    {user.name[0]}
                  </div>
                ) : (
                  <span className="text-4xl ">
                    <RiBardFill />
                  </span>
                )}
              </div>
              {chat.role === "user" ? (
                <div
                  className={`align-middle ${
                    chat.role === "user" ? "mt-2" : ""
                  }`}
                >
                  {chat.content}
                </div>
              ) : (
                <div className="w-full overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }} // Initial state
                    animate={{ opacity: 1, y: 0 }} // Animated state
                    transition={{ duration: 1.5 }} // Transition duration
                  >
                    <MessageRenderer message={chat.content} />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </motion.div>

      <motion.form 
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12  w-[95%] sm:w-[80%]">
        <div className="flex items-center text-base sm:text-md md:text-xl  bg-[#05101c]  border-2 border-slate-300 rounded-full">
          <input
            type="text"
            name="prompt"
            ref={promptRef}
            className="w-full mx-3 rounded-full bg-transparent px-5 outline-none py-2 text-xl text-white "
            placeholder="Ask Me Something..."
            autoComplete="off"
          />
          <button
            className="text-4xl hover:scale-105 transition-all hover:bg-green-500 hover:text-white text-green-500 rounded-full disabled:cursor-not-allowed disabled:opacity-70"
            onClick={handleSubmitPrompt}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin ">
                <TbLoader2 />
              </div>
            ) : (
              <FaRegArrowAltCircleUp />
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Chat;
