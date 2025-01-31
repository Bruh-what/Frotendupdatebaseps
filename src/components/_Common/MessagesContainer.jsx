import React, { useEffect, useState } from "react";
import messageService from "../../services/messageService";

const MessagesContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messageService.getUserMessages();
        console.log("Messages response:", response); // Debug log

        if (response?.success && response?.data) {
          const recentMessages = Object.values(response.data)
            .filter((msgs) => msgs && msgs.length > 0) // Filter out empty conversations
            .map((conversationMessages) => {
              const lastMessage =
                conversationMessages[conversationMessages.length - 1];
              if (!lastMessage?._id) return null; // Skip if message is invalid

              return {
                id: lastMessage._id,
                avatar: `https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=${lastMessage.senderId}`,
                message: lastMessage.content || "No message content",
                status: "Open",
              };
            })
            .filter((msg) => msg !== null) // Remove null messages
            .slice(-2);

          if (recentMessages.length > 0) {
            setMessages(recentMessages);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="border w-[60%] overflow-hidden rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7]">
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Open discussions</h2>
          <p className="text-sm text-gray-500">
            Check your recent conversations about open opportunities.
          </p>
        </div>
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={message.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
                <span className="text-sm">{message.message}</span>
              </div>
              <span className="text-sm text-gray-500">{message.status}</span>
            </div>
          ))}
        </div>
        <button class="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-4 rounded-full shadow-xs">
          <a href="/messages" className="block text-sm font-normal">
            Go to messages
          </a>
        </button>{" "}
      </div>
    </div>
  );
};

export default MessagesContainer;
