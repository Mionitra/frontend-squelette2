import { BiMessageDots } from "react-icons/bi"; 
import { AiOutlineMenu } from "react-icons/ai"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Conversations simulées
  const conversations = [
    { id: 1, title: "Erreur HTTP 401 Authentification" },
    { id: 2, title: "Demande d'informations bourse" },
    { id: 3, title: "Diagrammes UML et interprétation" },
    { id: 4, title: "Plateforme d'enchères en ligne" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen bg-neutral-950 text-gray-200 relative z-50 flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
        >
          <AiOutlineMenu size={20} />
        </button>
        {isOpen && <h1 className="text-lg font-semibold">ChatBot</h1>}
        {isOpen && <AiOutlinePlus size={20} className="cursor-pointer hover:text-white" />}
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto mt-2 space-y-1">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center gap-2 px-3 py-2 hover:bg-[#2a2b32] cursor-pointer rounded-md"
          >
            <BiMessageDots size={18} />
            {isOpen && (
              <span className="truncate text-sm text-gray-300">{conv.title}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-3 text-sm text-gray-400">
        {isOpen ? "Mionitra Rakotondradaoro" : "MR"}
      </div>
    </div>
  );
}
