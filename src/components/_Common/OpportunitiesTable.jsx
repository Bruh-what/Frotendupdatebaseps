// import React from "react";
// import { Link } from "react-router-dom";
// import { Eye, Trash2, Plus } from "lucide-react";

// const OpportunitiesTable = () => {
//   const opportunities = [
//     {
//       id: 1,
//       name: "Winter Camapaign",
//       amount: 5000,
//       status: "Open",
//     },
//     {
//       id: 2,
//       name: "Winter Camapaign",
//       amount: 5000,
//       status: "In Progress",
//       highlighted: true,
//     },
//     {
//       id: 3,
//       name: "Winter Camapaign",
//       amount: 5000,
//       status: "Open",
//     },
//     {
//       id: 4,
//       name: "Winter Camapaign",
//       amount: 5000,
//       status: "Contract pending",
//     },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Open":
//         return "bg-green-100 text-green-700";
//       case "Contract pending":
//         return "bg-yellow-100 text-yellow-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="col-span-12 space-y-4 mt-4">
//       <div className="flex items-center justify-between">
//         <h2 className="  text-white px-4 py-2 rounded-full bg-black">
//           Opportunities
//         </h2>
//         <Link to="/CreateOpportunity">
//           <button
//             className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
//             aria-label="Create new opportunity"
//           >
//             <Plus className="w-4 h-4" color="#151515" />
//             <span className="text-gray-900">Create opportunity</span>
//           </button>
//         </Link>
//       </div>

//       <div className="space-y-2">
//         {opportunities.map((opportunity) => (
//           <div
//             key={opportunity.id}
//             className={`flex items-center justify-between p-4 rounded-2xl  ${
//               opportunity.highlighted ? "bg-gray-900" : "bg-gray-50"
//             }`}
//           >
//             <div className="space-y-1">
//               <h3
//                 className={`font-medium ${
//                   opportunity.highlighted ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 {opportunity.name}
//               </h3>
//               <p
//                 className={`text-sm ${
//                   opportunity.highlighted ? "text-gray-400" : "text-gray-500"
//                 }`}
//               >
//                 ${opportunity.amount}
//               </p>
//             </div>

//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                   opportunity.status
//                 )}`}
//               >
//                 {opportunity.status}
//               </span>
//               <div className="flex items-center gap-2">
//                 <button
//                   className={`p-1 rounded-lg hover:bg-gray-200 ${
//                     opportunity.highlighted ? "text-gray-400" : "text-gray-500"
//                   }`}
//                   aria-label="View opportunity details"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 <button
//                   className={`p-1 rounded-lg hover:bg-gray-200 ${
//                     opportunity.highlighted ? "text-gray-400" : "text-gray-500"
//                   }`}
//                   aria-label="Delete opportunity"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OpportunitiesTable;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Eye, Trash2, Plus } from "lucide-react";
// import { supabase } from "../../lib/supabaseClient";

// const OpportunitiesTable = () => {
//   const [opportunities, setOpportunities] = useState([]);

//   const fetchOpportunities = async () => {
//     const { data, error } = await supabase.auth.getSession();
//     const token = data.session.access_token;
//     let userid = data.session.user.id;

//     const opportunityData = {
//       athleteId: userid,
//     };

//     try {
//       const response = await axios.post(
//         "/api/opportunities/getopportunities",
//         opportunityData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Opportunities fetched:", response.data);
//       setOpportunities(response.data);
//     } catch (error) {
//       console.error("Error fetching opportunities:", error);
//       alert("Failed to fetch opportunities.");
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, []);

//   return (
//     <div className="col-span-12 space-y-4 mt-4">
//       <div className="flex items-center justify-between">
//         <h2 className="  text-white px-4 py-2 rounded-full bg-black">
//           Opportunities
//         </h2>
//         <Link to="/CreateOpportunity">
//           <button
//             className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
//             aria-label="Create new opportunity"
//           >
//             <Plus className="w-4 h-4" color="#151515" />
//             <span className="text-gray-900">Create opportunity</span>
//           </button>
//         </Link>
//       </div>

//       <div className="space-y-2">
//         {opportunities.map((opportunity) => (
//           <div
//             key={opportunity._id}
//             className={`flex items-center justify-between p-4 rounded-2xl bg-gray-50`}
//           >
//             <div className="space-y-1">
//               <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
//               <p className="text-sm text-gray-500">${opportunity.priceAsk}</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${
//                   opportunity.isActive
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {opportunity.isActive ? "Active" : "Inactive"}
//               </span>
//               <div className="flex items-center gap-2">
//                 <button
//                   className="p-1 rounded-lg hover:bg-gray-200 text-gray-500"
//                   aria-label="View opportunity details"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded-lg hover:bg-gray-200 text-gray-500"
//                   aria-label="Delete opportunity"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OpportunitiesTable;
// export default OpportunitiesTable;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Eye, Trash2, Plus } from "lucide-react";
// import { supabase } from "../../lib/supabaseClient";

