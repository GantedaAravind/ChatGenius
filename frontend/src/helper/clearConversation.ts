import toast from "react-hot-toast";
import axiosInstance from "../config/axiosConfig";



const clearConversation = async () => {
    try {
      // const fetchResponse = await fetch(
      //   "http://localhost:5000/api/v1/chats/clear",
      //   {
      //     method: "get",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     credentials: "include",
      //   }
      // );
      // const dataRespose = await fetchResponse.json();
      const response = await axiosInstance.get("/chats/clear");


      if (response.data.success) {
        toast.success(response.data.message);
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
  };

export default  clearConversation;