// "use client"

// import { Card, CardContent } from "../../components/_Common/Card"
// import { Badge } from "../../components/_Common/Badge"
// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import useAuth from "../../hooks/useAuth"

// const contracts = [
//   {
//     id: 1,
//     title: "Summer campaign",
//     image:
//       "https://img.freepik.com/free-photo/girl-skates-skateboard_1321-1109.jpg?t=st=1734337328~exp=1734340928~hmac=11119d18e121dee23e344228d4399657ec8f96c8a1b4568ce560ccb2f40cef12&w=740",
//     status: "Active",
//     duration: "12 months",
//     budget: "$1200",
//     escrow: "$1200",
//     rating: 5,
//     timeLeft: "4 months",
//   },
//   {
//     id: 2,
//     title: "Summer campaign",
//     image:
//       "https://img.freepik.com/free-photo/portrait-athlete-competing-olympic-games-tournament_23-2151470970.jpg?t=st=1734338009~exp=1734341609~hmac=ce9af54f31cb7740a4f25d7d49dc7a740c07369f3228e0121523972d651d5c5f&w=740",
//     status: "Active",
//     duration: "12 months",
//     budget: "$1200",
//     escrow: "$1200",
//     rating: 5,
//     timeLeft: "4 months",
//   },
//   {
//     id: 3,
//     title: "Summer campaign",
//     image:
//       "https://img.freepik.com/free-photo/athletic-male-rugby-player-holding-ball-with-dust_23-2148793371.jpg?t=st=1734338121~exp=1734341721~hmac=2ad14113fd7094cc0cd653142b67084de10fcb217ca8637fca99c0a9fe84def2&w=740",
//     status: "Active",
//     duration: "12 months",
//     budget: "$1200",
//     escrow: "$1200",
//     rating: 5,
//     timeLeft: "4 months",
//   },
//   {
//     id: 4,
//     title: "Summer campaign",
//     image:
//       "https://img.freepik.com/free-photo/man-doing-push-ups-rooftop_23-2147618034.jpg?t=st=1734338143~exp=1734341743~hmac=0003955f0e5301be9722e0524a759f9eb70fd0bfbc31844dcaca88853522982d&w=740",
//     status: "Active",
//     duration: "12 months",
//     budget: "$1200",
//     escrow: "$1200",
//     rating: 5,
//     timeLeft: "4 months",
//   },
// ]

// export default function ContractsPage() {
//   const { role } = useAuth() // Get the user's role

//   useEffect(() => {
//     const data = async () => {
//       let contracts = await axios.get("/api/contracts")
//       console.log("contracts", contracts.data)
//     }
//     data()
//   }, [])
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Contracts</h1>

//       <div className="space-y-6 grid grid-cols-2 items-center justify-center">
//         {contracts.map((contract) => (
//           <Card key={contract.id}>
//             <CardContent className="p-6 ">
//               <div className="flex gap-6">
//                 <div className="w-44 h-full relative rounded-lg overflow-hidden">
//                   <img
//                     src={contract.image}
//                     alt={contract.title}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-2">
//                         {contract.title}
//                       </h2>
//                       <Badge variant="success" className="mb-4">
//                         {contract.status}
//                       </Badge>
//                     </div>

//                     <div className="text-right">
//                       {/* <div className="flex items-center gap-0.5 mb-1">
//                         {Array.from({ length: contract.rating }).map((_, i) => (
//                           <span key={i} className="text-purple-600">
//                             ★
//                           </span>
//                         ))}
//                       </div> */}
//                       <p className="text-sm text-muted-foreground">
//                         Time left: {contract.timeLeft}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-3 gap-4 mb-4">
//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Sponsorship duration
//                       </p>
//                       <p className="font-medium">{contract.duration}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Budget</p>
//                       <p className="font-medium">{contract.budget}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">In escrow</p>
//                       <p className="font-medium">{contract.escrow}</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//                       <a
//                         href="/ContractOffer"
//                         className="block text-sm font-normal"
//                       >
//                         View details
//                       </a>
//                     </button>
//                     <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//                       <a href="/messages" className="block text-sm font-normal">
//                         {role === "athlete"
//                           ? "Message Sponsor"
//                           : "Message Athlete"}
//                       </a>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default function ContractsPage() {
//   const navigate = useNavigate();
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         setLoading(true);

