import React, { useState, ChangeEvent, MouseEvent } from "react";
import icons from "../../public/assets/icons";
const { InertIcon, PlaneIcon, RegenrateIcon } = icons;

const ChatType = {
  USER: "user" as const,
  BOT: "bot" as const,
};

interface ModalProps {
  onClose: () => void;
}

interface Chat {
  type: typeof ChatType[keyof typeof ChatType];
  text: string;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const dummyResponse =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  const handleGenerate = (): void => {
    if (userInput.trim()) {
      setChats((prevChats) => [
        ...prevChats,
        { type: ChatType.USER, text: userInput },
        { type: ChatType.BOT, text: dummyResponse },
      ]);
      setUserInput("");
      setIsGenerated(true);
    }
  };

  const handleInsert = (): void => {
    const messageInput = document.querySelector<HTMLElement>('[contenteditable="true"]');
    if (messageInput) {
      messageInput.innerHTML += ` ${dummyResponse}`;
      messageInput.focus();
    }
    onClose();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <div
      id="ai-modal-background"
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        id="ai-modal-content"
        onClick={handleModalClick}
        className={`w-[870px] ${isGenerated ? "h-[452px]" : "h-[192px]"} px-6 gap-6 pb-5 rounded-[15px] bg-[#F9FAFB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]`}
      >
        {/* Chat Box */}
        <div className="mb-8 rounded-lg p-2 max-h-60 overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`mb-2 ${chat.type === ChatType.USER ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block rounded-lg mt-4 max-w-[631px] min-h-[40px] p-4 text-left text-gray-700 break-words ${
                  chat.type === ChatType.USER ? "bg-gray-200" : "bg-blue-100"
                }`}
                style={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: "400",
                  lineHeight: "36px",
                }}
              >
                {chat.text}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Input Field */}
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Your prompt"
          className="border w-full h-[61px] border-gray-300 rounded-lg p-2 mb-4 focus:outline-none"
        />

        {!isGenerated ? (
          <button
            onClick={handleGenerate}
            aria-label="Generate response"
            className="bg-blue-500 w-[190px] h-[53px] text-white font-semibold text-[24px] rounded-lg flex justify-center items-center mb-8 float-right"
          >
            <img src={PlaneIcon} alt="Generate" /> Generate
          </button>
        ) : (
          <div className="flex items-center justify-end">
            <button
              onClick={handleInsert}
              aria-label="Insert response"
              className="bg-transparent w-[129px] h-[53px] text-gray-500 border-2 border-gray-500 font-semibold text-[24px] rounded-lg flex justify-center items-center mr-2"
              disabled={chats.length === 0}
            >
              <img src={InertIcon} alt="Insert" /> Insert
            </button>
            <button className="bg-blue-500 w-[212px] h-[53px] text-white font-semibold text-[24px] rounded-lg flex justify-center items-center">
              <img src={RegenrateIcon} alt="Regenerate" /> Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
