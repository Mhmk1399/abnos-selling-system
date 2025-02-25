import React from "react";
import DynamicPieChart from "../totalreports/DynamicPieChart";
import DynamicLineChart from "../totalreports/DynamicLineChart";

const pieChartConfig = {
  labels: [" محصول چهارم", "محصول اول", "محصول دوم", "محصول سوم"],
  values: [40, 30, 20, 10],
  colors: [
    "rgba(59, 130, 246, 0.8)",
    "rgba(16, 185, 129, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(239, 68, 68, 0.8)",
  ],
};

const callsPerHourBySalespersonData = {
  title: "نمودار فروش براساس فروشنده",
  datasets: [
    {
      label: " شیشه چاپی",
      data: [2, 3, 5, 4, 6, 5, 4, 3, 2, 4, 3, 2, 1, 1],
      borderColor: "#3B82F6",
    },
    {
      label: " شیشه لمینیت",
      data: [5, 7, 8, 9, 10, 8, 7, 6, 8, 9, 7, 6, 5, 5],
      borderColor: "#10B981",
    },
  ],
};
const MainSales = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 justify-center items-center gap-6 p-6">
      <div className="w-full ">
        <DynamicPieChart
          title="نحوه تقسیم تماس  ها براساس تاریخ"
          data={pieChartConfig}
        />
      </div>
      <div className="w-full lg:col-span-2">
        <DynamicLineChart
          title={callsPerHourBySalespersonData.title}
          datasets={callsPerHourBySalespersonData.datasets}
        />
      </div>
    </div>
  );
};

export default MainSales;
