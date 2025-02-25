import React from "react";
import { FiUser } from "react-icons/fi";
import { XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const data = [
  { name: "Mon", Views: 275, New: 41, Returning: 60 },
  { name: "Tue", Views: 620, New: 96, Returning: 150 },
  { name: "Wed", Views: 202, New: 192, Returning: 80 },
  { name: "Thu", Views: 500, New: 50, Returning: 130 },
  { name: "Fri", Views: 355, New: 400, Returning: 200 },
  { name: "Sat", Views: 875, New: 200, Returning: 300 },
  { name: "Sun", Views: 700, New: 205, Returning: 250 },
];

export const ProfileViews = () => {
  return (
    <div className="border w-[55%] overflow-hidden rounded-2xl ">
      <div className="p-4">
        <div>
          <h3 className="text-[#111827] text-[20px] font-[600]">
            Total profile views
          </h3>
          <p className="text-[14px] text-[#9CA3AF] font-[500]">
            +1000 over last week
          </p>
        </div>
      </div>

      <div className="h-60 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Bar dataKey="Views" fill="#c7d2fe" radius={[0, 0, 0, 0]} />
            <Bar dataKey="New" fill="#818cf8" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Returning" fill="#4f46e5" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
