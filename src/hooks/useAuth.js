import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient"; // Adjust the path to your Supabase client file

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // Store user role

  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role") // Fetch only role instead of "*"
          .eq("uid", userId)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
          return;
        }

        if (data) {
          setRole(data.role); // Set user role
        } else {
          console.warn("No profile found for user:", userId);
          setRole(null); // Clear role if no profile exists
        }
      } catch (err) {
        console.error("Unexpected error fetching profile:", err);
      }
    };

    const checkSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
      }

      if (data.session) {
        setIsAuthenticated(true);
        await fetchUserProfile(data.session.user.id); // Fetch user profile
      } else {
        setIsAuthenticated(false);
        setRole(null); // Clear role on logout
      }
      setLoading(false);
    };

    checkSession();

    // Properly handle auth state change
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          fetchUserProfile(session.user.id);
        } else {
          setIsAuthenticated(false);
          setRole(null); // Clear role when logged out
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe(); // Proper cleanup
    };
  }, []);

  return { isAuthenticated, loading, role };
};

export default useAuth;
