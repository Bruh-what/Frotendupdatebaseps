import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Plus, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

// const OpportunitiesTable = () => {
//   const [opportunities, setOpportunities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getStatusColor = (opportunity) => {
//     if (!opportunity.isActive) return "bg-gray-100 text-gray-800";
//     return "bg-blue-100 text-blue-800";
//   };

//   const getStatusText = (opportunity) => {
//     if (!opportunity.isActive) return "Closed";
//     return "Open";
//   };

//   const fetchOpportunities = async () => {
//     try {
//       const { data: sessionData } = await supabase.auth.getSession();
//       if (!sessionData.session) throw new Error("No authenticated session");

//       const token = sessionData.session.access_token;
//       const userId = sessionData.session.user.id;

//       const response = await PROSPONSER.post(
//         "/opportunities/getopportunities",
//         { athleteId: userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Opportunities:", response.data);
//       setOpportunities(response.data);
//     } catch (error) {
//       console.error("Error fetching opportunities:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, []);

//   if (loading) return <div>Loading opportunities...</div>;
const OpportunitiesTable = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOpportunityClosed = (opportunityId) => {
    if (!contracts.length) return false;

    const contract = contracts.find((c) => c.opportunityId === opportunityId);
    return contract && contract.status === "active";
  };

  const getStatusColor = (opportunity) => {
    const isClosed = isOpportunityClosed(opportunity._id);
    return isClosed
      ? "bg-red-100 text-red-800" // Closed
      : "bg-green-100 text-green-800"; // Open
  };

  const getStatusText = (opportunity) => {
    const isClosed = isOpportunityClosed(opportunity._id);
    return isClosed ? "Closed" : "Open";
  };

  const fetchData = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No authenticated session");

      const token = sessionData.session.access_token;
      const userId = sessionData.session.user.id;

      // Fetch both opportunities and contracts
      const [opportunitiesRes, contractsRes] = await Promise.all([
        PROSPONSER.post(
          "/opportunities/getopportunities",
          { athleteId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ),
        PROSPONSER.get("/contracts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setOpportunities(opportunitiesRes.data);
      setContracts(contractsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="col-span-12 space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Opportunities</h2>
        <Link
          to="/CreateOpportunity"
          className="flex items-center gap-1 font-500"
        >
          <Plus className="w-4 h-4 font-[500]" />
          <span className="font-[500]">Create Opportunity</span>
        </Link>
      </div>

      <div className="space-y-2">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity._id}
            className="grid grid-cols-3 items-center p-3 gap-6 rounded-2xl bg-[#F9FAFB]"
          >
            <div className="space-y-1 flex flex-row gap-2">
              <div className="flex flex-col">
                <h3 className="font-[600] text-[18px] text-gray-900 capitalize">
                  {opportunity.title}
                </h3>
                <p className="text-sm font-[500]  text-[#9CA3AF]">
                  ${opportunity.priceAsk?.toLocaleString()}
                </p>
                {/* <span className="text-sm text-gray-400">•</span>
                <p className="text-sm text-gray-500">{opportunity.sport}</p> */}
              </div>
            </div>
            <div className="text-center">
              <span
                className={`px-3 py-1 text-sm font-medium  rounded-full ${getStatusColor(
                  opportunity
                )}`}
              >
                {getStatusText(opportunity)}
              </span>
            </div>

            <div className="flex items-center justify-end">
              <Link
                to={`/opportunities/${opportunity._id}`}
                state={{ opportunity }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Eye className="w-5 h-5 text-black" />
              </Link>
              <Link className="p-2 text-gray-500 hover:text-gray-700">
                <Trash2 className="w-5 h-5 text-black" />
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
