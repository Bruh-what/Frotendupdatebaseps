// // // import { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { supabase } from "../../lib/supabaseClient";
// // // import { format } from "date-fns";
// // // import useAuth from "../../hooks/useAuth";
// // // import { PROSPONSER } from "../../https/config";

// // // export default function Messages() {
// // //   const { role } = useAuth();
// // //   const [conversations, setConversations] = useState([]);
// // //   const [selectedConversation, setSelectedConversation] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [messagesLoading, setMessagesLoading] = useState(false);
// // //   const [sendingMessage, setSendingMessage] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [userId, setUserId] = useState(null);
// // //   const [newMessage, setNewMessage] = useState("");
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchConversations();
// // //   }, []);

// // //   const fetchConversations = async () => {
// // //     try {
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       if (!session) throw new Error("No authenticated session");
// // //       setUserId(session.user.id);

// // //       const response = await PROSPONSER.get(
// // //         `/messages/conversations?userId=${session.user.id}`,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${session.access_token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );

// // //       if (response.data.success) {
// // //         setConversations(response.data.data);
// // //       }
// // //     } catch (error) {
// // //       setError("Failed to load conversations");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchMessages = async (otherUserId, currentUserId) => {
// // //     try {
// // //       setMessagesLoading(true);
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();

// // //       const response = await PROSPONSER.get(
// // //         `/messages/messages/${otherUserId}?userId=${currentUserId}`,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${session.access_token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );

// // //       if (response.data.success) {
// // //         setMessages(response.data.data || []);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching messages:", error);
// // //     } finally {
// // //       setMessagesLoading(false);
// // //     }
// // //   };

// // //   const handleConversationSelect = async (conversation) => {
// // //     setSelectedConversation(conversation);
// // //     const {
// // //       data: { session },
// // //     } = await supabase.auth.getSession();
// // //     await fetchMessages(conversation.userId, session.user.id);
// // //   };

// // //   const handleSendMessageInConversation = async (e) => {
// // //     e.preventDefault();
// // //     if (!newMessage.trim() || !selectedConversation) return;

// // //     try {
// // //       setSendingMessage(true);
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       if (!session) throw new Error("No authenticated session");

// // //       const messageData = {
// // //         senderId: session.user.id,
// // //         receiverId: selectedConversation.userId,
// // //         senderName: session.user.user_metadata.full_name,
// // //         receiverName: selectedConversation.name,
// // //         content: newMessage,
// // //       };

// // //       const response = await PROSPONSER.post("/messages", messageData, {
// // //         headers: {
// // //           Authorization: `Bearer ${session.access_token}`,
// // //           "Content-Type": "application/json",
// // //         },
// // //       });

// // //       if (response.data.success) {
// // //         const newMessageObj = {
// // //           ...response.data.data,
// // //           senderId: session.user.id,
// // //           createdAt: new Date().toISOString(),
// // //         };

// // //         setMessages((prev) => [...prev, newMessageObj]);
// // //         setNewMessage("");

// // //         setConversations((prev) =>
// // //           prev.map((conv) =>
// // //             conv.userId === selectedConversation.userId
// // //               ? {
// // //                   ...conv,
// // //                   lastMessage: newMessage,
// // //                   updatedAt: new Date().toISOString(),
// // //                 }
// // //               : conv
// // //           )
// // //         );
// // //       }
// // //     } catch (error) {
// // //       console.error("Error sending message:", error);
// // //     } finally {
// // //       setSendingMessage(false);
// // //     }
// // //   };

// // //   const handleCreateContract = (opportunityData) => {
// // //     if (role !== "sponsor") return;

// // //     navigate("/CreateContractPage", {
// // //       state: {
// // //         opportunity: {
// // //           _id: opportunityData.opportunityId,
// // //           athleteId: opportunityData.athleteId,
// // //           title: opportunityData.title,
// // //           sport: opportunityData.sport,
// // //           priceAsk: opportunityData.totalPrice,
// // //           description: opportunityData.description,
// // //         },
// // //       },
// // //     });
// // //   };

// // //   const truncateMessage = (message) => {
// // //     if (!message) return "";
// // //     const words = message.split(" ");
// // //     return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
// // //   };

// // //   if (loading) return <div className="p-4">Loading conversations...</div>;
// // //   if (error) return <div className="p-4 text-red-500">{error}</div>;

// // //   return (
// // //     <div className="h-screen flex bg-gray-100 w-full">
// // //       <div className="w-1/3 bg-white border-r overflow-y-auto">
// // //         <div className="p-4 border-b">
// // //           <h2 className="text-xl font-semibold">Messages</h2>
// // //         </div>
// // //         {conversations.map((conversation) => (
// // //           <div
// // //             key={conversation.userId}
// // //             onClick={() => handleConversationSelect(conversation)}
// // //             className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
// // //               selectedConversation?.userId === conversation.userId
// // //                 ? "bg-blue-50"
// // //                 : ""
// // //             }`}
// // //           >
// // //             <h3 className="font-medium">{conversation.name}</h3>
// // //             <p className="text-sm text-gray-500 mt-1">
// // //               {truncateMessage(conversation.lastMessage)}
// // //             </p>
// // //             <p className="text-xs text-gray-400 mt-1">
// // //               {format(new Date(conversation.updatedAt), "MMM d, HH:mm")}
// // //             </p>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="flex-1 flex flex-col">
// // //         {selectedConversation ? (
// // //           <>
// // //             <div className="p-4 bg-white border-b">
// // //               <h3 className="font-medium text-lg">
// // //                 {selectedConversation.name}
// // //               </h3>
// // //             </div>

