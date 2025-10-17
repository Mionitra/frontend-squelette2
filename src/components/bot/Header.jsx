import { AiOutlineCaretDown } from "react-icons/ai"; 
import { FaRegUser } from "react-icons/fa"; 
import { FiSettings } from "react-icons/fi"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("GPT-5");

  const versions = ["GPT-5", "GPT-4", "GPT-3.5"];

  const handleSelect = (version) => {
    setSelectedVersion(version);
    setIsOpen(false);
  };
  return (
    <header className="w-full bg-neutral-950 border-b border-gray-700 flex items-center justify-between px-4 py-3">
      {/* Titre centré */}
      {/* Sélecteur de version */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-neutral-950 hover:bg-black text-gray-100 px-3 py-2 rounded-md transition-colors"
        >
          <span className="text-sm font-semibold">{selectedVersion}</span>
          <AiOutlineCaretDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Menu déroulant */}
        {isOpen && (
          <div className="absolute mt-2 w-40 bg-neutral-950 rounded-md shadow-lg border border-gray-700 overflow-hidden z-20">
            {versions.map((v) => (
              <button
                key={v}
                onClick={() => handleSelect(v)}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-neutral-900 ${
                  selectedVersion === v ? "bg-neutral-900" : ""
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions à droite */}
      <div className="flex items-center gap-4">
        <button className="hover:text-white text-gray-300">
          <AiOutlinePlus size={20} />
        </button>
        <button className="hover:text-white text-gray-300">
          <FiSettings size={20} />
        </button>
        <button className="hover:text-white text-gray-300">
          <FaRegUser size={20} />
        </button>
      </div>
    </header>
  );
}
