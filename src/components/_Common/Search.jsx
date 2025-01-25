"use client";

import React, { useState } from "react";
import { FiCommand, FiSearch } from "react-icons/fi";
import { CommandMenu } from "../Sidebar/CommandMenu";

function Search() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-100 mb-4 relative rounded-md flex items-center px-4 py-2 text-sm">
        <FiSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />
        <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
          <FiCommand />K
        </span>
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
}

export default Search;