//         // Get session data
//         const { data: sessionData, error: sessionError } =
//           await supabase.auth.getSession();

//         if (sessionError) {
//           setError("Authentication error. Please login again.");
//           return;
//         }

//         if (!sessionData?.session) {
//           setError("No active session. Please login.");
//           return;
//         }

//         const userId = sessionData.session.user.id;
//         const userRole = sessionData.session.user.user_metadata.role;
//         setUserRole(userRole);

//         // Make API call with authentication
//         const response = await axios.get("/api/contracts", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionData.session.access_token}`,
//           },
//         });

//         console.log("Fetched contracts:", response.data);
//         setContracts(response.data);
//       } catch (err) {
//         console.error("Error fetching contracts:", err);
//         setError(err.response?.data?.message || "Failed to load contracts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContracts();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "completed":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">Loading contracts...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Contracts</h1>

//       {contracts.length === 0 ? (
//         <div className="text-center text-gray-500">No contracts found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {contracts.map((contract) => (
//             <Card
//               key={contract._id}
//               className="hover:shadow-lg transition-shadow duration-200"
//             >
//               <CardContent className="p-6">
//                 <div className="flex flex-col h-full">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-2">
//                         {contract.sport} Contract
//                       </h2>
//                       <Badge
//                         className={`${getStatusColor(
//                           contract.status
//                         )} px-2 py-1 rounded-full text-xs font-medium`}
//                       >
//                         {contract.status.charAt(0).toUpperCase() +
//                           contract.status.slice(1)}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">
//                         Contract Value
//                       </p>
//                       <p className="font-semibold">
//                         ${contract.totalPrice.toLocaleString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Duration</p>
//                       <p className="font-semibold">12 months</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 mt-auto">
//                     <button
//                       onClick={() => navigate(`/contracts/${contract._id}`)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => navigate("/messages")}
//                       className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       {userRole === "athlete"
//                         ? "Message Sponsor"
//                         : "Message Athlete"}
//                     </button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function ContractsPage() {
//   const navigate = useNavigate();
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         setLoading(true);

//         const { data: sessionData, error: sessionError } =
//           await supabase.auth.getSession();

//         if (sessionError) {
//           setError("Authentication error. Please login again.");
//           return;
//         }

//         if (!sessionData?.session) {
//           setError("No active session. Please login.");
//           return;
//         }

//         const userId = sessionData.session.user.id;
//         const userRole = sessionData.session.user.user_metadata.role;
//         setUserRole(userRole);

//         const response = await axios.get("/api/contracts", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionData.session.access_token}`,
//           },
//         });

//         console.log("Fetched contracts:", response.data);
//         setContracts(response.data);
//       } catch (err) {
//         console.error("Error fetching contracts:", err);
//         setError(err.response?.data?.message || "Failed to load contracts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContracts();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "completed":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">Loading contracts...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Contracts</h1>

//       {contracts.length === 0 ? (
//         <div className="text-center text-gray-500">No contracts found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {contracts.map((contract) => (
//             <Card
//               key={contract._id}
//               className="hover:shadow-lg transition-shadow duration-200"
//             >
//               <CardContent className="p-6">
//                 <div className="flex flex-col h-full">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-2">
//                         {contract.sport} Contract
//                       </h2>
//                       <Badge
//                         className={`${getStatusColor(
//                           contract.status
//                         )} px-2 py-1 rounded-full text-xs font-medium`}
//                       >
//                         {contract.status.charAt(0).toUpperCase() +
//                           contract.status.slice(1)}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4 mb-6">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Athlete ID</p>
//                       <p className="font-semibold text-sm">
//                         {contract.athleteId}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">
//                         Contract Value
//                       </p>
//                       <p className="font-semibold">
//                         ${contract.totalPrice.toLocaleString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Duration</p>
//                       <p className="font-semibold">12 months</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 mt-auto">
//                     <button
//                       onClick={() => navigate(`/contracts/${contract._id}`)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => navigate("/messages")}
//                       className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       {userRole === "athlete"
//                         ? "Message Sponsor"
//                         : "Message Athlete"}
//                     </button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function ContractsPage() {
//   const navigate = useNavigate();
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         setLoading(true);

