import React, { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient" // Adjust the path to your Supabase client file

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState(null) // Store user profile data

  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("uid", userId)
          .single() // Fetch the profile for the current user

        if (error) {
          console.error("Error fetching profile:", error.message)
          return
        }

        setRole(data.role) // Set profile data
      } catch (err) {
        console.error("Unexpected error fetching profile:", err)
      }
    }

    const checkSession = async () => {
      setLoading(true)
      const { data, error } = await supabase.auth.getSession()
      console.log(data)
      if (data.session) {
        setIsAuthenticated(true)
        await fetchUserProfile(data.session.user.id) // Fetch user profile
      } else {
        setIsAuthenticated(false)
      }
      setLoading(false)
    }

    checkSession()

    // Listen for authentication changes
    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  console.log("profile", role)

  return { isAuthenticated, loading, role }
}

export default useAuth