// // //             <div className="flex-1 overflow-y-auto p-8 space-y-4">
// // //               {messagesLoading ? (
// // //                 <div className="flex justify-center items-center h-full">
// // //                   <span>Loading messages...</span>
// // //                 </div>
// // //               ) : (
// // //                 messages.map((message, index) => {
// // //                   const isCurrentUser = message.senderId === userId;
// // //                   return (
// // //                     <div key={index}>
// // //                       {/* Regular Message */}
// // //                       <div
// // //                         className={`flex ${
// // //                           isCurrentUser ? "justify-end" : "justify-start"
// // //                         } mb-4`}
// // //                       >
// // //                         <div
// // //                           className={`max-w-[70%] rounded-lg px-4 py-2 ${
// // //                             isCurrentUser
// // //                               ? "bg-blue-500 text-white"
// // //                               : "bg-gray-200"
// // //                           }`}
// // //                         >
// // //                           <p>{message.content}</p>
// // //                           <span className="text-xs opacity-70">
// // //                             {format(new Date(message.createdAt), "HH:mm")}
// // //                           </span>
// // //                         </div>
// // //                       </div>

// // //                       {/* Opportunity Card (if exists) */}
// // //                       {message.opportunityData && (
// // //                         <div
// // //                           className={`flex ${
// // //                             isCurrentUser ? "justify-end" : "justify-start"
// // //                           } mb-4`}
// // //                         >
// // //                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
// // //                             <div className="border-b pb-2 mb-2">
// // //                               <h4 className="font-semibold text-lg">
// // //                                 {message.opportunityData.title}
// // //                               </h4>
// // //                               <div className="flex justify-between items-center mt-1">
// // //                                 <span className="text-sm text-gray-600">
// // //                                   Sport: {message.opportunityData.sport}
// // //                                 </span>
// // //                                 <span className="text-green-600 font-medium">
// // //                                   ${message.opportunityData.totalPrice}
// // //                                 </span>
// // //                               </div>
// // //                               <p className="text-sm text-gray-700 mt-2">
// // //                                 {message.opportunityData.description}
// // //                               </p>
// // //                             </div>
// // //                             <div className="flex justify-between items-center">
// // //                               <span className="text-xs text-gray-400">
// // //                                 {format(
// // //                                   new Date(message.createdAt),
// // //                                   "MMM d, HH:mm"
// // //                                 )}
// // //                               </span>
// // //                               {role === "sponsor" && (
// // //                                 <button
// // //                                   onClick={() =>
// // //                                     handleCreateContract(
// // //                                       message.opportunityData
// // //                                     )
// // //                                   }
// // //                                   className="bg-green-500 text-white text-sm px-4 py-1 rounded-full hover:bg-green-600"
// // //                                 >
// // //                                   Send Contract
// // //                                 </button>
// // //                               )}
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   );
// // //                 })
// // //               )}
// // //             </div>

// // //             <div className="p-4 bg-white border-t">
// // //               <form
// // //                 onSubmit={handleSendMessageInConversation}
// // //                 className="flex gap-2"
// // //               >
// // //                 <input
// // //                   type="text"
// // //                   value={newMessage}
// // //                   onChange={(e) => setNewMessage(e.target.value)}
// // //                   disabled={sendingMessage}
// // //                   className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
// // //                   placeholder="Type a message..."
// // //                 />
// // //                 <button
// // //                   type="submit"
// // //                   disabled={sendingMessage || !newMessage.trim()}
// // //                   className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 disabled:opacity-50"
// // //                 >
// // //                   {sendingMessage ? "Sending..." : "Send"}
// // //                 </button>
// // //               </form>
// // //             </div>
// // //           </>
// // //         ) : (
// // //           <div className="flex-1 flex items-center justify-center text-gray-500">
// // //             Select a conversation to start messaging
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // // BASEMOD
// // import { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { supabase } from "../../lib/supabaseClient";
// // import { format } from "date-fns";
// // import useAuth from "../../hooks/useAuth";
// // import { PROSPONSER } from "../../https/config";

// // export default function Messages() {
// //   const { role } = useAuth();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [conversations, setConversations] = useState([]);
// //   const [selectedConversation, setSelectedConversation] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [messagesLoading, setMessagesLoading] = useState(false);
// //   const [sendingMessage, setSendingMessage] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [userId, setUserId] = useState(null);
// //   const [newMessage, setNewMessage] = useState("");

// //   useEffect(() => {
// //     const initializeMessages = async () => {
// //       await fetchConversations();
// //       if (location.state?.selectedConversation) {
// //         handleConversationSelect(location.state.selectedConversation);
// //       }
// //     };

// //     initializeMessages();
// //   }, []);

// //   const fetchConversations = async () => {
// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) throw new Error("No authenticated session");
// //       setUserId(session.user.id);

// //       const response = await PROSPONSER.get(
// //         `/messages/conversations?userId=${session.user.id}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${session.access_token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         setConversations(response.data.data);
// //       }
// //     } catch (error) {
// //       setError("Failed to load conversations");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchMessages = async (otherUserId, currentUserId) => {
// //     try {
// //       setMessagesLoading(true);
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();

// //       const response = await PROSPONSER.get(
// //         `/messages/messages/${otherUserId}?userId=${currentUserId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${session.access_token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         setMessages(response.data.data || []);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching messages:", error);
// //     } finally {
// //       setMessagesLoading(false);
// //     }
// //   };

// //   const handleConversationSelect = async (conversation) => {
// //     setSelectedConversation(conversation);
// //     const {
// //       data: { session },
// //     } = await supabase.auth.getSession();
// //     await fetchMessages(conversation.userId, session.user.id);
// //   };

// //   const handleSendMessageInConversation = async (e) => {
// //     e.preventDefault();
// //     if (!newMessage.trim() || !selectedConversation) return;

// //     try {
// //       setSendingMessage(true);
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) throw new Error("No authenticated session");

// //       const messageData = {
// //         senderId: session.user.id,
// //         receiverId: selectedConversation.userId,
// //         senderName: session.user.user_metadata.full_name,
// //         receiverName: selectedConversation.name,
// //         content: newMessage,
// //       };

