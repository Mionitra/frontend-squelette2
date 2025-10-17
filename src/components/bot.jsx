import { BiUserCircle } from "react-icons/bi";
import { HiPaperAirplane } from "react-icons/hi";
// ChatBot.jsx
import { useState } from "react";
import { sendMessageToBot } from "../api"; // Assure-toi que le chemin d'accès est correct
import { SpaceCanvas } from "./Home/ThreeDCharacter";
import Sidebar from "./bot/Sidebar";
import Markdown from "../utils/Markdown";
import Header from "./bot/Header";
import BotTyping from "./bot/BotTyping";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true)
    try {
      const res = await sendMessageToBot(message);
      setResponses([...responses, { user: message, bot: res.data.reply }]);
      setMessage("");
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setResponses([
        ...responses,
        { user: message, bot: "Désolé, une erreur s'est produite." },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden text-neutral-50 ">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <SpaceCanvas />
          <div className="relative z-50 flex flex-col">
            <Header />
            <div className="relative p-4 backdrop-blur-xs h-[75vh] overflow-y-auto shadow-inner space-y-4">
              {/* Message d’accueil */}
              <div className="flex justify-center mt-2">
                <div className="bg-blue-100/60 text-gray-800 px-4 py-2 rounded-2xl shadow-sm text-center text-sm">
                  Bonjour ! Comment puis-je vous aider aujourd’hui ?
                </div>
              </div>
              {loading && <BotTyping />}
              {/* Boucle des messages */}
              {responses.map((r, i) => (
                <div key={i} className="space-y-3">
                  {/* Message utilisateur */}
                  <div className="flex justify-end">
                    <div className="bg-slate-900 text-white px-4 py-2 max-w-[70%] rounded-2xl rounded-br-none shadow-md text-sm">
                      {r.user}
                    </div>
                  </div>

                  {/* Réponse du bot */}
                  <div className="flex justify-start">
                    <div className="bg-neutral-950 white px-4 py-2 max-w-[70%] rounded-2xl rounded-bl-none shadow-sm text-sm">
                      <Markdown>{r.bot}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-10">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écris un message..."
                className="p-2 mx-4 w-full text-white border-2 border-cyan-500/50 focus:outline-none focus:border-cyan-300 bg-black/30 backdrop-blur-sm rounded-2xl px-4"
              />
              <button
                onClick={sendMessage}
                className="bg-transparent mr-5 cursor-pointer text-white p-2 mt-2 rounded-full"
              >
                <HiPaperAirplane size={30} className="text-cyan-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
