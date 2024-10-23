import CodeBlock from "./CodeBlock";
import TextBlock from "./TextBlock";

type Props = {
  message: string;
};

const MessageRenderer: React.FC<Props> = ({ message }) => {
  const renderMessage = (text: string) => {
    const regex = /```(.*?)```/gs;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <CodeBlock message={part} key={index} />;
      } else {
        return <TextBlock key={index} message={part} />;
      }
    });
  };

  return <div className="text-md w-full mt-[-12px]">{renderMessage(message)}</div>;
};

export default MessageRenderer;
