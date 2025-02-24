import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import dollar from "../../assets/icons/Vector.svg";
import breifcase from "../../assets/icons/briefcase.svg";
import docs from "../../assets/icons/clipboard-document-list.svg";

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
          (contract) => contract.status.toLowerCase() === "completed"
        );

        const totalEarnings = activeContracts.reduce(
          (sum, contract) => sum + (contract?.totalPrice || 0),
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
    return (
      <div className="container flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex items-center gap-4 border rounded-2xl p-6 w-full">
        <div className="rounded-full bg-[#111827] p-3 w-fit">
          <img src={dollar} alt="money" />
        </div>
        <div>
          <p className="font-[500]">{`+$${stats.totalEarnings.toLocaleString()}`}</p>
          <p className="text-[#9CA3AF] font-[500]">Total Earnings</p>
        </div>
      </div>
      <div className="flex items-center gap-4 border rounded-2xl p-6 w-full">
        <div className="rounded-full bg-[#111827] p-3 w-fit">
          <img src={docs} alt="documents" />
        </div>
        <div>
          <p className="font-[500]">{stats.totalOpportunities}</p>
          <p className="text-[#9CA3AF] font-[500]">Opportunities Posted</p>
        </div>
      </div>
      <div className="flex items-center gap-4 border  rounded-2xl p-6 w-full">
        <div className="rounded-full bg-[#111827] p-3 w-fit">
          <img src={breifcase} alt="case" />
        </div>
        <div>
          <p className="font-[500]">{stats.pendingContracts}</p>
          <p className="text-[#9CA3AF] font-[500]">Pending Offers</p>
        </div>
      </div>
      {/* <Card
        title=""
        value=
        pillText={`${stats.totalOpportunities > 0 ? "+" : ""}${
          stats.totalOpportunities
        }%`}
        trend={stats.totalOpportunities > 0 ? "up" : "down"}
        // period="From Jan 1st - Jul 31st"
      /> */}
      {/* <Card
        title=""
        value=
        pillText={`${stats.pendingContracts > 0 ? "+" : ""}${
          stats.pendingContracts
        }%`}
        trend={stats.pendingContracts > 0 ? "up" : "down"}
        // period="From Jan 1st - Jul 31st"
      /> */}
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
