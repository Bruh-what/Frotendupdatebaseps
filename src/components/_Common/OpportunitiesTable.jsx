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
          to="/CreateOpportunity"
          className="flex items-center gap-1 bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-4 rounded-full shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Opportunity</span>
        </Link>
      </div>

      <div className="space-y-2">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity._id}
            className="flex items-center justify-between p-3 rounded-2xl bg-gray-50"
          >
            <div className="space-y-1 flex flex-row gap-2">
              <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">
                  ${opportunity.priceAsk?.toLocaleString()}
                </p>
                {/* <span className="text-sm text-gray-400">•</span>
                <p className="text-sm text-gray-500">{opportunity.sport}</p> */}
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
                state={{ opportunity }}
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
