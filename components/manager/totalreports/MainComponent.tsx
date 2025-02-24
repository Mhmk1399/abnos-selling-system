"use client";
import DynamicLineChart from "./DynamicLineChart";
import DynamicPieChart from "./DynamicPieChart";
import MetricsTable from "./MetricsTable";
import DynamicBarChart from "./DynamicBarChart";
import { useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const productSalesData = [
  { label: "محصول A", value: 12500000, color: "rgba(59, 130, 246, 0.8)" },
  { label: "محصول B", value: 9800000, color: "rgba(16, 185, 129, 0.8)" },
  { label: "محصول C", value: 15200000, color: "rgba(245, 158, 11, 0.8)" },
  { label: "محصول D", value: 7600000, color: "rgba(239, 68, 68, 0.8)" },
];

// Example seller performance data
const sellerSalesData = [
  { label: "علی محمدی", value: 18500000, color: "rgba(147, 51, 234, 0.8)" },
  { label: "سارا احمدی", value: 16200000, color: "rgba(236, 72, 153, 0.8)" },
  { label: "رضا کریمی", value: 14800000, color: "rgba(14, 165, 233, 0.8)" },
  { label: "مریم حسینی", value: 12900000, color: "rgba(34, 197, 94, 0.8)" },
];


const CallDistributionDashboard = () => {

  const pieChartConfig = {
    labels: ["استعلام قیمت", "خرید", "پشتیبانی", "پیگیری سفارش"],
    values: [40, 30, 20, 10],
    colors: [
      "rgba(59, 130, 246, 0.8)",
      "rgba(16, 185, 129, 0.8)",
      "rgba(245, 158, 11, 0.8)",
      "rgba(239, 68, 68, 0.8)",
    ],
  };
  const callDatasets = [
    {
      label: "استعلام قیمت",
      data: [30, 35, 40, 45, 40, 60],
      borderColor: "rgba(59, 130, 246, 0.8)",
    },
    {
      label: "خرید",
      data: [25, 30, 35, 40, 45, 45],
      borderColor: "rgba(16, 185, 129, 0.8)",
    },
    {
      label: "پشتیبانی",
      data: [20, 25, 28, 30, 32, 30],
      borderColor: "rgba(245, 158, 11, 0.8)",
    },
    {
      label: "پیگیری سفارش",
      data: [10, 12, 15, 14, 13, 15],
      borderColor: "rgba(239, 68, 68, 0.8)",
    },
  ];
  const productDatasets = [
    {
      label: "محصول A",
      data: [40, 45, 50, 55, 50, 70],
      borderColor: "rgba(147, 51, 234, 0.8)",
    },
    {
      label: "محصول B",
      data: [35, 40, 45, 50, 55, 55],
      borderColor: "rgba(236, 72, 153, 0.8)",
    },
  ];

  const metrics = [
    { label: "تعداد کل تماس‌ها", value: "۱۵۰", trend: 12 },
    { label: "درآمد", value: "۱۰,۰۰۰,۰۰۰ تومان", trend: 8 },
    { label: "سفارشات باز", value: "۲۵", trend: -5 },
    { label: "نرخ تبدیل", value: "۳۵٪", trend: 15 },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DynamicPieChart
            title="نحوه تقسیم تماس  ها براساس تاریخ"
            data={pieChartConfig}
          />
          <DynamicBarChart
            title="آمار فروش محصولات"
            data={productSalesData}
            target={13000000}
            type="products"
          />
          <div className="col-span-1 lg:col-span-2">
            <MetricsTable metrics={metrics} />
          </div>

          <DynamicBarChart
            title="عملکرد فروشندگان"
            data={sellerSalesData}
            target={15000000}
            type="sellers"
          />

          {/* Rest of your dashboard components */}

         
          <DynamicLineChart
            title="تحلیل روند تماس‌ها"
            datasets={callDatasets}
          />

          
        </div>
      </div>
    </div>
  );
};

export default CallDistributionDashboard;
