import { useApiQuery } from "@/hooks/useApiQuery";

export interface DashboardData {
  locations: {
    value: number;
    oldValue: number;
    percentageIncrease: string;
  };
  requests: {
    value: number;
    oldValue: number;
    percentageIncrease: string;
  };
  orders: {
    value: number;
    oldValue: number;
    percentageIncrease: string;
  };
  pointsEarned: number;
  subscriptionStatus: {
    status: string;
    expirationDate: string; // ISO date string
    title: string;
  };
  wasteCollectionTrends: {
    timeGranularity: "Minute" | "Hour" | "Day" | "Month" | "Year";
    month: string;
    year: string;
    day: string;
    hour: string;
    value: number;
    oldValue: number;
    percentageIncrease: number;
  }[];
}

export const useDashboard = () =>
  useApiQuery<DashboardData>("dashboard", "/user/dashboard");
