import ReactMarkdown from "react-markdown";
const TextBlock = ({ message }: { message: string }) => {
  
  return (
    <div className="text-block w-[90%] font-[300] ">
      <div className="no-tailwind">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
};
export default TextBlock;