//         const { data: sessionData, error: sessionError } =
//           await supabase.auth.getSession();

//         if (sessionError) {
//           setError("Authentication error. Please login again.");
//           return;
//         }

//         if (!sessionData?.session) {
//           setError("No active session. Please login.");
//           return;
//         }

//         const userId = sessionData.session.user.id;
//         const role = sessionData.session.user.user_metadata.role; // Changed from user_role to role

//         // Debug logs
//         console.log("Session data:", sessionData.session.user);
//         console.log("Current user ID:", userId);
//         console.log("Role:", role);

//         setUserRole(role);
//         setUserId(userId);

//         const response = await axios.get("/api/contracts", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionData.session.access_token}`,
//           },
//         });

//         const filteredContracts = response.data.filter((contract) => {
//           // Debug log for each contract
//           console.log("Checking contract:", {
//             contractAthleteId: contract.athleteId,
//             contractSponsorId: contract.sponsorId,
//             userId,
//             role,
//             isMatch:
//               role === "athlete"
//                 ? contract.athleteId === userId
//                 : contract.sponsorId === userId,
//           });

//           if (role === "athlete") {
//             return contract.athleteId === userId;
//           } else {
//             return contract.sponsorId === userId;
//           }
//         });

//         console.log("Filtered contracts:", filteredContracts);
//         setContracts(filteredContracts);
//       } catch (err) {
//         console.error("Error fetching contracts:", err);
//         setError(err.response?.data?.message || "Failed to load contracts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContracts();
//   }, []);

//   // Rest of your component remains the same...

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Contracts</h1>

//       {contracts.length === 0 ? (
//         <div className="text-center text-gray-500">No contracts found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {contracts.map((contract) => (
//             <Card
//               key={contract._id}
//               className="hover:shadow-lg transition-shadow duration-200"
//             >
//               <CardContent className="p-6">
//                 <div className="flex flex-col h-full">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-2">
//                         {contract.sport} Contract
//                       </h2>
//                       <Badge
//                         className={`${getStatusColor(
//                           contract.status
//                         )} px-2 py-1 rounded-full text-xs font-medium`}
//                       >
//                         {contract.status.charAt(0).toUpperCase() +
//                           contract.status.slice(1)}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4 mb-6">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Athlete ID</p>
//                       <p className="font-semibold text-sm">
//                         {contract.athleteId}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">
//                         Contract Value
//                       </p>
//                       <p className="font-semibold">
//                         ${contract.totalPrice.toLocaleString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Duration</p>
//                       <p className="font-semibold">12 months</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 mt-auto">
//                     <button
//                       onClick={() => navigate(`/contracts/${contract._id}`)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => navigate("/messages")}
//                       className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       {userRole === "athlete"
//                         ? "Message Sponsor"
//                         : "Message Athlete"}
//                     </button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// BASE MOD
// const getStatusColor = (status) => {
//   switch (status.toLowerCase()) {
//     case "pending":
//       return "bg-yellow-100 text-yellow-800";
//     case "active":
//       return "bg-green-100 text-green-800";
//     case "completed":
//       return "bg-blue-100 text-blue-800";
//     case "cancelled":
//       return "bg-red-100 text-red-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };
// export default function ContractsPage() {
//   const navigate = useNavigate();
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [acceptingId, setAcceptingId] = useState(null);

//   const handleAcceptContract = async (contractId) => {
//     try {
//       setAcceptingId(contractId);
//       const response = await PROSPONSER.put(`/contracts/${contractId}/accept`);

