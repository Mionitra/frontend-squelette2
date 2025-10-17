import React from "react";

const BotTyping = () => {
  return (
    <div className="flex justify-start mt-2">
      <div className="bg-neutral-900 text-gray-700 px-6 py-4 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-1 max-w-[70%]">
        <span className="dot bg-gray-500"></span>
        <span className="dot bg-gray-500"></span>
        <span className="dot bg-gray-500"></span>
      </div>
    </div>
  );
};

export default BotTyping;
