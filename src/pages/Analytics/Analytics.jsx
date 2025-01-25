"use client";

import { Trophy, Users, PlayCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { Card } from "../../components/_Common/Card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/_Common/Table";

const monthlyViews = [
  { name: "Jan", views: 400, activeViews: 240 },
  { name: "Feb", views: 300, activeViews: 139 },
  { name: "Mar", views: 200, activeViews: 980 },
  { name: "Apr", views: 278, activeViews: 390 },
  { name: "May", views: 189, activeViews: 480 },
  { name: "Jun", views: 239, activeViews: 380 },
  { name: "Jul", views: 349, activeViews: 430 },
];

const dailyViews = [
  { name: "Mon", views: 24 },
  { name: "Tue", views: 13 },
  { name: "Wed", views: 98 },
  { name: "Thu", views: 39 },
  { name: "Fri", views: 48 },
  { name: "Sat", views: 38 },
  { name: "Sun", views: 43 },
];

const demographicData = [
  { age: "18-25", male: 65, female: 35 },
  { age: "25-35", male: 75, female: 25 },
  { age: "35-45", male: 55, female: 45 },
  { age: "45+", male: 45, female: 55 },
];

const visitors = [
  {
    visitor: "John Smith",
    company: "Nike",
    time: "2 hours ago",
    timeOnProfile: "20 minutes",
  },
  {
    visitor: "John Smith",
    company: "Nike",
    time: "2 hours ago",
    timeOnProfile: "20 minutes",
  },
  {
    visitor: "John Smith",
    company: "Nike",
    time: "2 hours ago",
    timeOnProfile: "20 minutes",
  },
  {
    visitor: "John Smith",
    company: "Nike",
    time: "2 hours ago",
    timeOnProfile: "20 minutes",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto ">
      <h1 className="text-3xl font-semibold">Your Analytics</h1>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-black rounded-full p-3">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">+1000</p>
              <p className="text-sm text-gray-500">Total views</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-black rounded-full p-3">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">150</p>
              <p className="text-sm text-gray-500">Views last day</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-black rounded-full p-3">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">03</p>
              <p className="text-sm text-gray-500">View matched sponsors</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Total profile views</h2>
            <p className="text-sm text-gray-500">+1000 over two months</p>
          </div>
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyViews}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar
                  dataKey="views"
                  fill="hsl(var(--primary))"
                  opacity={0.2}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="activeViews"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Daily profile views</h2>
            <p className="text-sm text-gray-500">+10 since yesterday</p>
          </div>
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyViews}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="views" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Profile Visitors */}
      <Card className="p-6">
        <div className="space-y-2 mb-4">
          <h2 className="text-xl font-semibold">See who viewed your profile</h2>
          <p className="text-sm text-gray-500">
            Recent visitors on your profile. See who viewed your profile and
            connect with them
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Time on profile</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitors.map((visitor, index) => (
              <TableRow key={index}>
                <TableCell>{visitor.visitor}</TableCell>
                <TableCell>{visitor.company}</TableCell>
                <TableCell>{visitor.time}</TableCell>
                <TableCell>{visitor.timeOnProfile}</TableCell>
                <TableCell>
                  <button variant="link" className="text-[#4F46E5]">
                    Start conversation
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Achievements and Demographics */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="p-6 mb-6">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold">Achievements & badges</h2>
            <p className="text-sm text-gray-500">
              Awarded by ProSponsor. Automatically displays on your profile.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#4F46E5] rounded-full p-3">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Athlete of the year</p>
                <p className="text-sm text-gray-500">30-02-2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500 rounded-full p-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Networking star</p>
                <p className="text-sm text-gray-500">
                  Connected with 20+ sponsors
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-500 rounded-full p-3">
                <PlayCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Most viewed highlight video</p>
                <p className="text-sm text-gray-500">
                  Highlight reel viewed more than 1million times
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold">Audience demographics</h2>
            <p className="text-sm text-gray-500">
              Fine tune content based on demographics
            </p>
          </div>
          <div className="h-[200px] ">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demographicData}>
                <XAxis dataKey="age" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="male"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  opacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="female"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  opacity={0.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2 ">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary opacity-20" />
              <span className="text-sm">Male</span>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="h-3 w-3 rounded-full bg-primary opacity-50" />
              <span className="text-sm">Female</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