// const OpportunitiesTable = () => {
//   const [opportunities, setOpportunities] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getStatusColor = (opportunity) => {
//     if (!opportunity.isActive) return "bg-red-100 text-red-800";

//     const relatedContract = contracts.find(
//       (contract) => contract.opportunityId === opportunity._id
//     );

//     if (relatedContract) {
//       if (relatedContract.status.toLowerCase() === "active") {
//         return "bg-green-100 text-green-800";
//       }
//       if (relatedContract.status.toLowerCase() === "pending") {
//         return "bg-yellow-100 text-yellow-800";
//       }
//     }

//     return "bg-blue-100 text-blue-800";
//   };

//   const getStatusText = (opportunity) => {
//     if (!opportunity.isActive) return "Closed";

//     const relatedContract = contracts.find(
//       (contract) => contract.opportunityId === opportunity._id
//     );

//     if (relatedContract) {
//       return (
//         relatedContract.status.charAt(0).toUpperCase() +
//         relatedContract.status.slice(1).toLowerCase()
//       );
//     }

//     return "Open";
//   };

//   const fetchData = async () => {
//     try {
//       const { data: sessionData } = await supabase.auth.getSession();
//       const token = sessionData.session.access_token;
//       const userId = sessionData.session.user.id;

//       const [opportunitiesResponse, contractsResponse] = await Promise.all([
//         axios.post(
//           "/api/opportunities/getopportunities",
//           { athleteId: userId },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         ),
//         axios.get("/api/contracts", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),
//       ]);

//       setOpportunities(opportunitiesResponse.data);
//       setContracts(contractsResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const deleteOpportunity = async (opportunityId) => {
//     try {
//       // Get session using Supabase
//       const { data, error } = await supabase.auth.getSession();
//       if (error) {
//         throw new Error("Authentication error");
//       }

//       const token = data.session.access_token;

