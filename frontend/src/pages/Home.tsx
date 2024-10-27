import Heading from "../components/Heading";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <div className="text-white text-center capitalize text-base sm:text-md md:text-lg lg:text-2xl xl:text-3xl">
        <Heading />
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <motion.img
          initial={{
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
          src="/aikid.png"
          className="h-60 lg:h-80"
          alt="aikid"
        />
        <motion.img
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
          src="/gemini.png"
          className="h-28 md:h-40 lg:h-52"
          alt="gemini"
        />
      </div>
      <div className="">
        <motion.img
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.5,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          src="/ExampleChat.png"
          className="w-[90%] md:w-[60%] mx-auto rounded-md mt-7 shadowGreen"
        />
      </div>
    </div>
  );
};

export default Home;
