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
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { PROSPONSER } from '../../https/config';
import Statcards from './Statcards';
import { ProfileViews } from './ProfileViews';
import MessagesContainer from './MessagesContainer';
import OpportunitiesTable from './OpportunitiesTable';
import bell from '../../assets/icons/bell-alert.svg';
import msg from '../../assets/icons/chat-bubble-left-ellipsis.svg';

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
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className="flex justify-end gap-2 items-center">
        <div className="flex gap-2 pr-2">
          <div>
            {' '}
            <img src={msg} alt="msg" width="100%" />
          </div>
          <div>
            <img src={bell} alt="bell" width="100%" />
          </div>
        </div>
        {profileData?.avatar ? (
          <>
            <div>
              <p className="text-[12px] font-[500] text-[#9CA3AF]">
                James Murray
              </p>
              <p className="text-[12px] font-[500] text-[#111827]">
                Motocross pro
              </p>
            </div>
            <div>
              <Link to="/settings">
                <img
                  src={profileData?.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
              </Link>
            </div>
          </>
        ) : (
          <Link to="/settings">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </Link>
        )}
      </div>

      <div className="px-4 flex items-center gap-4 mb-6 justify-between">
        <h1 className="text-[24px] font-[600]">
          Hello, {profileData?.firstName}
        </h1>
      </div>
      <div className="px-4 flex gap-6 mt-2 flex-col pb-6">
        <Statcards />
        <div className="flex w-full gap-3 justify-between">
          <ProfileViews />
          <MessagesContainer />
        </div>
        <OpportunitiesTable />
      </div>
    </>
  );
}

export default Grid;
