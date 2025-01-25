import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ isAuthenticated, children, loading }) => {
  const navigate = useNavigate()
  const [checkedAuth, setCheckedAuth] = useState(false) // Track if authentication has been checked

  useEffect(() => {
    // if (isAuthenticated) {
    //   console.log("setting checked auth to true")
    //   setCheckedAuth(true) // Mark authentication as checked if true
    // } else {
    //   // navigate("/login")
    // }
    console.log(isAuthenticated, loading)
    if (!isAuthenticated) {
      if (!loading) {
        navigate("/login")
      }
    } else {
      console.log("setting checked auth to true")
      setCheckedAuth(true) // Mark authentication as checked if true
    }
  }, [isAuthenticated, loading])

  // Only render children if authentication is confirmed
  if (!checkedAuth) {
    return null // Optionally, show a loader or placeholder
  }

  return children
}

export default ProtectedRoute
