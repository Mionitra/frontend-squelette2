import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // 🔁 adapte si ton backend est ailleurs

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [token, setToken] = useState(localStorage.getItem("access") || "");

  // ⚙️ Instance Axios avec le token JWT
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // ✅ Charger tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await api.get("/accounts/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur récupération utilisateurs:", err);
    }
  };

  // ✅ Charger la conversation avec un utilisateur
  const fetchConversation = async (userId) => {
    try {
      const res = await api.get(`/chat/conversation/${userId}/`);
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur récupération messages:", err);
    }
  };

  // ✅ Envoyer un message
  const handleSend = async () => {
    if (!messageInput.trim() || !selectedUser) return;
    try {
      await api.post("/chat/send/", {
        receiver_id: selectedUser.id,
        content: messageInput,
      });
      setMessageInput("");
      // Recharge immédiate après envoi
      fetchConversation(selectedUser.id);
    } catch (err) {
      console.error("Erreur envoi message:", err);
    }
  };

  // 🔹 Charger la liste des utilisateurs au démarrage
  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  // 🔹 Charger la conversation lorsqu’un utilisateur est sélectionné
  useEffect(() => {
    if (selectedUser) {
      fetchConversation(selectedUser.id);

      // ⚡ Recharger toutes les 2 secondes (simulation temps réel)
      const interval = setInterval(() => {
        fetchConversation(selectedUser.id);
      }, 2000);

      // Nettoyage de l'intervalle à la désélection
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar gauche */}
      <div className="w-1/4 border-r border-gray-800 overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-800">
          Discussions
        </h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`p-4 cursor-pointer hover:bg-gray-900 transition ${
              selectedUser?.id === user.id ? "bg-gray-800" : ""
            }`}
          >
            {user.username}
          </div>
        ))}
      </div>

      {/* Zone principale de chat */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* En-tête */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {selectedUser.username}
              </h2>
            </div>

            {/* Liste des messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Aucun message pour le moment.
                </p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender_username === "Moi" ||
                      msg.sender_username === localStorage.getItem("username")
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl shadow-md ${
                        msg.sender_username === "Moi" ||
                        msg.sender_username === localStorage.getItem("username")
                          ? "bg-white text-black rounded-br-none"
                          : "bg-gray-800 text-white rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Zone de saisie */}
            <div className="p-4 border-t border-gray-800 flex items-center">
              <input
                type="text"
                className="flex-1 p-3 bg-gray-900 text-white rounded-xl outline-none placeholder-gray-500"
                placeholder="Écrire un message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="ml-3 bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Envoyer
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Sélectionnez un utilisateur pour commencer une discussion
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
