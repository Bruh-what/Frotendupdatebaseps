import React from "react";

function TopBar() {
  return (
    <div className="bg-gray-200 w-full h-16 px-4 flex items-center justify-between">
      <h1 className="text-lg font-bold">My App</h1>
      <div className="flex space-x-4">
        <button className="text-sm font-medium text-black-600">Profile</button>
        <button className="text-sm font-medium text-gray-600">Logout</button>
      </div>
    </div>
  );
}

export default TopBar;
