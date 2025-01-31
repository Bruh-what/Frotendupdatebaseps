import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../pages/Dashboard/Dashboard";
import Messages from "../pages/Messages/Messages";
import Opportunities from "../pages/Opportunities/Opportunities";
import Contracts from "../pages/Contracts/Contracts";
import Settings from "../pages/Settings/Settings";
import SignUp from "../pages/Signup/SignUp.jsx";
import Billing from "../pages/Billing/Billing";
import TopBar from "../components/Topbar/Topbar";
import CreateOpportunity from "../pages/Opportunities/CreateOpportunity";
import SponsorOpportunities from "../pages/Opportunities/SponsorOpportunities";

import CreateContractPage from "../pages/Contracts/CreateContractPage";
import SponsorSettings from "../pages/Settings/SponsorSettings";
import AnalyticsPage from "../pages/Analytics/Analytics";
import AthletePage from "../pages/Athlete/AthletePage";
import SignIn from "../pages/SignIn/SignIn";
import useAuth from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import ContractDetails from "../pages/Contracts/ContractDetails";
import UserProfile from "../components/_Common/UserProfile.jsx";
import OpportunityDetails from "../pages/Opportunities/OpportunityDetails.jsx";

const AppRoutes = () => {
  const { isAuthenticated, loading, role } = useAuth();

  const location = useLocation();

  // Define routes where the Sidebar should be hidden
  const hideSidebarRoutes = ["/login", "/signup"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <div className="bg-[#FEFEFE] flex h-screen">
      {!shouldHideSidebar && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/Messages" element={<Messages />} />
        <Route
          path="/Opportunities"
          element={
            role === "athlete" ? <Opportunities /> : <SponsorOpportunities />
          }
        />

        <Route path="/Contracts" element={<Contracts />} />
        <Route
          path="/Settings"
          element={role === "athlete" ? <Settings /> : <SponsorSettings />}
        />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/CreateOpportunity" element={<CreateOpportunity />} />
        <Route path="/opportunities/:id" element={<OpportunityDetails />} />
        <Route
          path="/SponsorOpportunities"
          element={<SponsorOpportunities />}
        />
        <Route path="/contracts/:id" element={<ContractDetails />} />
        <Route path="/CreateContractPage" element={<CreateContractPage />} />
        {/* <Route path="/SponsorSettings" element={<SponsorSettings />} /> */}
        <Route path="/AnalyticsPage" element={<AnalyticsPage />} />
        <Route path="/AthletePage" element={<AthletePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        {/* <Route path="/profile/:userId" element={<UserProfile />} /> */}
      </Routes>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