//       // Update the URL to match your backend route
//       const response = await axios.delete(
//         `/opportunities/${opportunityId}`, // Changed from /api/opportunities/delete/${opportunityId}
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setOpportunities((prevOpportunities) =>
//           prevOpportunities.filter((opp) => opp._id !== opportunityId)
//         );
//         toast.success("Opportunity deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting opportunity:", error);
//       toast.error("Failed to delete opportunity");
//     }
//   };
//   return (
//     <div className="col-span-12 space-y-4 mt-4">
//       <div className="flex items-center justify-between">
//         <h2 className="  text-white px-4 py-2 rounded-full bg-black">
//           Opportunities
//         </h2>
//         <Link to="/CreateOpportunity">
//           <button
//             className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
//             aria-label="Create new opportunity"
//           >
//             <Plus className="w-4 h-4" color="#151515" />
//             <span className="text-gray-900">Create opportunity</span>
//           </button>
//         </Link>
//       </div>

//       <div className="space-y-2">
//         {opportunities.map((opportunity) => (
//           <div
//             key={opportunity._id}
//             className={`flex items-center justify-between p-4 rounded-2xl bg-gray-50`}
//           >
//             <div className="space-y-1">
//               <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
//               <p className="text-sm text-gray-500">${opportunity.priceAsk}</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${
//                   opportunity.isActive
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {opportunity.isActive ? "Active" : "Inactive"}
//               </span>
//               <div className="flex items-center gap-2">
//                 <button
//                   className="p-1 rounded-lg hover:bg-gray-200 text-gray-500"
//                   aria-label="View opportunity details"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 {/* <button
//                   onClick={() => {
//                     if (
//                       window.confirm(
//                         "Are you sure you want to delete this opportunity?"
//                       )
//                     ) {
//                       deleteOpportunity(opportunity.id);
//                     }
//                   }}
//                   className="text-red-500 hover:text-red-700 cursor-pointer"
//                   // className="p-1 rounded-lg hover:bg-gray-200 text-gray-500"
//                   // aria-label="Delete opportunity"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button> */}
//                 <button
//                   onClick={() => {
//                     if (
//                       window.confirm(
//                         "Are you sure you want to delete this opportunity?"
//                       )
//                     ) {
//                       deleteOpportunity(opportunity._id); // Make sure to use _id
//                     }
//                   }}
//                   className="text-red-500 hover:text-red-700 cursor-pointer"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OpportunitiesTable;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Eye, Trash2, Plus } from "lucide-react";
// import { supabase } from "../../lib/supabaseClient";
// import { PROSPONSER } from "../../https/config";

// const OpportunitiesTable = () => {
//   const [opportunities, setOpportunities] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getStatusColor = (opportunity) => {
//     if (!opportunity.isActive) return "bg-red-100 text-red-800";

//     const relatedContract = contracts.find(
//       (contract) => contract.opportunityId === opportunity._id
//     );

//     if (relatedContract) {
//       if (relatedContract.status.toLowerCase() === "active") {
//         return "bg-green-100 text-green-800";
//       }
//       if (relatedContract.status.toLowerCase() === "pending") {
//         return "bg-yellow-100 text-yellow-800";
//       }
//     }

//     return "bg-blue-100 text-blue-800";
//   };

//   const getStatusText = (opportunity) => {
//     if (!opportunity.isActive) return "Closed";

//     const relatedContract = contracts.find(
//       (contract) => contract.opportunityId === opportunity._id
//     );

//     if (relatedContract) {
//       // Show Closed instead of Pending
//       if (relatedContract.status.toLowerCase() === "pending") {
//         return "Closed";
//       }
//       return (
//         relatedContract.status.charAt(0).toUpperCase() +
//         relatedContract.status.slice(1).toLowerCase()
//       );
//     }

//     return "Open";
//   };

//   const fetchData = async () => {
//     try {
//       const { data: sessionData } = await supabase.auth.getSession();
//       const token = sessionData.session.access_token;
//       const userId = sessionData.session.user.id;

//       const [opportunitiesResponse, contractsResponse] = await Promise.all([
//         PROSPONSER.post(
//           "/opportunities/getopportunities",
//           { athleteId: userId },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         ),
//         PROSPONSER.get("/api/contracts", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),
//       ]);

//       setOpportunities(opportunitiesResponse.data);
//       setContracts(contractsResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="col-span-12 space-y-4 mt-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Opportunities</h2>
//         <Link
//           to="/CreateOpportunity"
//           className="flex items-center gap-1 bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-4 rounded-full shadow-xs"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Create Opportunity</span>
//         </Link>
//       </div>

//       <div className="space-y-2">
//         {opportunities.map((opportunity) => (
//           <div
//             key={opportunity._id}
//             className="flex items-center justify-between p-4 rounded-2xl bg-gray-50"
//           >
//             <div className="space-y-1">
//               <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
//               <p className="text-sm text-gray-500">${opportunity.priceAsk}</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                   opportunity
//                 )}`}
//               >
//                 {getStatusText(opportunity)}
//               </span>

//               <Link
//                 to={`/opportunities/${opportunity._id}`}
//                 className="p-2 text-gray-500 hover:text-gray-700"
//               >
//                 <Eye className="w-4 h-4" />
//               </Link>

//               <button
//                 onClick={() => handleDelete(opportunity._id)}
//                 className="p-2 text-gray-500 hover:text-red-600"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default OpportunitiesTable;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Plus } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

const OpportunitiesTable = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (opportunity) => {
    if (!opportunity.isActive) return "bg-gray-100 text-gray-800";
    return "bg-blue-100 text-blue-800";
  };

  const getStatusText = (opportunity) => {
    if (!opportunity.isActive) return "Closed";
    return "Open";
  };

  const fetchOpportunities = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No authenticated session");

      const token = sessionData.session.access_token;
      const userId = sessionData.session.user.id;

      const response = await PROSPONSER.post(
        "/opportunities/getopportunities",
        { athleteId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Opportunities:", response.data);
      setOpportunities(response.data);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  if (loading) return <div>Loading opportunities...</div>;

  return (
    <div className="col-span-12 space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Opportunities</h2>
        <Link
          to="/opportunities/create"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Opportunity
        </Link>
      </div>

      <div className="space-y-2">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity._id}
            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50"
          >
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">
                  ${opportunity.priceAsk?.toLocaleString()}
                </p>
                <span className="text-sm text-gray-400">•</span>
                <p className="text-sm text-gray-500">{opportunity.sport}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  opportunity
                )}`}
              >
                {getStatusText(opportunity)}
              </span>

              <Link
                to={`/opportunities/${opportunity._id}`}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {opportunities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No opportunities found
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesTable;
