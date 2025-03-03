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
import image from '../../assets/images/Rectangle 34624146.png';

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
    <div>
      <div className=" flex justify-end gap-4 items-center">
        <div className="flex gap-4 pr-2">
          <div className="min-w-[23px] hover:cursor-pointer">
            {' '}
            <img src={msg} alt="msg" width="100%" />
          </div>
          <div className="min-w-[23px] hover:cursor-pointer">
            <img src={bell} alt="bell" width="100%" />
          </div>
        </div>
        {profileData ? (
          <>
            <div>
              <p className="text-[12px] font-[500] text-[#9CA3AF] capitalize">
                {profileData?.firstName}
              </p>
              <p className="text-[12px] font-[500] text-[#111827] capitalize">
                {profileData?.lastName}
              </p>
            </div>
            <div>
              <Link to="/settings">
                <img
                  src={profileData?.avatar || image}
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

      <div className="px-4 flex items-center gap-4 mb-6 justify-between">
        <h1 className="text-[28px] font-[600]">
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
    </div>
  );
}

export default Grid;