// //       const response = await PROSPONSER.post("/messages", messageData, {
// //         headers: {
// //           Authorization: `Bearer ${session.access_token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (response.data.success) {
// //         const newMessageObj = {
// //           ...response.data.data,
// //           senderId: session.user.id,
// //           createdAt: new Date().toISOString(),
// //         };

// //         setMessages((prev) => [...prev, newMessageObj]);
// //         setNewMessage("");

// //         setConversations((prev) =>
// //           prev.map((conv) =>
// //             conv.userId === selectedConversation.userId
// //               ? {
// //                   ...conv,
// //                   lastMessage: newMessage,
// //                   updatedAt: new Date().toISOString(),
// //                 }
// //               : conv
// //           )
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //     } finally {
// //       setSendingMessage(false);
// //     }
// //   };

// //   const handleCreateContract = (opportunityData) => {
// //     if (role !== "sponsor") return;

// //     navigate("/CreateContractPage", {
// //       state: {
// //         opportunity: {
// //           _id: opportunityData.opportunityId,
// //           athleteId: opportunityData.athleteId,
// //           title: opportunityData.title,
// //           sport: opportunityData.sport,
// //           priceAsk: opportunityData.totalPrice,
// //           description: opportunityData.description,
// //         },
// //       },
// //     });
// //   };

// //   const truncateMessage = (message) => {
// //     if (!message) return "";
// //     const words = message.split(" ");
// //     return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
// //   };

// //   if (loading) return <div className="p-4">Loading conversations...</div>;
// //   if (error) return <div className="p-4 text-red-500">{error}</div>;

// //   return (
// //     <div className="h-screen flex bg-gray-100 w-full">
// //       <div className="w-1/3 bg-white border-r overflow-y-auto">
// //         <div className="p-4 border-b">
// //           <h2 className="text-xl font-semibold">Messages</h2>
// //         </div>
// //         {conversations.map((conversation) => (
// //           <div
// //             key={conversation.userId}
// //             onClick={() => handleConversationSelect(conversation)}
// //             className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
// //               selectedConversation?.userId === conversation.userId
// //                 ? "bg-blue-50"
// //                 : ""
// //             }`}
// //           >
// //             <h3 className="font-medium">{conversation.name}</h3>
// //             <p className="text-sm text-gray-500 mt-1">
// //               {truncateMessage(conversation.lastMessage)}
// //             </p>
// //             <p className="text-xs text-gray-400 mt-1">
// //               {format(new Date(conversation.updatedAt), "MMM d, HH:mm")}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="flex-1 flex flex-col">
// //         {selectedConversation ? (
// //           <>
// //             <div className="p-4 bg-white border-b">
// //               <h3 className="font-medium text-lg">
// //                 {selectedConversation.name}
// //               </h3>
// //             </div>

// //             <div className="flex-1 overflow-y-auto p-8 space-y-4">
// //               {messagesLoading ? (
// //                 <div className="flex justify-center items-center h-full">
// //                   <span>Loading messages...</span>
// //                 </div>
// //               ) : (
// //                 messages.map((message, index) => {
// //                   const isCurrentUser = message.senderId === userId;
// //                   return (
// //                     <div key={index}>
// //                       {/* Regular Message */}
// //                       <div
// //                         className={`flex ${
// //                           isCurrentUser ? "justify-end" : "justify-start"
// //                         } mb-4`}
// //                       >
// //                         <div
// //                           className={`max-w-[70%] rounded-lg px-4 py-2 ${
// //                             isCurrentUser
// //                               ? "bg-blue-500 text-white"
// //                               : "bg-gray-200"
// //                           }`}
// //                         >
// //                           <p>{message.content}</p>
// //                           <span className="text-xs opacity-70">
// //                             {format(
// //                               new Date(message.createdAt),
// //                               "MMM d, HH:mm"
// //                             )}
// //                           </span>
// //                         </div>
// //                       </div>
// //                       {/* Contract Offer Card */}
// //                       {message.contractData && (
// //                         <div
// //                           className={`flex ${
// //                             isCurrentUser ? "justify-end" : "justify-start"
// //                           } mb-4`}
// //                         >
// //                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
// //                             <div className="border-b pb-2 mb-2">
// //                               <h4 className="font-semibold text-lg">
// //                                 Contract Offer: {message.contractData.title}
// //                               </h4>
// //                               <div className="flex justify-between items-center mt-1">
// //                                 <span className="text-sm text-gray-600">
// //                                   Sport: {message.contractData.sport}
// //                                 </span>
// //                                 <span className="text-green-600 font-medium">
// //                                   $
// //                                   {message.contractData.totalPrice?.toLocaleString()}
// //                                 </span>
// //                               </div>
// //                             </div>
// //                             <div className="flex justify-between items-center">
// //                               <span className="text-xs text-gray-400">
// //                                 {format(
// //                                   new Date(message.createdAt),
// //                                   "MMM d, HH:mm"
// //                                 )}
// //                               </span>
// //                               <button
// //                                 onClick={() =>
// //                                   navigate(
// //                                     `/contracts/${message.contractData._id}`
// //                                   )
// //                                 }
// //                                 className="bg-[#4F46E5] text-white text-sm px-4 py-1 rounded-full hover:bg-[#4338CA]"
// //                               >
// //                                 View Contract
// //                               </button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       )}
// //                       {/* Opportunity Card (if exists) */}
// //                       {message.opportunityData && (
// //                         <div
// //                           className={`flex ${
// //                             isCurrentUser ? "justify-end" : "justify-start"
// //                           } mb-4`}
// //                         >
// //                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
// //                             <div className="border-b pb-2 mb-2">
// //                               <h4 className="font-semibold text-lg">
// //                                 {message.opportunityData.title}
// //                               </h4>
// //                               <div className="flex justify-between items-center mt-1">
// //                                 <span className="text-sm text-gray-600">
// //                                   Sport: {message.opportunityData.sport}
// //                                 </span>
// //                                 <span className="text-green-600 font-medium">
// //                                   ${message.opportunityData.totalPrice}
// //                                 </span>
// //                               </div>
// //                               <p className="text-sm text-gray-700 mt-2">
// //                                 {message.opportunityData.description}
// //                               </p>
// //                             </div>
// //                             <div className="flex justify-between items-center">
// //                               <span className="text-xs text-gray-400">
// //                                 {format(
// //                                   new Date(message.createdAt),
// //                                   "MMM d, HH:mm"
// //                                 )}
// //                               </span>
// //                               {role === "sponsor" && (
// //                                 <button
// //                                   onClick={() =>
// //                                     handleCreateContract(
// //                                       message.opportunityData
// //                                     )
// //                                   }
// //                                   className="bg-green-500 text-white text-sm px-4 py-1 rounded-full hover:bg-green-600"
// //                                 >
// //                                   Send Contract
// //                                 </button>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   );
// //                 })
// //               )}
// //             </div>

