import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";

export default function DashboardPage() {
  const dashboardStats = {
    bookings: 38,
    quotes: 85,
    blogs: 10,
    staffs: 12,
    client: 165,
    gallery: 20,
    events: 45,
  };

  return (
    <>
      <DashboardStats stats={dashboardStats} />

      <DashboardCharts stats={dashboardStats} />
    </>
  );
}