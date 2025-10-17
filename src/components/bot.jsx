// ChatBot.jsx
import { useState } from "react";
import { sendMessageToBot } from "../api";// Assure-toi que le chemin d'accès est correct

function ChatBot() {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  const sendMessage = async () => {
    try {
      const res = await sendMessageToBot(message);
      setResponses([...responses, { user: message, bot: res.data.reply }]);
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setResponses([...responses, { user: message, bot: "Désolé, une erreur s'est produite." }]);
    }
  };

  return (
    <div className="p-4">
      <div className="border p-2 h-64 overflow-y-auto">
        {responses.map((r, i) => (
          <div key={i}>
            <p><b>Moi:</b> {r.user}</p>
            <p><b>Bot:</b> {r.bot}</p>
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écris un message..."
        className="border p-2 w-full"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 mt-2">
        Envoyer
      </button>
    </div>
  );
}

export default ChatBot;