// //             <div className="p-4 bg-white border-t">
// //               <form
// //                 onSubmit={handleSendMessageInConversation}
// //                 className="flex gap-2"
// //               >
// //                 <input
// //                   type="text"
// //                   value={newMessage}
// //                   onChange={(e) => setNewMessage(e.target.value)}
// //                   disabled={sendingMessage}
// //                   className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
// //                   placeholder="Type a message..."
// //                 />
// //                 <button
// //                   type="submit"
// //                   disabled={sendingMessage || !newMessage.trim()}
// //                   className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 disabled:opacity-50"
// //                 >
// //                   {sendingMessage ? "Sending..." : "Send"}
// //                 </button>
// //               </form>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center text-gray-500">
// //             Select a conversation to start messaging
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient";
// import { format } from "date-fns";
// import useAuth from "../../hooks/useAuth";
// import { PROSPONSER } from "../../https/config";

// export default function Messages() {
//   const { role } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [messagesLoading, setMessagesLoading] = useState(false);
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const initializeMessages = async () => {
//       await fetchConversations();
//       if (location.state?.selectedConversation) {
//         handleConversationSelect(location.state.selectedConversation);
//       }
//     };

//     initializeMessages();
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
//       {/* Conversations List */}
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

//       {/* Messages Area */}
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
//                             {format(
//                               new Date(message.createdAt),
//                               "MMM d, HH:mm"
//                             )}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Contract Offer Card - Make sure this part exists and is not commented out */}
//                       {message.contractData && (
//                         <div
//                           className={`flex ${
//                             isCurrentUser ? "justify-end" : "justify-start"
//                           } mb-4`}
//                         >
//                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
//                             <div className="border-b pb-2 mb-2">
//                               <h4 className="font-semibold text-lg">
//                                 Contract Offer: {message.contractData.title}
//                               </h4>
//                               <div className="flex justify-between items-center mt-1">
//                                 <span className="text-sm text-gray-600">
//                                   Sport: {message.contractData.sport}
//                                 </span>
//                                 <span className="text-green-600 font-medium">
//                                   $
//                                   {message.contractData.totalPrice?.toLocaleString()}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">
//                                 {format(
//                                   new Date(message.createdAt),
//                                   "MMM d, HH:mm"
//                                 )}
//                               </span>
//                               <button
//                                 onClick={() =>
//                                   navigate(
//                                     `/contracts/${message.contractData._id}`
//                                   )
//                                 }
//                                 className="bg-[#4F46E5] text-white text-sm px-4 py-1 rounded-full hover:bg-[#4338CA]"
//                               >
//                                 View Contract
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                       {/* Opportunity Card */}
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

//             {/* Message Input Form */}
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
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { supabase } from "../../lib/supabaseClient";
// // import { format } from "date-fns";
// // import useAuth from "../../hooks/useAuth";
// // import { PROSPONSER } from "../../https/config";

// // export default function Messages() {
// //   const { role } = useAuth();
// //   const [conversations, setConversations] = useState([]);
// //   const [selectedConversation, setSelectedConversation] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [messagesLoading, setMessagesLoading] = useState(false);
// //   const [sendingMessage, setSendingMessage] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [userId, setUserId] = useState(null);
// //   const [newMessage, setNewMessage] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchConversations();
// //   }, []);

// //   const fetchConversations = async () => {
// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) throw new Error("No authenticated session");
// //       setUserId(session.user.id);

// //       const response = await PROSPONSER.get(
// //         `/messages/conversations?userId=${session.user.id}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${session.access_token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         setConversations(response.data.data);
// //       }
// //     } catch (error) {
// //       setError("Failed to load conversations");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchMessages = async (otherUserId, currentUserId) => {
// //     try {
// //       setMessagesLoading(true);
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();

// //       const response = await PROSPONSER.get(
// //         `/messages/messages/${otherUserId}?userId=${currentUserId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${session.access_token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         setMessages(response.data.data || []);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching messages:", error);
// //     } finally {
// //       setMessagesLoading(false);
// //     }
// //   };

// //   const handleConversationSelect = async (conversation) => {
// //     setSelectedConversation(conversation);
// //     const {
// //       data: { session },
// //     } = await supabase.auth.getSession();
// //     await fetchMessages(conversation.userId, session.user.id);
// //   };

// //   const handleSendMessageInConversation = async (e) => {
// //     e.preventDefault();
// //     if (!newMessage.trim() || !selectedConversation) return;

// //     try {
// //       setSendingMessage(true);
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) throw new Error("No authenticated session");

// //       const messageData = {
// //         senderId: session.user.id,
// //         receiverId: selectedConversation.userId,
// //         senderName: session.user.user_metadata.full_name,
// //         receiverName: selectedConversation.name,
// //         content: newMessage,
// //       };

