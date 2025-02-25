// import React, { useEffect, useState } from "react";
// import messageService from "../../services/messageService";

// const MessagesContainer = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await messageService.getUserMessages();
//         console.log("Messages response:", response); // Debug log

//         if (response?.success && response?.data) {
//           const recentMessages = Object.values(response.data)
//             .filter((msgs) => msgs && msgs.length > 0) // Filter out empty conversations
//             .map((conversationMessages) => {
//               const lastMessage =
//                 conversationMessages[conversationMessages.length - 1];
//               if (!lastMessage?._id) return null; // Skip if message is invalid

//               return {
//                 id: lastMessage._id,
//                 avatar: `https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=${lastMessage.senderId}`,
//                 message: lastMessage.content || "No message content",
//                 status: "Open",
//               };
//             })
//             .filter((msg) => msg !== null) // Remove null messages
//             .slice(-2);

//           if (recentMessages.length > 0) {
//             setMessages(recentMessages);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   return (
//     <div className="border w-[60%] overflow-hidden rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7]">
//       <div className="p-4 space-y-4">
//         <div className="space-y-1">
//           <h2 className="text-lg font-semibold">Open discussions</h2>
//           <p className="text-sm text-gray-500">
//             Check your recent conversations about open opportunities.
//           </p>
//         </div>
//         <div className="space-y-2">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={message.avatar}
//                   alt=""
//                   className="w-8 h-8 rounded-full bg-gray-200"
//                 />
//                 <span className="text-sm">{message.message}</span>
//               </div>
//               <span className="text-sm text-gray-500">{message.status}</span>
//             </div>
//           ))}
//         </div>
//         <button class="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-4 rounded-full shadow-xs">
//           <a href="/messages" className="block text-sm font-normal">
//             Go to messages
//           </a>
//         </button>{" "}
//       </div>
//     </div>
//   );
// };

// export default MessagesContainer;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import { format } from "date-fns";

const MessagesContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error("No authenticated session");

        const response = await PROSPONSER.get(
          `/messages/conversations?userId=${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          // Take only the 2 most recent conversations
          const recentConversations = response.data.data
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 2);

          setMessages(recentConversations);
        }
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setError("Failed to load conversations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // const handleConversationClick = (conversation) => {
  //   navigate("/messages", {
  //     state: {
  //       selectedConversation: conversation,
  //     },
  //   });
  // };
  const handleConversationClick = (conversation) => {
    navigate("/messages", {
      state: {
        selectedConversation: {
          userId: conversation.userId,
          name: conversation.name,
        },
        // Pass the contract data like we do in Contracts.jsx
        initialContracts: conversation.contracts || [],
      },
    });
  };

  if (isLoading) {
    return (
      <div className="border w-[45%] rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7] p-4">
        <p className="text-center text-gray-500">Loading conversations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border w-[45%] rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7] p-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="border w-[45%] overflow-hidden rounded-2xl ">
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-[600]">Open discussions</h2>
          <p className="text-sm text-gray-500">
            Check your recent conversations about open opportunities.
          </p>
        </div>

        <div className="space-y-2">
          {messages.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No recent conversations
            </div>
          ) : (
            messages.map((conversation) => (
              <div
                key={conversation.userId}
                onClick={() => handleConversationClick(conversation)}
                className="flex items-center justify-between p-3 bg-[#F3F3F3] rounded-[12px] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=${conversation.userId}`}
                    alt=""
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div>
                    {/* <p className="font-medium text-sm">{conversation.name}</p> */}
                    <p className="text-sm text-[#9CA3AF] line-clamp-1 max-w-56 overflow-hidden">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
                {/* <span className="text-xs text-gray-400">
                  {format(new Date(conversation.updatedAt), "MMM d, HH:mm")}
                </span> */}
                <button className="text-[#1F2937]  font-[500]">Open</button>
              </div>
            ))
          )}
        </div>

        <button className="text-[10px] font-[500]">
          <a href="/messages" className="block text-sm font-medium">
            Open Discussions
          </a>
        </button>
      </div>
    </div>
  );
};

export default MessagesContainer;
