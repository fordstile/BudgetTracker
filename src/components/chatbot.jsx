import React, { useState } from "react";
import "./Chatbot.css";
import profileImage from "../assets/DV.jpg";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi, can I help you with anything?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { type: "user", text: input };
    setMessages([...messages, newMessage, { type: "bot", text: "Let me find that for you!" }]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <header className="chatbot-header">
        <div className="chatbot-logo">FinAssistant</div>
        <div className="profile-icon">
  <img src={profileImage} alt="Profile" />
</div>
      </header>
<div className="chat">      {/* Welcome Section */}
      <div className="chatbot-welcome">
        <div className="bot-icon">👋</div>
        <h2>Hi, User</h2>
        <h3>Can I help you with anything?</h3>
        <p>Ready to assist you with anything you need, from answering questions to recommendations. Let’s get started!</p>
      </div>


      {/* Chat Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask FinAssistant anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>➜</button>
      </div></div>

    </div>
  );
};

export default Chatbot;