// //       const response = await PROSPONSER.post("/messages", messageData, {
// //         headers: {
// //           Authorization: `Bearer ${session.access_token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (response.data.success) {
// //         const newMessageObj = {
// //           ...response.data.data,
// //           senderId: session.user.id,
// //           createdAt: new Date().toISOString(),
// //         };

// //         setMessages((prev) => [...prev, newMessageObj]);
// //         setNewMessage("");

// //         setConversations((prev) =>
// //           prev.map((conv) =>
// //             conv.userId === selectedConversation.userId
// //               ? {
// //                   ...conv,
// //                   lastMessage: newMessage,
// //                   updatedAt: new Date().toISOString(),
// //                 }
// //               : conv
// //           )
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //     } finally {
// //       setSendingMessage(false);
// //     }
// //   };

// //   const handleCreateContract = (opportunityData) => {
// //     if (role !== "sponsor") return;

// //     navigate("/CreateContractPage", {
// //       state: {
// //         opportunity: {
// //           _id: opportunityData.opportunityId,
// //           athleteId: opportunityData.athleteId,
// //           title: opportunityData.title,
// //           sport: opportunityData.sport,
// //           priceAsk: opportunityData.totalPrice,
// //           description: opportunityData.description,
// //         },
// //       },
// //     });
// //   };

// //   const truncateMessage = (message) => {
// //     if (!message) return "";
// //     const words = message.split(" ");
// //     return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
// //   };

// //   if (loading) return <div className="p-4">Loading conversations...</div>;
// //   if (error) return <div className="p-4 text-red-500">{error}</div>;

// //   return (
// //     <div className="h-screen flex bg-gray-100 w-full">
// //       <div className="w-1/3 bg-white border-r overflow-y-auto">
// //         <div className="p-4 border-b">
// //           <h2 className="text-xl font-semibold">Messages</h2>
// //         </div>
// //         {conversations.map((conversation) => (
// //           <div
// //             key={conversation.userId}
// //             onClick={() => handleConversationSelect(conversation)}
// //             className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
// //               selectedConversation?.userId === conversation.userId
// //                 ? "bg-blue-50"
// //                 : ""
// //             }`}
// //           >
// //             <h3 className="font-medium">{conversation.name}</h3>
// //             <p className="text-sm text-gray-500 mt-1">
// //               {truncateMessage(conversation.lastMessage)}
// //             </p>
// //             <p className="text-xs text-gray-400 mt-1">
// //               {format(new Date(conversation.updatedAt), "MMM d, HH:mm")}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="flex-1 flex flex-col">
// //         {selectedConversation ? (
// //           <>
// //             <div className="p-4 bg-white border-b">
// //               <h3 className="font-medium text-lg">
// //                 {selectedConversation.name}
// //               </h3>
// //             </div>

// //             <div className="flex-1 overflow-y-auto p-8 space-y-4">
// //               {messagesLoading ? (
// //                 <div className="flex justify-center items-center h-full">
// //                   <span>Loading messages...</span>
// //                 </div>
// //               ) : (
// //                 messages.map((message, index) => {
// //                   const isCurrentUser = message.senderId === userId;
// //                   return (
// //                     <div key={index}>
// //                       {/* Regular Message */}
// //                       <div
// //                         className={`flex ${
// //                           isCurrentUser ? "justify-end" : "justify-start"
// //                         } mb-4`}
// //                       >
// //                         <div
// //                           className={`max-w-[70%] rounded-lg px-4 py-2 ${
// //                             isCurrentUser
// //                               ? "bg-blue-500 text-white"
// //                               : "bg-gray-200"
// //                           }`}
// //                         >
// //                           <p>{message.content}</p>
// //                           <span className="text-xs opacity-70">
// //                             {format(new Date(message.createdAt), "HH:mm")}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       {/* Opportunity Card (if exists) */}
// //                       {message.opportunityData && (
// //                         <div
// //                           className={`flex ${
// //                             isCurrentUser ? "justify-end" : "justify-start"
// //                           } mb-4`}
// //                         >
// //                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
// //                             <div className="border-b pb-2 mb-2">
// //                               <h4 className="font-semibold text-lg">
// //                                 {message.opportunityData.title}
// //                               </h4>
// //                               <div className="flex justify-between items-center mt-1">
// //                                 <span className="text-sm text-gray-600">
// //                                   Sport: {message.opportunityData.sport}
// //                                 </span>
// //                                 <span className="text-green-600 font-medium">
// //                                   ${message.opportunityData.totalPrice}
// //                                 </span>
// //                               </div>
// //                               <p className="text-sm text-gray-700 mt-2">
// //                                 {message.opportunityData.description}
// //                               </p>
// //                             </div>
// //                             <div className="flex justify-between items-center">
// //                               <span className="text-xs text-gray-400">
// //                                 {format(
// //                                   new Date(message.createdAt),
// //                                   "MMM d, HH:mm"
// //                                 )}
// //                               </span>
// //                               {role === "sponsor" && (
// //                                 <button
// //                                   onClick={() =>
// //                                     handleCreateContract(
// //                                       message.opportunityData
// //                                     )
// //                                   }
// //                                   className="bg-green-500 text-white text-sm px-4 py-1 rounded-full hover:bg-green-600"
// //                                 >
// //                                   Send Contract
// //                                 </button>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   );
// //                 })
// //               )}
// //             </div>

