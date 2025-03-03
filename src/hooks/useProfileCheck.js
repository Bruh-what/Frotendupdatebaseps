import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useAuth from './useAuth';
import { PROSPONSER } from '../https/config';
import { supabase } from '../lib/supabaseClient';
import { setProfileIncomplete } from '../feature/auth/auth.slicer';

const useProfileCheck = () => {
  const dispatch = useDispatch();
  const { role } = useAuth();

  useEffect(() => {
    const checkProfile = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) return;

      const userId = sessionData.session.user.id;
      const endpoint =
        role === 'athlete'
          ? `/athletes/profile/${userId}`
          : `/sponsors/profile/${userId}`;

      try {
        const response = await PROSPONSER.get(endpoint, {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        });

        dispatch(setProfileIncomplete(!response.data)); // If no data, mark profile as incomplete
      } catch (err) {
        dispatch(setProfileIncomplete(true));
      }
    };

    checkProfile();
  }, [role, dispatch]);
};

export default useProfileCheck;
