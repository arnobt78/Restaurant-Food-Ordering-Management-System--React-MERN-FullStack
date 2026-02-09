import { useQuery } from "react-query";
import { axiosInstance } from "@/lib/api-client";

export interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalCustomers: number;
  orderGrowth: number;
  revenueGrowth: number;
  topCities: { city: string; orders: number; revenue: number }[];
  topCuisines: { cuisine: string; orders: number; percentage: number }[];
  recentOrders: {
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
  }[];
  monthlyData: { month: string; orders: number; revenue: number }[];
}

export const useGetAnalytics = (timeRange: string = "30d") => {
  const isLoggedIn = !!localStorage.getItem("session_id");
  return useQuery(
    ["business-insights", timeRange],
    async (): Promise<AnalyticsData> => {
      const endpoint = isLoggedIn
        ? `/api/business-insights?timeRange=${timeRange}`
        : `/api/business-insights/public?timeRange=${timeRange}`;
      const res = await axiosInstance.get(endpoint);
      return res.data;
    },
    {
      enabled: true,
      staleTime: 5 * 60 * 1000,
      refetchInterval: 30 * 1000,
    },
  );
};
