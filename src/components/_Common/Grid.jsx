// import React from "react";

// import Statcards from "./Statcards";
// import { ProfileViews } from "./ProfileViews";
// import MessagesContainer from "./MessagesContainer";
// import OpportunitiesTable from "./OpportunitiesTable";

// function Grid() {
//   return (
//     <>
//       <div className="px-4 text-2xl font-bold mb-6">
//         {" "}
//         <h1>Hey, welcome back!</h1>
//       </div>
//       <div className="px-4 flex gap-6 mt-4 flex-col pb-6">
//         <Statcards />
//         {/* profile views graph */}
//         <div className="flex w-full gap-3">
//           <ProfileViews />
//           {/* Messages container */}
//           <MessagesContainer />
//           {/* Opportunities/contracts table */}
//         </div>

//         <OpportunitiesTable />
//       </div>
//     </>
//   );
// }

// export default Grid;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import Statcards from "./Statcards";
import { ProfileViews } from "./ProfileViews";
import MessagesContainer from "./MessagesContainer";
import OpportunitiesTable from "./OpportunitiesTable";

function Grid() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) return;

        const response = await PROSPONSER.get(
          `/athletes/profile/${sessionData.session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
          }
        );

        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className="px-4 flex items-center gap-4 mb-6 justify-between">
        <h1 className="text-2xl font-bold">Hey, welcome back!</h1>
        <Link to="/settings">
          {profileData?.avatar ? (
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          )}
        </Link>
      </div>
      <div className="px-4 flex gap-6 mt-4 flex-col pb-6">
        <Statcards />
        <div className="flex w-full gap-3">
          <ProfileViews />
          <MessagesContainer />
        </div>
        <OpportunitiesTable />
      </div>
    </>
  );
}

export default Grid;
