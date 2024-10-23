import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Dark theme

const CodeBlock = ({ message }: { message: string }) => {
  const splitString = (str: string) => {
    const [firstWord, ...rest] = str.split("\n");
    const restOfString = rest.join("\n");
    return { firstWord, restOfString };
  };

  const {
    firstWord,
    restOfString,
  }: { firstWord: string; restOfString: string } = splitString(message);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(restOfString);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="mx-auto mt-2 max-w[95%] md:max-w-[80%] overflow-hidden ">
      <div className="bg-slate-500 mb-[-13px] rounded-t flex items-center justify-between font-mono p-2">
        <p className="mx-4 capitalize">{firstWord}</p>
        {copied ? (
          <p
            className="flex items-center gap-1 cursor-pointer text-base mx-4 text-green-400"
            onClick={handleCopy}
          >
            <span className="text-xl inline">
              <PiCheckCircleFill />
            </span>
            Copied
          </p>
        ) : (
          <p
            className="flex items-center gap-1 cursor-pointer text-base mx-4"
            onClick={handleCopy}
          >
            <IoCopyOutline /> Copy
          </p>
        )}
      </div>
      <div className="overflow-x-auto ">
        <SyntaxHighlighter
          language={firstWord}
          style={dracula}
          customStyle={{ maxWidth: "100%", overflowX: "auto" }} // Ensures code doesn't overflow container
        >
          {restOfString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