//       if (response.data) {
//         // Update the specific contract in state
//         setContracts((prevContracts) =>
//           prevContracts.map((contract) =>
//             contract._id === contractId
//               ? { ...contract, status: "active" }
//               : contract
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Accept contract error:", error);
//       setError("Failed to accept contract");
//     } finally {
//       setAcceptingId(null);
//     }
//   };
//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         setLoading(true);

//         const { data: sessionData, error: sessionError } =
//           await supabase.auth.getSession();

//         if (sessionError) {
//           setError("Authentication error. Please login again.");
//           return;
//         }

//         if (!sessionData?.session) {
//           setError("No active session. Please login.");
//           return;
//         }

//         const userId = sessionData.session.user.id;
//         const role = sessionData.session.user.user_metadata.role;

//         // Debug logs
//         console.log("Session data:", sessionData.session.user);
//         console.log("Current user ID:", userId);
//         console.log("Role:", role);

//         setUserRole(role);
//         setUserId(userId);

//         const response = await PROSPONSER.get("/contracts", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionData.session.access_token}`,
//           },
//         });

//         const filteredContracts = response.data.filter((contract) => {
//           // Debug log for each contract
//           console.log("Checking contract:", {
//             contractAthleteId: contract.athleteId,
//             contractSponsorId: contract.sponsorId,
//             userId,
//             isMatch:
//               contract.athleteId === userId || contract.sponsorId === userId,
//           });

//           // Show contract if user is either the athlete or the sponsor
//           return contract.athleteId === userId || contract.sponsorId === userId;
//         });

//         console.log("Filtered contracts:", filteredContracts);
//         setContracts(filteredContracts);
//       } catch (err) {
//         console.error("Error fetching contracts:", err);
//         setError(err.response?.data?.message || "Failed to load contracts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContracts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Contracts</h1>

//       {contracts.length === 0 ? (
//         <div className="text-center text-gray-500">No contracts found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {contracts.map((contract) => (
//             <Card
//               key={contract._id}
//               className="hover:shadow-lg transition-shadow duration-200"
//             >
//               <CardContent className="p-6">
//                 <div className="flex flex-col h-full">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-2">
//                         {contract.sport}
//                       </h2>
//                       <Badge
//                         className={`${getStatusColor(
//                           contract.status
//                         )} px-2 py-1 rounded-full text-xs font-medium`}
//                       >
//                         {contract.status.charAt(0).toUpperCase() +
//                           contract.status.slice(1)}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4 mb-6">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Athlete ID</p>
//                       <p className="font-semibold text-sm">
//                         {contract.athleteId}
//                       </p>
//                     </div>

//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">
//                         Contract Value
//                       </p>
//                       <p className="font-semibold">
//                         ${contract.totalPrice.toLocaleString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Duration</p>
//                       <p className="font-semibold">12 months</p>
//                     </div>
//                   </div>

//                   {/* <div className="flex gap-3 mt-auto">
//                     <button
//                       onClick={() => navigate(`/contracts/${contract._id}`)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => navigate("/messages")}
//                       className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
//                     >
//                       {userRole === "athlete"
//                         ? "Message Sponsor"
//                         : "Message Athlete"}
//                     </button>
//                   </div> */}
//                   <div className="flex gap-3 mt-auto">
//                     {/* Keep existing View Details button */}
//                     <button
//                       onClick={() => navigate(`/contracts/${contract._id}`)}
//                       className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium"
//                     >
//                       View Details
//                     </button>

//                     {/* Add accept/message button conditional */}
//                     {contract.athleteId === userId &&
//                     contract.status === "pending" ? (
//                       <button
//                         onClick={() => handleAcceptContract(contract._id)}
//                         disabled={acceptingId === contract._id}
//                         className={`flex-1 ${
//                           acceptingId === contract._id
//                             ? "bg-green-300"
//                             : "bg-green-500 hover:bg-green-600"
//                         } text-white py-2 px-4 rounded-full text-sm font-medium`}
//                       >
//                         {acceptingId === contract._id
//                           ? "Accepting..."
//                           : "Accept Offer"}
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => navigate("/messages")}
//                         className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium"
//                       >
//                         {contract.athleteId === userId
//                           ? "Message Sponsor"
//                           : "Message Athlete"}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// BASE MOD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/_Common/Card";
import { Badge } from "../../components/_Common/Badge";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import { format, addMonths } from "date-fns";

