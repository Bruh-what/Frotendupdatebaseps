import React, { useEffect, useState } from "react";
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
// import Search from "../../components/_Common/Search";
import { useNavigate } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../feature/auth/auth.action";
import toast from "react-hot-toast";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex flex-col p-6 w-[300px] gap-6 border-r-[1px] border-gray-100 items-center">
      {/* <img src={logo} alt="Prosponsor Logo" className="w-24 h-auto " /> */}
      <img
        src={logo}
        alt="Prosponsor Logo"
        className="w-24 h-auto cursor-pointer mb-4"
        onClick={() => (window.location.href = "https://prosponsor.co.uk")}
      />
      {/* <h3 className="text-xl font-bold text-[#151515] p-2">Prosponsor</h3> */}
      {/* <Search /> */}
      <ul className="flex flex-col gap-3 text-gray-900 w-full mb-[200px]">
        <NavItem to="/" label="Dashboard" Icon={LayoutDashboard} />
        <NavItem to="/messages" label="Messages" Icon={Mail} />
        <NavItem
          to="/opportunities"
          label="Opportunities"
          Icon={BriefcaseBusiness}
        />
        <NavItem to="/contracts" label="Contracts" Icon={File} />
        <NavItem
          to="/settings"
          label={<span className="whitespace-nowrap">Account Settings</span>}
          Icon={Settings2}
        />
        <NavItem to="/billing" label="Billing" Icon={CreditCard} />
        <li
          onClick={handleLogout}
          className="flex flex-row gap-1 items-center p-2 pr-4 rounded-md cursor-pointer hover:bg-gray-100 text-gray-900"
        >
          <FaSignOutAlt className="w-5 h-4" />
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
// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   Briefcase,
//   FileText,
//   Mail,
//   Settings2,
//   Menu,
//   X,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import logo from "../../assets/logofinalised.svg";
// import Search from "../../components/_Common/Search";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient";
// import { FaSignOutAlt } from "react-icons/fa";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       console.error("Error signing out:", error.message);
//       return;
//     }
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
//       >
//         <Menu className="h-6 w-6" />
//       </button>

//       {/* Main Sidebar */}
//       <div
//         className={`
//         fixed inset-y-0 left-0 z-10 transform
//         lg:relative lg:translate-x-0 transition duration-200 ease-in-out
//         ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//         flex flex-col p-6 w-[300px] gap-6 border-r-[1px] border-gray-100 items-center
//         bg-white
//       `}
//       >
//         {/* Mobile Close Button */}
//         <button
//           onClick={() => setIsMobileMenuOpen(false)}
//           className="lg:hidden absolute top-4 right-4"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <img
//           src={logo}
//           alt="Prosponsor Logo"
//           className="w-24 h-auto cursor-pointer"
//           onClick={() => (window.location.href = "https://prosponsor.co.uk")}
//         />

//         <Search />

//         <ul className="flex flex-col gap-3 text-gray-900 w-full">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg ${
//                   isActive ? "bg-[#4F46E5] text-white" : ""
//                 }`
//               }
//             >
//               <LayoutDashboard size={20} />
//               <span>Dashboard</span>
//             </NavLink>

//             <NavLink
//               to="/opportunities"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg ${
//                   isActive ? "bg-[#4F46E5] text-white" : ""
//                 }`
//               }
//             >
//               <Briefcase size={20} />
//               <span>Opportunities</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/contracts"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg ${
//                   isActive ? "bg-[#4F46E5] text-white" : ""
//                 }`
//               }
//             >
//               <FileText size={20} />
//               <span>Contracts</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/messages"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg ${
//                   isActive ? "bg-[#4F46E5] text-white" : ""
//                 }`
//               }
//             >
//               <Mail size={20} />
//               <span>Messages</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/settings"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg ${
//                   isActive ? "bg-[#4F46E5] text-white" : ""
//                 }`
//               }
//             >
//               <Settings2 size={20} />
//               <span>Settings</span>
//             </NavLink>
//           </li>
//         </ul>

//         <button
//           onClick={handleLogout}
//           className="mt-auto flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
//         >
//           <FaSignOutAlt size={20} />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;
