import React, { useState } from "react";
import "./ChatbotWidget.css"; // Make sure this CSS exists

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="chatbot-container">
      {/* Floating chat icon */}
      <button className="chatbot-button" onClick={toggleChat}>
        💬
      </button>

      {/* Chatbox iframe */}
      {isOpen && (
        <div className="chatbot-box">
          <iframe
            src="http://localhost:5002" // ✅ use your chatbot server
            title="Chatbot"
            width="300"
            height="400"
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
