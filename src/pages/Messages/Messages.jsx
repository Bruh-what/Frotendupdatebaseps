// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient";
// import { format } from "date-fns";
// import useAuth from "../../hooks/useAuth";
// import { PROSPONSER } from "../../https/config";

// export default function Messages() {
//   const { role } = useAuth();
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [messagesLoading, setMessagesLoading] = useState(false);
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   const fetchConversations = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session) throw new Error("No authenticated session");
//       setUserId(session.user.id);

//       const response = await PROSPONSER.get(
//         `/messages/conversations?userId=${session.user.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${session.access_token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         setConversations(response.data.data);
//       }
//     } catch (error) {
//       setError("Failed to load conversations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMessages = async (otherUserId, currentUserId) => {
//     try {
//       setMessagesLoading(true);
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       const response = await PROSPONSER.get(
//         `/messages/messages/${otherUserId}?userId=${currentUserId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${session.access_token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         setMessages(response.data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     } finally {
//       setMessagesLoading(false);
//     }
//   };

//   const handleConversationSelect = async (conversation) => {
//     setSelectedConversation(conversation);
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     await fetchMessages(conversation.userId, session.user.id);
//   };

//   const handleSendMessageInConversation = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !selectedConversation) return;

//     try {
//       setSendingMessage(true);
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session) throw new Error("No authenticated session");

//       const messageData = {
//         senderId: session.user.id,
//         receiverId: selectedConversation.userId,
//         senderName: session.user.user_metadata.full_name,
//         receiverName: selectedConversation.name,
//         content: newMessage,
//       };

//       const response = await PROSPONSER.post("/messages", messageData, {
//         headers: {
//           Authorization: `Bearer ${session.access_token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data.success) {
//         const newMessageObj = {
//           ...response.data.data,
//           senderId: session.user.id,
//           createdAt: new Date().toISOString(),
//         };

//         setMessages((prev) => [...prev, newMessageObj]);
//         setNewMessage("");

//         setConversations((prev) =>
//           prev.map((conv) =>
//             conv.userId === selectedConversation.userId
//               ? {
//                   ...conv,
//                   lastMessage: newMessage,
//                   updatedAt: new Date().toISOString(),
//                 }
//               : conv
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setSendingMessage(false);
//     }
//   };

//   const handleCreateContract = (opportunityData) => {
//     if (role !== "sponsor") return;

//     navigate("/CreateContractPage", {
//       state: {
//         opportunity: {
//           _id: opportunityData.opportunityId,
//           athleteId: opportunityData.athleteId,
//           title: opportunityData.title,
//           sport: opportunityData.sport,
//           priceAsk: opportunityData.totalPrice,
//           description: opportunityData.description,
//         },
//       },
//     });
//   };

//   const truncateMessage = (message) => {
//     if (!message) return "";
//     const words = message.split(" ");
//     return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
//   };

//   if (loading) return <div className="p-4">Loading conversations...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="h-screen flex bg-gray-100 w-full">
//       <div className="w-1/3 bg-white border-r overflow-y-auto">
//         <div className="p-4 border-b">
//           <h2 className="text-xl font-semibold">Messages</h2>
//         </div>
//         {conversations.map((conversation) => (
//           <div
//             key={conversation.userId}
//             onClick={() => handleConversationSelect(conversation)}
//             className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
//               selectedConversation?.userId === conversation.userId
//                 ? "bg-blue-50"
//                 : ""
//             }`}
//           >
//             <h3 className="font-medium">{conversation.name}</h3>
//             <p className="text-sm text-gray-500 mt-1">
//               {truncateMessage(conversation.lastMessage)}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               {format(new Date(conversation.updatedAt), "MMM d, HH:mm")}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="flex-1 flex flex-col">
//         {selectedConversation ? (
//           <>
//             <div className="p-4 bg-white border-b">
//               <h3 className="font-medium text-lg">
//                 {selectedConversation.name}
//               </h3>
//             </div>

//             <div className="flex-1 overflow-y-auto p-8 space-y-4">
//               {messagesLoading ? (
//                 <div className="flex justify-center items-center h-full">
//                   <span>Loading messages...</span>
//                 </div>
//               ) : (
//                 messages.map((message, index) => {
//                   const isCurrentUser = message.senderId === userId;
//                   return (
//                     <div key={index}>
//                       {/* Regular Message */}
//                       <div
//                         className={`flex ${
//                           isCurrentUser ? "justify-end" : "justify-start"
//                         } mb-4`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg px-4 py-2 ${
//                             isCurrentUser
//                               ? "bg-blue-500 text-white"
//                               : "bg-gray-200"
//                           }`}
//                         >
//                           <p>{message.content}</p>
//                           <span className="text-xs opacity-70">
//                             {format(new Date(message.createdAt), "HH:mm")}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Opportunity Card (if exists) */}
//                       {message.opportunityData && (
//                         <div
//                           className={`flex ${
//                             isCurrentUser ? "justify-end" : "justify-start"
//                           } mb-4`}
//                         >
//                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
//                             <div className="border-b pb-2 mb-2">
//                               <h4 className="font-semibold text-lg">
//                                 {message.opportunityData.title}
//                               </h4>
//                               <div className="flex justify-between items-center mt-1">
//                                 <span className="text-sm text-gray-600">
//                                   Sport: {message.opportunityData.sport}
//                                 </span>
//                                 <span className="text-green-600 font-medium">
//                                   ${message.opportunityData.totalPrice}
//                                 </span>
//                               </div>
//                               <p className="text-sm text-gray-700 mt-2">
//                                 {message.opportunityData.description}
//                               </p>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">
//                                 {format(
//                                   new Date(message.createdAt),
//                                   "MMM d, HH:mm"
//                                 )}
//                               </span>
//                               {role === "sponsor" && (
//                                 <button
//                                   onClick={() =>
//                                     handleCreateContract(
//                                       message.opportunityData
//                                     )
//                                   }
//                                   className="bg-green-500 text-white text-sm px-4 py-1 rounded-full hover:bg-green-600"
//                                 >
//                                   Send Contract
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//               )}
//             </div>