// //             <div className="p-4 bg-white border-t">
// //               <form
// //                 onSubmit={handleSendMessageInConversation}
// //                 className="flex gap-2"
// //               >
// //                 <input
// //                   type="text"
// //                   value={newMessage}
// //                   onChange={(e) => setNewMessage(e.target.value)}
// //                   disabled={sendingMessage}
// //                   className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
// //                   placeholder="Type a message..."
// //                 />
// //                 <button
// //                   type="submit"
// //                   disabled={sendingMessage || !newMessage.trim()}
// //                   className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 disabled:opacity-50"
// //                 >
// //                   {sendingMessage ? "Sending..." : "Send"}
// //                 </button>
// //               </form>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center text-gray-500">
// //             Select a conversation to start messaging
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// // // BASEMOD
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient";
// import { format } from "date-fns";
// import useAuth from "../../hooks/useAuth";
// import { PROSPONSER } from "../../https/config";

// export default function Messages() {
//   const { role } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [messagesLoading, setMessagesLoading] = useState(false);
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const initializeMessages = async () => {
//       await fetchConversations();
//       if (location.state?.selectedConversation) {
//         handleConversationSelect(location.state.selectedConversation);
//       }
//     };

//     initializeMessages();
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
//                             {format(
//                               new Date(message.createdAt),
//                               "MMM d, HH:mm"
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                       {/* Contract Offer Card */}
//                       {message.contractData && (
//                         <div
//                           className={`flex ${
//                             isCurrentUser ? "justify-end" : "justify-start"
//                           } mb-4`}
//                         >
//                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
//                             <div className="border-b pb-2 mb-2">
//                               <h4 className="font-semibold text-lg">
//                                 Contract Offer: {message.contractData.title}
//                               </h4>
//                               <div className="flex justify-between items-center mt-1">
//                                 <span className="text-sm text-gray-600">
//                                   Sport: {message.contractData.sport}
//                                 </span>
//                                 <span className="text-green-600 font-medium">
//                                   $
//                                   {message.contractData.totalPrice?.toLocaleString()}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">
//                                 {format(
//                                   new Date(message.createdAt),
//                                   "MMM d, HH:mm"
//                                 )}
//                               </span>
//                               <button
//                                 onClick={() =>
//                                   navigate(
//                                     `/contracts/${message.contractData._id}`
//                                   )
//                                 }
//                                 className="bg-[#4F46E5] text-white text-sm px-4 py-1 rounded-full hover:bg-[#4338CA]"
//                               >
//                                 View Contract
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
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
// with contract offer
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient";
// import { format } from "date-fns";
// import useAuth from "../../hooks/useAuth";
// import { PROSPONSER } from "../../https/config";

// export default function Messages() {
//   const { role } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [combinedMessages, setCombinedMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [messagesLoading, setMessagesLoading] = useState(false);
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const initializeMessages = async () => {
//       await fetchConversations();
//       if (location.state?.selectedConversation) {
//         handleConversationSelect(location.state.selectedConversation);
//       }
//     };
//     initializeMessages();
//   }, []);

//   useEffect(() => {
//     const combined = [
//       ...messages.map((msg) => ({
//         ...msg,
//         type: "message",
//         timestamp: new Date(msg.createdAt).getTime(),
//       })),
//       ...contracts.map((contract) => ({
//         ...contract,
//         type: "contract",
//         timestamp: new Date(contract.createdAt).getTime(),
//       })),
//     ];
//     const sorted = combined.sort((a, b) => a.timestamp - b.timestamp);
//     setCombinedMessages(sorted);
//   }, [messages, contracts]);

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

//   const fetchContracts = async (otherUserId) => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       const response = await PROSPONSER.get("/contracts", {
//         headers: {
//           Authorization: `Bearer ${session.access_token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const conversationContracts = response.data.filter(
//         (contract) =>
//           (contract.athleteId === userId &&
//             contract.sponsorId === otherUserId) ||
//           (contract.sponsorId === userId && contract.athleteId === otherUserId)
//       );

//       setContracts(conversationContracts);
//     } catch (error) {
//       console.error("Error fetching contracts:", error);
//     }
//   };

//   const handleConversationSelect = async (conversation) => {
//     setSelectedConversation(conversation);
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     await Promise.all([
//       fetchMessages(conversation.userId, session.user.id),
//       fetchContracts(conversation.userId),
//     ]);
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
//                 combinedMessages.map((item, index) => {
//                   const isCurrentUser =
//                     (item.type === "message" && item.senderId === userId) ||
//                     (item.type === "contract" && item.sponsorId === userId);

//                   return (
//                     <div key={`${item.type}-${index}`}>
//                       {item.type === "message" && (
//                         <div
//                           className={`flex ${
//                             isCurrentUser ? "justify-end" : "justify-start"
//                           } mb-4`}
//                         >
//                           <div
//                             className={`max-w-[70%] rounded-lg px-4 py-2 ${
//                               isCurrentUser
//                                 ? "bg-blue-500 text-white"
//                                 : "bg-gray-200"
//                             }`}
//                           >
//                             <p>{item.content}</p>
//                             <span className="text-xs opacity-70">
//                               {format(new Date(item.createdAt), "MMM d, HH:mm")}
//                             </span>
//                           </div>
//                         </div>
//                       )}

//                       {item.type === "contract" && (
//                         <div
//                           className={`flex ${
//                             isCurrentUser ? "justify-end" : "justify-start"
//                           } mb-4`}
//                         >
//                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
//                             <div className="border-b pb-2 mb-2">
//                               <h4 className="font-semibold text-lg">
//                                 Contract Offer
//                               </h4>
//                               <div className="flex justify-between items-center mt-1">
//                                 <span className="text-sm text-gray-600">
//                                   Sport: {item.sport}
//                                 </span>
//                                 <span className="text-green-600 font-medium">
//                                   ${item.totalPrice?.toLocaleString()}
//                                 </span>
//                               </div>
//                               <div className="mt-2">
//                                 <p className="text-sm text-gray-600">
//                                   Status: {item.status}
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">
//                                 {format(
//                                   new Date(item.createdAt),
//                                   "MMM d, HH:mm"
//                                 )}
//                               </span>
//                               <button
//                                 onClick={() =>
//                                   navigate(`/contracts/${item._id}`)
//                                 }
//                                 className="bg-[#4F46E5] text-white text-sm px-4 py-1 rounded-full hover:bg-[#4338CA]"
//                               >
//                                 View Contract
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {item.type === "message" && item.opportunityData && (
//                         <div
//                           className={`flex ${
//                             isCurrentUser ? "justify-end" : "justify-start"
//                           } mb-4`}
//                         >
//                           <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
//                             <div className="border-b pb-2 mb-2">
//                               <h4 className="font-semibold text-lg">
//                                 {item.opportunityData.title}
//                               </h4>
//                               <div className="flex justify-between items-center mt-1">
//                                 <span className="text-sm text-gray-600">
//                                   Sport: {item.opportunityData.sport}
//                                 </span>
//                                 <span className="text-green-600 font-medium">
//                                   ${item.opportunityData.totalPrice}
//                                 </span>
//                               </div>
//                               <p className="text-sm text-gray-700 mt-2">
//                                 {item.opportunityData.description}
//                               </p>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">
//                                 {format(
//                                   new Date(item.createdAt),
//                                   "MMM d, HH:mm"
//                                 )}
//                               </span>
//                               {role === "sponsor" && (
//                                 <button
//                                   onClick={() =>
//                                     handleCreateContract(item.opportunityData)
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
// with contract offer
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { format } from 'date-fns';
import useAuth from '../../hooks/useAuth';
import { PROSPONSER } from '../../https/config';
import { MoreHorizontal, SearchIcon, Send } from 'lucide-react';
import image from '../../assets/images/Rectangle 34624146.png';
import smile from '../../assets/icons/smile.png';
import paperclip from '../../assets/icons/paperclip.png';

export default function Messages() {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [combinedMessages, setCombinedMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [acceptingContractId, setAcceptingContractId] = useState(null);
  const [search, setSearch] = useState();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [combinedMessages]);

  // useEffect(() => {
  //   const initializeMessages = async () => {
  //     await fetchConversations();
  //     if (location.state?.selectedConversation) {
  //       handleConversationSelect(location.state.selectedConversation);
  //     }
  //   };
  //   initializeMessages();
  // }, []);
  useEffect(() => {
    const initializeMessages = async () => {
      await fetchConversations();
      if (location.state?.selectedConversation) {
        await handleConversationSelect(location.state.selectedConversation);
        // Initialize contracts if provided
        if (location.state?.initialContracts) {
          setContracts(location.state.initialContracts);
        }
      }
    };

    initializeMessages();
  }, []);
  useEffect(() => {
    const combined = [
      ...messages.map((msg) => ({
        ...msg,
        type: 'message',
        timestamp: new Date(msg.createdAt).getTime(),
      })),
      ...contracts.map((contract) => ({
        ...contract,
        type: 'contract',
        timestamp: new Date(contract.createdAt).getTime(),
      })),
    ];
    const sorted = combined.sort((a, b) => a.timestamp - b.timestamp);
    setCombinedMessages(sorted);
  }, [messages, contracts]);

  const fetchConversations = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No authenticated session');
      setUserId(session.user.id);

      const response = await PROSPONSER.get(
        `/messages/conversations?userId=${session.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setConversations(response.data.data);
      }
    } catch (error) {
      setError('Failed to load conversations');
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
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setMessages(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const fetchContracts = async (otherUserId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await PROSPONSER.get('/contracts', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      const conversationContracts = response.data.filter(
        (contract) =>
          (contract.athleteId === userId &&
            contract.sponsorId === otherUserId) ||
          (contract.sponsorId === userId && contract.athleteId === otherUserId)
      );

      setContracts(conversationContracts);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  const handleConversationSelect = async (conversation) => {
    setSelectedConversation(conversation);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await Promise.all([
      fetchMessages(conversation.userId, session.user.id),
      fetchContracts(conversation.userId),
    ]);
  };

  const handleSendMessageInConversation = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setSendingMessage(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No authenticated session');

      const messageData = {
        senderId: session.user.id,
        receiverId: selectedConversation.userId,
        senderName: session.user.user_metadata.full_name,
        receiverName: selectedConversation.name,
        content: newMessage,
      };

      const response = await PROSPONSER.post('/messages', messageData, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const newMessageObj = {
          ...response.data.data,
          senderId: session.user.id,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessageObj]);
        setNewMessage('');
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
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleCreateContract = (opportunityData) => {
    if (role !== 'sponsor') return;
    navigate('/CreateContractPage', {
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
  const handleAcceptContract = async (contractId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await PROSPONSER.put(
        `/contracts/${contractId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      // Refresh contracts after accepting
      await fetchContracts(selectedConversation.userId);
    } catch (error) {
      console.error('Accept contract error:', error);
    }
  };

  const truncateMessage = (message) => {
    if (!message) return '';
    const words = message.split(' ');
    return words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
  };

  if (loading)
    return (
      <div className="container pt-40  flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  const handleMessageSearch = (e) => {
    setSearch(e.target.value);
  };
  const filteredApi = conversations.filter((data) =>
    (data.name || '').toLowerCase().includes((search || '').toLowerCase())
  );

  return (
    <div className=" flex bg-[#F9FAFB] w-full">
      <div className=" p-6 w-96  mt-10">
        <div className=" flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active conversations</h2>
          <h2 className="pr-3 pl-3 pt-1 pb-1 bg-[#F3F4F6] rounded-lg font-[500]">
            4
          </h2>
        </div>
        <div className="flex items-center bg-[#F3F4F6] w-full p-2 pr-4  rounded-md mt-10">
          <input
            type="text"
            className="bg-[#F3F4F6] outline-none w-full text-[#64748B]"
            placeholder="Search..."
            onChange={handleMessageSearch}
          />
          <SearchIcon className="w-5 text-[#64748B]" />
        </div>

        {filteredApi?.map((conversation) => (
          <div
            key={conversation.userId}
            onClick={() => handleConversationSelect(conversation)}
            className={`rounded-lg mt-10 p-3   hover:bg-gray-50 cursor-pointer ${
              selectedConversation?.userId === conversation.userId
                ? 'bg-[#F3F4F6]'
                : 'bg-[#FFFF]'
            } flex gap-4 items-center`}
          >
            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={image}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">
                  When not available
                </span>
              )}
            </div>
            <div>
              <h3 className="font-[500] text-[15.7px]">{conversation.name}</h3>
              <p className="text-sm text-[#637381] font-[500] max-w-[200px] mt-1 overflow-hidden">
                {truncateMessage(conversation.lastMessage)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex max-h-[100vh]  flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 bg-white flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={image}
                    alt="profile-active"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">
                    {selectedConversation.name}
                  </h3>
                  <p className="font-[500] text-[12px] text-[#64748B]">
                    Reply to message
                  </p>
                </div>
              </div>
              <MoreHorizontal />
            </div>

            <div className="flex-1 overflow-auto p-8 space-y-4 bg-[#FFFFFF] ">
              {messagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <span>Loading messages...</span>
                </div>
              ) : (
                combinedMessages.map((item, index) => {
                  const isCurrentUser =
                    (item.type === 'message' && item.senderId === userId) ||
                    (item.type === 'contract' && item.sponsorId === userId);

                  return (
                    <div key={`${item.type}-${index}`}>
                      {item.type === 'message' && (
                        <div
                          className={`flex ${
                            isCurrentUser ? 'justify-end' : 'justify-start'
                          } mb-4`}
                        >
                          <div className={``}>
                            <p className="text-[12.5px] mb-1 font-[500] text-[#64748B]">
                              {selectedConversation.name}
                            </p>
                            <p
                              className={`break-words max-w-[360px]  rounded-lg px-4 py-2 ${
                                isCurrentUser
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200'
                              }`}
                            >
                              {item.content}
                            </p>
                            <span className="text-[12px] text-[#64748B] font-[500] opacity-70">
                              {format(new Date(item.createdAt), 'MMM d, HH:mm')}
                            </span>
                          </div>
                        </div>
                      )}

                      {item.type === 'contract' && (
                        <div
                          className={`flex ${
                            isCurrentUser ? 'justify-end' : 'justify-start'
                          } mb-4`}
                        >
                          <div className="max-w-[85%] w-full sm:max-w-[70%] bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-lg">
                                  Contract Offer
                                </h4>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    item.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : item.status === 'active'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {item.status.charAt(0).toUpperCase() +
                                    item.status.slice(1)}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Sport</p>
                                  <p className="font-medium">{item.sport}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Value</p>
                                  <p className="font-medium text-green-600">
                                    ${item.totalPrice?.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <div className="text-xs text-gray-400">
                                {format(
                                  new Date(item.createdAt),
                                  'MMM d, HH:mm'
                                )}
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <button
                                  onClick={() =>
                                    navigate(`/contracts/${item._id}`)
                                  }
                                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium"
                                >
                                  View Details
                                </button>

                                {!isCurrentUser &&
                                  item.status === 'pending' && (
                                    <button
                                      onClick={async () => {
                                        setAcceptingContractId(item._id);
                                        await handleAcceptContract(item._id);
                                        setAcceptingContractId(null);
                                      }}
                                      disabled={
                                        acceptingContractId === item._id
                                      }
                                      className={`flex-1 ${
                                        acceptingContractId === item._id
                                          ? 'bg-green-300'
                                          : 'bg-green-700 hover:bg-green-800'
                                      } text-white py-2 px-4 rounded-full text-sm font-medium`}
                                    >
                                      {acceptingContractId === item._id
                                        ? 'Accepting...'
                                        : 'Accept Offer'}
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.type === 'message' && item.opportunityData && (
                        <div
                          className={`flex ${
                            isCurrentUser ? 'justify-end' : 'justify-start'
                          } mb-4`}
                        >
                          <div className="max-w-[70%] bg-white rounded-lg shadow-md p-4 border border-gray-200">
                            <div className="border-b pb-2 mb-2">
                              <h4 className="font-semibold text-lg">
                                {item.opportunityData.title}
                              </h4>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-600">
                                  Sport: {item.opportunityData.sport}
                                </span>
                                <span className="text-green-600 font-medium">
                                  ${item.opportunityData.totalPrice}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mt-2">
                                {item.opportunityData.description}
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">
                                {format(
                                  new Date(item.createdAt),
                                  'MMM d, HH:mm'
                                )}
                              </span>
                              {role === 'sponsor' && (
                                <button
                                  onClick={() =>
                                    handleCreateContract(item.opportunityData)
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
              <div ref={messagesEndRef} />
            </div>

            <div className="px-8 py-4 bg-white ">
              <form
                onSubmit={handleSendMessageInConversation}
                className="flex gap-2"
              >
                <div className="flex items-center justify-between border rounded-[5px] px-4 py-2 bg-[#F9FAFB] w-full">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sendingMessage}
                    className=" focus:outline-none focus:border-[#6366F1] bg-[#F9FAFB] w-[70%]"
                    placeholder="Type a message..."
                  />
                  <div className="flex items-center gap-2">
                    <button className="bg-none text-sm font-[500] text-[#64748B] ">
                      Send contract
                    </button>
                    <img
                      src={smile}
                      alt=""
                      className="w-5 h-5 hover:cursor-pointer"
                    />
                    <img
                      src={paperclip}
                      alt=""
                      className="w-5 h-5 hover:cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sendingMessage || !newMessage.trim()}
                  className="bg-[#6366F1] text-white rounded-md px-3 py-2 hover:bg-blue-600 disabled:opacity-50"
                >
                  {sendingMessage ? 'Sending...' : <Send />}
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
