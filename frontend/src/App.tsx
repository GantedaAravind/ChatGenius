import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import  { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/user-reducer";
import AuthContext from "./context/AuthContext";
import axiosInstance from "./config/axiosConfig";

function App() {
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      // Make the request using the Axios instance
      const response = await axiosInstance.get("/user/user-details");

      // Check if the response is successful
      if (response.data.success) {
        // Dispatch the user details to the Redux store
        dispatch(login(response.data.data));
        // Optionally show a success toast
        // toast.success(response.data.message);
      } else {
        // Handle API-specific error response
        throw new Error(response.data.message);
      }
    } catch (err: unknown) {
      // Type-safe error handling
      if (err instanceof Error) {
        // Optionally show error toast
        // toast.error(err.message);
        console.error("Error:", err.message);
      } else {
        // Fallback for unknown error types
        console.error("Unknown error occurred");
        // toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <main>
      <AuthContext.Provider value={{ fetchUserDatails: fetchUserData }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Toaster />
      </AuthContext.Provider>
    </main>
  );
}

export default App;