//             <div className="p-4 bg-white border-t">
//               <form
//                 onSubmit={handleSendMessageInConversation}
//                 className="flex gap-2"
//               >
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   disabled={sendingMessage}
//                   className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
//                   placeholder="Type a message..."
//                 />
//                 <button
//                   type="submit"
//                   disabled={sendingMessage || !newMessage.trim()}
//                   className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 disabled:opacity-50"
//                 >
//                   {sendingMessage ? "Sending..." : "Send"}
//                 </button>
//               </form>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Select a conversation to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// // BASEMOD
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { format } from "date-fns";
import useAuth from "../../hooks/useAuth";
import { PROSPONSER } from "../../https/config";

export default function Messages() {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const initializeMessages = async () => {
      await fetchConversations();
      if (location.state?.selectedConversation) {
        handleConversationSelect(location.state.selectedConversation);
      }
    };

    initializeMessages();
  }, []);

  const fetchConversations = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("No authenticated session");
      setUserId(session.user.id);

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
        setConversations(response.data.data);
      }
    } catch (error) {
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId, currentUserId) => {
    try {
      setMessagesLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await PROSPONSER.get(
        `/messages/messages/${otherUserId}?userId=${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessages(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleConversationSelect = async (conversation) => {
    setSelectedConversation(conversation);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await fetchMessages(conversation.userId, session.user.id);
  };

  const handleSendMessageInConversation = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setSendingMessage(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("No authenticated session");

      const messageData = {
        senderId: session.user.id,
        receiverId: selectedConversation.userId,
        senderName: session.user.user_metadata.full_name,
        receiverName: selectedConversation.name,
        content: newMessage,
      };

      const response = await PROSPONSER.post("/messages", messageData, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        const newMessageObj = {
          ...response.data.data,
          senderId: session.user.id,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessageObj]);
        setNewMessage("");

        setConversations((prev) =>
          prev.map((conv) =>
            conv.userId === selectedConversation.userId
              ? {
                  ...conv,
                  lastMessage: newMessage,
                  updatedAt: new Date().toISOString(),
                }
              : conv
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleCreateContract = (opportunityData) => {
    if (role !== "sponsor") return;

    navigate("/CreateContractPage", {
      state: {
        opportunity: {
          _id: opportunityData.opportunityId,
          athleteId: opportunityData.athleteId,
          title: opportunityData.title,
          sport: opportunityData.sport,
          priceAsk: opportunityData.totalPrice,
          description: opportunityData.description,
        },
      },
    });
  };

  const truncateMessage = (message) => {
    if (!message) return "";
    const words = message.split(" ");
    return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
  };

  if (loading) return <div className="p-4">Loading conversations...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="h-screen flex bg-gray-100 w-full">
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        {conversations.map((conversation) => (
          <div
            key={conversation.userId}
            onClick={() => handleConversationSelect(conversation)}
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
              selectedConversation?.userId === conversation.userId
                ? "bg-blue-50"
                : ""
            }`}
          >
            <h3 className="font-medium">{conversation.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {truncateMessage(conversation.lastMessage)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {format(new Date(conversation.updatedAt), "MMM d, HH:mm")}
            </p>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 bg-white border-b">
              <h3 className="font-medium text-lg">
                {selectedConversation.name}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {messagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <span>Loading messages...</span>
                </div>
              ) : (
                messages.map((message, index) => {
                  const isCurrentUser = message.senderId === userId;
                  return (
                    <div key={index}>
                      {/* Regular Message */}
                      <div
                        className={`flex ${
                          isCurrentUser ? "justify-end" : "justify-start"
                        } mb-4`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            isCurrentUser
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          <p>{message.content}</p>
                          <span className="text-xs opacity-70">
                            {format(
                              new Date(message.createdAt),
                              "MMM d, HH:mm"
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Opportunity Card (if exists) */}
                      {message.opportunityData && (
                        <div
                          className={`flex ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          } mb-4`}
                        >
                          <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
                            <div className="border-b pb-2 mb-2">
                              <h4 className="font-semibold text-lg">
                                {message.opportunityData.title}
                              </h4>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-600">
                                  Sport: {message.opportunityData.sport}
                                </span>
                                <span className="text-green-600 font-medium">
                                  ${message.opportunityData.totalPrice}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mt-2">
                                {message.opportunityData.description}
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">
                                {format(
                                  new Date(message.createdAt),
                                  "MMM d, HH:mm"
                                )}
                              </span>
                              {role === "sponsor" && (
                                <button
                                  onClick={() =>
                                    handleCreateContract(
                                      message.opportunityData
                                    )
                                  }
                                  className="bg-green-500 text-white text-sm px-4 py-1 rounded-full hover:bg-green-600"
                                >
                                  Send Contract
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-white border-t">
              <form
                onSubmit={handleSendMessageInConversation}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={sendingMessage}
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  disabled={sendingMessage || !newMessage.trim()}
                  className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 disabled:opacity-50"
                >
                  {sendingMessage ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