export default function ContractsPage() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [acceptingId, setAcceptingId] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-600 text-white";
      case "active":
        return "bg-green-700 text-white";
      case "completed":
        return "bg-blue-600 text-white";
      case "cancelled":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const handleAcceptContract = async (contractId) => {
    try {
      setAcceptingId(contractId);
      const { data: sessionData } = await supabase.auth.getSession();

      await PROSPONSER.put(
        `/contracts/${contractId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        }
      );

      fetchContracts();
    } catch (error) {
      console.error("Accept contract error:", error);
      setError("Failed to accept contract");
    } finally {
      setAcceptingId(null);
    }
  };

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        setError("Authentication error. Please login again.");
        return;
      }

      if (!sessionData?.session) {
        setError("No active session. Please login.");
        return;
      }

      const userId = sessionData.session.user.id;
      const role = sessionData.session.user.user_metadata.role;

      setUserRole(role);
      setUserId(userId);

      const response = await PROSPONSER.get("/contracts", {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      const filteredContracts = response.data.filter(
        (contract) =>
          contract.athleteId === userId || contract.sponsorId === userId
      );

      setContracts(filteredContracts);

      // Fetch profiles for all unique users
      const uniqueUserIds = [
        ...new Set([
          ...filteredContracts.map((c) => c.athleteId),
          ...filteredContracts.map((c) => c.sponsorId),
        ]),
      ];

      for (const id of uniqueUserIds) {
        try {
          const profileResponse = await PROSPONSER.get(
            `/athletes/profile/${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionData.session.access_token}`,
              },
            }
          );
          setUserProfiles((prev) => ({
            ...prev,
            [id]: profileResponse.data,
          }));
        } catch (err) {
          console.error(`Error fetching profile for ${id}:`, err);
        }
      }
    } catch (err) {
      console.error("Error fetching contracts:", err);
      setError(err.response?.data?.message || "Failed to load contracts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Contracts</h1>

      {contracts.length === 0 ? (
        <div className="text-center text-gray-500">No contracts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract) => (
            <Card key={contract._id} className="overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">
                    {contract.title || contract.sport}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      contract.status
                    )}`}
                  >
                    {contract.status.charAt(0).toUpperCase() +
                      contract.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Athlete</span>
                    <span className="font-medium">
                      {userProfiles[contract.athleteId]?.firstName}{" "}
                      {userProfiles[contract.athleteId]?.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sponsor</span>
                    <span className="font-medium">
                      {userProfiles[contract.sponsorId]?.firstName}{" "}
                      {userProfiles[contract.sponsorId]?.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Value</span>
                    <span className="font-medium">
                      ${contract.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">End Date</span>
                    <span className="font-medium">
                      {format(
                        addMonths(
                          new Date(contract.createdAt),
                          contract.duration || 12
                        ),
                        "dd MMM yyyy"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => navigate(`/contracts/${contract._id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium"
                  >
                    View Details
                  </button>

                  {contract.athleteId === userId &&
                  contract.status === "pending" ? (
                    <button
                      onClick={() => handleAcceptContract(contract._id)}
                      disabled={acceptingId === contract._id}
                      className={`flex-1 ${
                        acceptingId === contract._id
                          ? "bg-green-300"
                          : "bg-green-700 hover:bg-green-800"
                      } text-white py-2 px-4 rounded-full text-sm font-medium`}
                    >
                      {acceptingId === contract._id
                        ? "Accepting..."
                        : "Accept Offer"}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        navigate(
                          `/messages/${
                            userId === contract.athleteId
                              ? contract.sponsorId
                              : contract.athleteId
                          }`
                        )
                      }
                      className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium"
                    >
                      Message{" "}
                      {userId === contract.athleteId ? "Sponsor" : "Athlete"}
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
