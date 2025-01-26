// import React from "react";
// import { FiFile, FiTrendingDown, FiTrendingUp } from "react-icons/fi";

// function Statcards() {
//   return (
//     <>
//       <Card
//         title="Total earnings"
//         value="$120,054.24"
//         pillText="2.75%"
//         trend="up"
//         period="From Jan 1st - Jul 31st"
//       />
//       <Card
//         title="Active contracts"
//         value="150"
//         pillText="1.01%"
//         trend="down"
//         period="From Jan 1st - Jul 31st"
//       />
//       <Card
//         title="Open opportunities"
//         value="10"
//         pillText="60.75%"
//         trend="up"
//         period="Previous 365 days"
//       />
//     </>
//   );
// }

// const Card = (props) => {
//   const { title, value, pillText, trend, period } = props;
//   return (
//     <div className="border col-span-4 p-4 rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7]">
//       <div className="flex mb-8 items-start justify-between">
//         <div>
//           <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
//           <p className="text-3xl font-semibold">{value}</p>
//         </div>

//         <span
//           className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
//             trend === "up"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
//         </span>
//       </div>

//       <p className="text-xs text-stone-500">{period}</p>
//     </div>
//   );
// };

// export default Statcards;
// import React, { useState, useEffect } from "react";
// import { FiFile, FiTrendingDown, FiTrendingUp } from "react-icons/fi";

// function Statcards() {
//   const [stats, setStats] = useState({});

//   useEffect(() => {
//     fetch("/athletes/stats")
//       .then((response) => response.json())
//       .then((data) => setStats(data));
//   }, []);

//   return (
//     <div className="flex justify-between">
//       <Card
//         title="Total Earnings"
//         value={`$${stats.totalEarnings || 0}`}
//         pillText={
//           (stats.totalEarnings || 0) > 0 ? `${stats.totalEarnings}%` : "0%"
//         }
//         trend={(stats.totalEarnings || 0) > 0 ? "up" : "down"}
//         period="From Jan 1st - Jul 31st"
//       />
//       <Card
//         title="Opportunities Posted"
//         value={stats.opportunitiesPosted || 0}
//         pillText={
//           (stats.opportunitiesPosted || 0) > 0
//             ? `${stats.opportunitiesPosted}%`
//             : "0%"
//         }
//         trend={(stats.opportunitiesPosted || 0) > 0 ? "up" : "down"}
//         period="From Jan 1st - Jul 31st"
//       />
//       <Card
//         title="Active Contracts"
//         value={stats.activeContracts || 0}
//         pillText={
//           (stats.activeContracts || 0) > 0 ? `${stats.activeContracts}%` : "0%"
//         }
//         trend={(stats.activeContracts || 0) > 0 ? "up" : "down"}
//         period="From Jan 1st - Jul 31st"
//       />
//     </div>
//   );
// }

// const Card = (props) => {
//   const { title, value, pillText, trend, period } = props;

//   return (
//     <div className="border col-span-4 p-4 rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7] w-1/3">
//       <div className="flex mb-8 items-start justify-between">
//         <div>
//           <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
//           <p className="text-3xl font-semibold">{value}</p>
//         </div>

//         <span
//           className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
//             trend === "up"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
//         </span>
//       </div>

//       <p className="text-xs text-stone-500">{period}</p>
//     </div>
//   );
// };

// export default Statcards;
// import React, { useState, useEffect } from "react";
// import { FiFile, FiTrendingDown, FiTrendingUp } from "react-icons/fi";

// function Statcards() {
//   const [stats, setStats] = useState({});
//   const [totalOpportunities, setTotalOpportunities] = useState(0);

//   useEffect(() => {
//     fetch("/athletes/stats")
//       .then((response) => response.json())
//       .then((data) => setStats(data));

//     fetch("/api/opportunities/getopportunities", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ athleteId: "your-athlete-id" }), // Replace with actual athleteId
//     })
//       .then((response) => response.json())
//       .then((data) => setTotalOpportunities(data.length));
//   }, []);

//   return (
//     <div className="flex justify-between">
//       <Card
//         title="Total Earnings"
//         value={`$${stats.totalEarnings || 0}`}
//         pillText={
//           (stats.totalEarnings || 0) > 0 ? `${stats.totalEarnings}%` : "0%"
//         }
//         trend={(stats.totalEarnings || 0) > 0 ? "up" : "down"}
//         period="From Jan 1st - Jul 31st"
//       />
//       <Card
//         title="Opportunities Posted"
//         value={totalOpportunities}
//         pillText={totalOpportunities > 0 ? `${totalOpportunities}%` : "0%"}
//         trend={totalOpportunities > 0 ? "up" : "down"}
//         period="From Jan 1st - Jul 31st"
//       />
//       <Card
//         title="Active Contracts"
//         value={stats.activeContracts || 0}
//         pillText={
//           (stats.activeContracts || 0) > 0 ? `${stats.activeContracts}%` : "0%"
//         }
//         trend={(stats.activeContracts || 0) > 0 ? "up" : "down"}
//         period="From Jan 1st - Jul 31st"
//       />
//     </div>
//   );
// }

// const Card = (props) => {
//   const { title, value, pillText, trend, period } = props;

//   return (
//     <div className="border col-span-4 p-4 rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7] w-1/3">
//       <div className="flex mb-8 items-start justify-between">
//         <div>
//           <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
//           <p className="text-3xl font-semibold">{value}</p>
//         </div>

//         <span
//           className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
//             trend === "up"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
//         </span>
//       </div>

//       <p className="text-xs text-stone-500">{period}</p>
//     </div>
//   );
// };

// export default Statcards;

import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { supabase } from "../../lib/supabaseClient";
import axios from "axios";
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
