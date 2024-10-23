import { TypeAnimation } from "react-type-animation";

const Heading = () => {
  return (
    <TypeAnimation
      sequence={[
        "✨ Powered by Gemini 1.5 for smarter interactions.",
        1000,
        "💡 Discover answers with the power of AI.",
        1000,
        "🌍 Connecting you to smart solutions, anytime.",
        1000,
        "🚀 Elevate your experience with instant responses.",
        1000,
        "🤝 Let us assist you, one question at a time.",
        1000,
        "🌟 Step into the future of conversations.", // New statement
        1000,
      ]}
      wrapper="span"
      speed={60}
      style={{  display: "inline-block" }}
      repeat={Infinity}
    />
  );
};

export default Heading;
