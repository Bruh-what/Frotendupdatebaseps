"use client";

import React from "react";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

const data = [
  {
    name: "Mon",
    Views: 275,
    New: 41,
  },
  {
    name: "Tue",
    Views: 620,
    New: 96,
  },
  {
    name: "Wed",
    Views: 202,
    New: 192,
  },
  {
    name: "Thu",
    Views: 500,
    New: 50,
  },
  {
    name: "Fri",
    Views: 355,
    New: 400,
  },
  {
    name: "Sat",
    Views: 875,
    New: 200,
  },
  {
    name: "Sun",
    Views: 700,
    New: 205,
  },
];

export const ProfileViews = () => {
  return (
    <div className="border w-[40%] overflow-hidden rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7]">
      <div className="p-4">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">Profle views</h3>
          <p className="text-3xl font-semibold">+100</p>
        </div>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid stroke="#e4e4e7" /> */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            {/* <Line
              type="monotone"
              dataKey="New"
              stroke="#18181b"
              fill="#18181b"
            /> */}
            <Line
              type="monotone"
              dataKey="Views"
              stroke="#5b21b6"
              fill="#5b21b6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
