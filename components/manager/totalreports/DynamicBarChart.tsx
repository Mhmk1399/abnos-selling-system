import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface DynamicBarChartProps {
  title: string;
  data: BarChartData[];
  target: number;
  type: "products" | "sellers";
}

const dateFilters = [
  { value: "daily", label: "روزانه" },
  { value: "weekly", label: "هفتگی" },
  { value: "monthly", label: "ماهانه" },
  { value: "quarterly", label: "سه ماهه" },
  { value: "biannual", label: "شش ماهه" },
  { value: "yearly", label: "سالانه" },
];

const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
  title,
  data,
  target,
  type,
}) => {
  const [dateFilter, setDateFilter] = useState("daily");

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: type === "products" ? "فروش محصولات" : "فروش فروشندگان",
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "هدف",
        data: Array(data.length).fill(target),
        type: "line",
        borderColor: "#ef4444",
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "IRANSans",
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        padding: 12,
        titleFont: { size: 14, family: "IRANSans" },
        bodyFont: { size: 13, family: "IRANSans" },
        borderColor: "#e2e8f0",
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context: TooltipItem<"bar" | "line">) => {
            const value = context.raw as number;
            return ` ${value.toLocaleString()} تومان`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "#e2e8f0",
        },
        ticks: {
          font: {
            family: "IRANSans",
          },
          callback: (value: number | string) => {
            if (typeof value === "number") {
              return value.toLocaleString() + " تومان";
            }
            return value;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "IRANSans",
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" p-6 rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {dateFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
    </motion.div>
  );
};
export default DynamicBarChart;
