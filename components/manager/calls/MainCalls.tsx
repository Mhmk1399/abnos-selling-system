import React from "react";
import DynamicTreeChart from "../calls/DynamicTreeChart";
import DynamicLineChart from "../totalreports/DynamicLineChart";
import DynamicPieChart from "../totalreports/DynamicPieChart";
import SupportIssuesTable from "./SupportIssuesTable";
import StyledTable from "../costumers/conditionalDynamicTable";

const SalerActivityBox = () => {
    const failedCallsData = [
        {
          salesperson: "John Doe",
          date: "2025/02/20",
          reason: "Customer unavailable",
          followUps: 1,
        },
        {
          salesperson: "John Doe",
          date: "2025/02/21",
          reason: "Technical issue",
          followUps: 2,
        },
        {
          salesperson: "John Doe",
          date: "2025/02/22",
          reason: "Customer unavailable",
          followUps: 0,
        },
        {
          salesperson: "Jane Smith",
          date: "2025/02/20",
          reason: "Payment declined",
          followUps: 3,
        },
        {
          salesperson: "Jane Smith",
          date: "2025/02/21",
          reason: "Customer unavailable",
          followUps: 2,
        },
        {
          salesperson: "Jane Smith",
          date: "2025/02/22",
          reason: "Technical issue",
          followUps: 4,
        },
        {
          salesperson: "John Doe",
          date: "2025/02/23",
          reason: "No response",
          followUps: 1,
        },
        {
          salesperson: "Jane Smith",
          date: "2025/02/23",
          reason: "Customer unavailable",
          followUps: 3,
        },
      ];
    const columns = [
        {
          key: "salesperson",
          header: "نام فروشنده",
          sortable: true,
        },
        {
          key: "date",
          header: "تاریخ",
          sortable: true,
        },
        {
          key: "reason",
          header: "دلیل شکست",
          sortable: true,
        },
        {
          key: "followUps",
          header: "تعداد پیگیری‌ها",
          sortable: true,
        },
       
      ];
  // Sample data for tree chart
  const treeChartData = {
    totalCalls: 150,
    salesData: [
      {
        name: "John Doe",
        calls: 50,
        statuses: [
          { status: "Successful", count: 20 },
          { status: "Pending", count: 15 },
          { status: "Failed", count: 15 },
        ],
      },
      {
        name: "Jane Smith",
        calls: 100,
        statuses: [
          { status: "Successful", count: 45 },
          { status: "Pending", count: 30 },
          { status: "Failed", count: 25 },
        ],
      },
    ],
  };
  const supportIssuesData = [
    { id: 1, salesperson: "John Doe", issue: "Customer couldn’t log in" },
    { id: 2, salesperson: "Jane Smith", issue: "Payment processing error" },
    { id: 3, salesperson: "John Doe", issue: "Customer couldn’t log in" },
    { id: 4, salesperson: "Jane Smith", issue: "Customer couldn’t log in" },
    { id: 5, salesperson: "John Doe", issue: "Product not delivered" },
    { id: 6, salesperson: "Jane Smith", issue: "Payment processing error" },
    { id: 7, salesperson: "John Doe", issue: "Customer couldn’t log in" },
    { id: 8, salesperson: "Jane Smith", issue: "App crashed during checkout" },
  ];

  // Sample data for original line chart
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

  // New sample data for calls per hour by salesperson
  const callsPerHourBySalespersonData = {
    title: "Calls per Hour by Salesperson",
    datasets: [
      {
        label: "John Doe",
        data: [2, 3, 5, 4, 6, 5, 4, 3, 2, 4, 3, 2, 1, 1],
        borderColor: "#3B82F6",
      },
      {
        label: "Jane Smith",
        data: [5, 7, 8, 9, 10, 8, 7, 6, 8, 9, 7, 6, 5, 5],
        borderColor: "#10B981",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div className="w-full  ">
        <DynamicTreeChart
          totalCalls={treeChartData.totalCalls}
          salesData={treeChartData.salesData}
          title="نمودار درختی براساس فروشندگان"
        />
      </div>
      <div className="w-full ">
        <DynamicPieChart
          title="نحوه تقسیم تماس  ها براساس تاریخ"
          data={pieChartConfig}
        />
      </div>
      {/* Add the new line chart */}
      <div className="w-full lg:col-span-2">
        <DynamicLineChart
          title={callsPerHourBySalespersonData.title}
          datasets={callsPerHourBySalespersonData.datasets}
        />
      </div>
      <div className="w-full lg:col-span-2">
        <StyledTable data={failedCallsData} columns={columns} />
      </div>
      <div className="w-full lg:col-span-2">
        <SupportIssuesTable issues={supportIssuesData} />
      </div>
    </div>
  );
};

export default SalerActivityBox;
