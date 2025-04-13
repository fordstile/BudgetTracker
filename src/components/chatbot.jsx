import React, { useState } from "react";
import { FaRobot, FaTimes, FaExpand, FaCompress, FaArrowUp } from "react-icons/fa";
import "./Chatbot.css";

// Simple version without API dependency for now
const Chatbot = ({ isOpen = false, onClose = () => {}, onFullscreenChange = () => {} }) => {
  const [messages, setMessages] = useState([
    { isUser: false, text: "Hi, I'm FinAssistant! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Respond to user based on keywords in their message
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Financial advice responses based on keywords
    if (message.includes("budget") || message.includes("spending")) {
      return "To create an effective budget:\n\n1. Track your income and expenses\n2. Categorize your spending\n3. Set realistic goals\n4. Review and adjust monthly\n\nWould you like more specific advice on any of these steps?";
    }
    else if (message.includes("save") || message.includes("savings") || message.includes("money")) {
      return "Here are some savings tips:\n\n1. Follow the 50/30/20 rule (50% needs, 30% wants, 20% savings)\n2. Automate your savings\n3. Cut unnecessary expenses\n4. Set specific savings goals\n\nNeed help implementing any of these strategies?";
    }
    else if (message.includes("invest") || message.includes("investment") || message.includes("stock")) {
      return "Basic investment principles:\n\n1. Diversify your portfolio\n2. Consider your risk tolerance\n3. Think long-term\n4. Start early and be consistent\n\nWould you like to know more about any specific investment type?";
    }
    else if (message.includes("debt") || message.includes("loan") || message.includes("credit") || message.includes("card")) {
      return "Managing debt effectively:\n\n1. List all your debts\n2. Prioritize high-interest debt\n3. Consider debt consolidation\n4. Create a repayment plan\n\nNeed help creating a debt repayment strategy?";
    }
    else if (message.includes("retirement") || message.includes("future") || message.includes("401k") || message.includes("ira")) {
      return "Retirement planning basics:\n\n1. Start as early as possible\n2. Take advantage of employer matching\n3. Consider tax-advantaged accounts (401k, IRA)\n4. Gradually increase your contributions\n\nWould you like more specific retirement advice?";
    }
    else if (message.includes("tax") || message.includes("taxes")) {
      return "Tax-saving strategies:\n\n1. Maximize retirement contributions\n2. Use tax-advantaged accounts\n3. Keep track of deductible expenses\n4. Consider tax-loss harvesting for investments\n\nConsult a tax professional for personalized advice.";
    }
    else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! I'm here to help with your financial questions. What would you like to know about today?";
    }
    else if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with regarding your finances?";
    }
    else if (message.includes("goal") || message.includes("plan")) {
      return "Setting financial goals:\n\n1. Make them specific and measurable\n2. Set realistic timeframes\n3. Break big goals into smaller milestones\n4. Track your progress regularly\n\nWhat kind of financial goals are you working towards?";
    }
    else if (message.includes("emergency") || message.includes("fund")) {
      return "Emergency fund basics:\n\n1. Aim for 3-6 months of essential expenses\n2. Keep it in a liquid, accessible account\n3. Start small and build gradually\n4. Replenish after using it\n\nDo you have an emergency fund set up?";
    }
    else {
      return "I can help you with various financial topics including:\n\n• Budgeting\n• Saving money\n• Investing\n• Debt management\n• Retirement planning\n• Emergency funds\n• Tax strategies\n\nWhat specific aspect of your finances would you like to discuss?";
    }
  };

  const sendMessage = (message) => {
    // Add user message to chat
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setIsSending(true);
    
    // Simulate AI typing delay for more natural feel
    setTimeout(() => {
      // Get appropriate response based on user message
      const botResponse = getBotResponse(message);
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
      setIsSending(false);
    }, 1000 + Math.random() * 500); // Random delay between 1-1.5 seconds
  };

  const handleSendMessage = () => {
    if (input.trim() === "" || isSending) return;
    sendMessage(input);
    setInput("");
  };

  const toggleFullScreen = () => {
    const newFullscreenState = !isFullScreen;
    setIsFullScreen(newFullscreenState);
    onFullscreenChange(newFullscreenState);
  };

  const handleClose = () => {
    setIsFullScreen(false);
    onFullscreenChange(false);
    onClose();
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''} ${isFullScreen ? 'fullscreen' : ''}`}>
        <header className="chatbot-header">
          <div className="chatbot-title">
            <span>FinAssistant</span>
          </div>
          <div className="chatbot-actions">
            <button 
              className="action-btn"
              onClick={toggleFullScreen}
              title={isFullScreen ? "Minimize" : "Maximize"}
            >
              {isFullScreen ? <FaCompress /> : <FaExpand />}
            </button>
            <button className="close-btn" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </header>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
              {!message.isUser && (
                <div className="bot-avatar">
                  <FaRobot />
                </div>
              )}
              <div className="message-content">{message.text}</div>
            </div>
          ))}
          {isSending && (
            <div className="message bot">
              <div className="bot-avatar">
                <FaRobot />
              </div>
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              type="text"
              placeholder="Ask me anything about your finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isSending}
            />
            <button 
              className={`send-button ${isSending ? 'sending' : ''}`}
              onClick={handleSendMessage}
              disabled={isSending || input.trim() === ""}
            >
              {isSending ? 'Sending...' : <FaArrowUp />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
