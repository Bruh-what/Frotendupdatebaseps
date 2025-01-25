import React from "react";
import {
  BriefcaseBusiness,
  CreditCard,
  File,
  LayoutDashboard,
  Mail,
  Settings2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logofinalised.svg";
import Search from "../../components/_Common/Search";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }
    navigate("/login"); // Redirect to login page after logout
  };
  return (
    <div className="flex flex-col p-6 w-[200px] gap-6 border-r-[1px] border-gray-100 items-center">
      <img src={logo} alt="Prosponsor Logo" className="w-24 h-auto" />
      {/* <h3 className="text-xl font-bold text-[#151515] p-2">Prosponsor</h3> */}
      <Search />
      <ul className="flex flex-col gap-3 text-gray-900 w-full mb-[200px]">
        <NavItem to="/" label="Dashboard" Icon={LayoutDashboard} />
        <NavItem to="/messages" label="Messages" Icon={Mail} />
        <NavItem
          to="/opportunities"
          label="Opportunities"
          Icon={BriefcaseBusiness}
        />
        <NavItem to="/contracts" label="Contracts" Icon={File} />
        <NavItem to="/settings" label="Settings" Icon={Settings2} />
        <NavItem to="/billing" label="Billing" Icon={CreditCard} />
        <li
          onClick={handleLogout}
          className="flex flex-row gap-1 items-center p-2 pr-4 rounded-md cursor-pointer hover:bg-gray-100 text-gray-900"
        >
          <CreditCard className="w-5 h-4" />
          Log Out
        </li>
      </ul>
    </div>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, label, Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-row gap-1 items-center p-2 pr-4 rounded-md ${
        isActive ? "bg-gray-100  text-gray-900" : "hover:bg-gray-100"
      }`
    }
  >
    <Icon className="w-5 h-4" />
    <li>{label}</li>
  </NavLink>
);

export default Sidebar;
