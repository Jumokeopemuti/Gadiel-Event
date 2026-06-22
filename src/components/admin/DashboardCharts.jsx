"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DashboardCharts({
  stats = {
    bookings: 38,
    quotes: 85,
    blogs: 10,
    staffs: 12,
    client: 165,
    gallery: 20,
    events: 45,
  },
}) {


  const analyticsData = [
    {
      name: "Bookings",
      value: Number(stats.bookings || 0),
    },
    {
      name: "Quotes",
      value: Number(stats.quotes || 0),
    },
    {
      name: "Blogs",
      value: Number(stats.blogs || 0),
    },
    {
      name: "Staffs",
      value: Number(stats.staffs || 0),
    },
    {
      name: "Client",
      value: Number(stats.client || 0),
    },
    {
      name: "Gallery",
      value: Number(stats.gallery || 0),
    },
    {
      name: "Events",
      value: Number(stats.events || 0),
    },
  ];


  const monthlyActivityData = [
    { month: "Feb", bookings: 20, inquiries: 10 },
    { month: "Mar", bookings: 80, inquiries: 20 },
    { month: "Apr", bookings: 15, inquiries: 75 },
    { month: "May", bookings: 85, inquiries: 30 },
    { month: "Jun", bookings: 20, inquiries: 15 },
    { month: "Jul", bookings: 25, inquiries: 65 },
    { month: "Aug", bookings: 70, inquiries: 20 },
    { month: "Sep", bookings: 25, inquiries: 80 },
    { month: "Oct", bookings: 85, inquiries: 35 },
    { month: "Nov", bookings: 20, inquiries: 10 },
  ];

  const colors = [
    "#572649",
    "#ca5bab",
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  const hasData = analyticsData.some(
    (item) => item.value > 0
  );

  console.log("Analytics Data:", analyticsData);
  console.log("stats:", stats);
  console.log("analyticsData:", analyticsData);
  const router = useRouter();




  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">
          Dashboard Overview
        </h3>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
              >
                {analyticsData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales Statistics */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">
            Event Planning Performance
          </h3>

          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyActivityData}>
                <CartesianGrid
                  stroke="#E5E7EB"
                  strokeDasharray="5 5"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Legend />

                <defs>
                  <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B5FEF" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#CA5BAB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5B5FEF" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient id="inquiryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F87171" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F87171" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#5B5FEF"
                  fill="url(#bookingGradient)"
                  strokeWidth={3}
                  fillOpacity={1}
                  name="Bookings"
                />

                <Area
                  type="monotone"
                  dataKey="inquiries"
                  stroke="#F87171"
                  fill="url(#inquiryGradient)"
                  strokeWidth={3}
                  fillOpacity={1}
                  name="Inquiries"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">
          Content Distribution
        </h3>

        <div className="w-full h-[320px]">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analyticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}