import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Statcards from './StatscardSponsor';
import { ProfileViews } from './ProfileViews';
import MessagesContainer from './MessagesContainer';
import OpportunitiesTable from './OpportunitiesTable';
import ContractsTable from './ContractsTable';
import { supabase } from '../../lib/supabaseClient';
import { PROSPONSER } from '../../https/config';
import bell from '../../assets/icons/bell-alert.svg';
import msg from '../../assets/icons/chat-bubble-left-ellipsis.svg';

function GridSponsor() {
  const [profileData, setProfileData] = useState(null); // Rename to match Grid.jsx

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) return;

        const response = await PROSPONSER.get(
          `/sponsors/profile/${sessionData.session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
          }
        );

        console.log('Profile data:', response.data); // Debug log
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const getAvatarSrc = (base64String) => {
    if (!base64String) return null;
    if (base64String.startsWith('data:image')) {
      return base64String;
    }
    return `data:image/png;base64,${base64String}`;
  };
  console.log(profileData, 'sdsdfdsf');

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
        {profileData ? (
          <>
            <div>
              <p className="text-[12px] font-[500] text-[#9CA3AF] capitalize">
                {profileData?.data?.companyName}
              </p>
            </div>
            <div>
              <Link to="/settings">
                <img
                  src={profileData?.data?.avatar}
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover cursor-pointer"
                />
              </Link>
            </div>
          </>
        ) : (
          <Link to="/settings">
            <div className="w-11 h-11 rounded-full bg-gray-200" />
          </Link>
        )}
      </div>
      {/* ////////////////////////////// */}

      <div className="px-4 flex flex-col gap-3 mt-4 pb-6 w-full">
        <div>
          {' '}
          <h1 className="text-[30px] font-[600]">Hey, welcome back!</h1>
        </div>
        <div className="flex flex-row gap-3 w-full">
          <Statcards />
          {/* profile views graph */}
          {/* <ProfileViews /> */}
          {/* Messages container */}
        </div>
        <div className="flex flex-row gap-3  ">
          <ProfileViews />
          <MessagesContainer />
          {/* Opportunities/contracts table */}

          {/* <OpportunitiesTable /> */}
        </div>
        <ContractsTable />
      </div>
    </>
  );
}

export default GridSponsor;
