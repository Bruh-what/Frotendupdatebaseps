import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

function Statcards() {
  // Initialize with null to distinguish between loading and zero values
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const token = sessionData.session.access_token;
        const userId = sessionData.session.user.id;

        const [contractsResponse, opportunitiesResponse] = await Promise.all([
          PROSPONSER.get("/contracts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          PROSPONSER.post(
            "/opportunities/getopportunities",
            { athleteId: userId },
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        const userContracts = contractsResponse.data.filter(
          (contract) =>
            contract.athleteId === userId || contract.sponsorId === userId
        );

        const activeContracts = userContracts.filter(
          (contract) => contract.status.toLowerCase() === "active"
        );

        const totalEarnings = activeContracts.reduce(
          (sum, contract) => sum + (contract.totalPrice || 0),
          0
        );

        const pendingContracts = userContracts.filter(
          (contract) => contract.status.toLowerCase() === "pending"
        ).length;

        if (isMounted) {
          setStats({
            totalEarnings,
            totalOpportunities: opportunitiesResponse.data.length,
            pendingContracts,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || !stats) {
    return <div className="flex justify-between">Loading...</div>;
  }

  return (
    <div className="flex justify-between gap-3">
      <Card
        title="Total Earnings"
        value={`$${stats.totalEarnings.toLocaleString()}`}
        pillText={`${stats.totalEarnings > 0 ? "+" : ""}${
          stats.totalEarnings
        }%`}
        trend={stats.totalEarnings > 0 ? "up" : "down"}
        // period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Opportunities Posted"
        value={stats.totalOpportunities}
        pillText={`${stats.totalOpportunities > 0 ? "+" : ""}${
          stats.totalOpportunities
        }%`}
        trend={stats.totalOpportunities > 0 ? "up" : "down"}
        // period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Pending Offers"
        value={stats.pendingContracts}
        pillText={`${stats.pendingContracts > 0 ? "+" : ""}${
          stats.pendingContracts
        }%`}
        trend={stats.pendingContracts > 0 ? "up" : "down"}
        // period="From Jan 1st - Jul 31st"
      />
    </div>
  );
}

const Card = (props) => {
  const { title, value, pillText, trend, period } = props;

  return (
    <div className="border col-span-4 p-4 rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7] w-1/3">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};

export default Statcards;
