import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface TimeRange {
  label: string;
  value: string;
  xAxisLabels: string[];
}

const timeRanges: TimeRange[] = [
  {
    label: "روزانه",
    value: "daily",
    xAxisLabels: [
      "۷:۰۰",
      "۸:۰۰",
      "۹:۰۰",
      "۱۰:۰۰",
      "۱۱:۰۰",
      "۱۲:۰۰",
      "۱۳:۰۰",
      "۱۴:۰۰",
      "۱۵:۰۰",
      "۱۶:۰۰",
      "۱۷:۰۰",
      "۱۸:۰۰",
      "۱۹:۰۰",
      "۲۰:۰۰",
    ],
  },
  {
    label: "هفتگی",
    value: "weekly",
    xAxisLabels: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
    ],
  },
  {
    label: "۳ ماه اخیر",
    value: "3months",
    xAxisLabels: ["تیر", "مرداد", "شهریور"],
  },
  {
    label: "۶ ماه اخیر",
    value: "6months",
    xAxisLabels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
  },
  {
    label: "سالانه",
    value: "yearly",
    xAxisLabels: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
  },
];

interface DynamicLineChartProps {
  title: string;
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
  }[];
}

const DynamicLineChart: React.FC<DynamicLineChartProps> = ({
  title,
  datasets,
}) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(timeRanges[0]);

  const chartData = {
    labels: selectedRange.xAxisLabels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
        <div className="w-full sm:w-auto">
          <select
            className="w-full sm:w-auto px-3 text-gray-800 py-2 text-sm border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white shadow-sm hover:border-gray-400 transition-colors"
            value={selectedRange.value}
            onChange={(e) =>
              setSelectedRange(
                timeRanges.find((range) => range.value === e.target.value) ||
                  timeRanges[0]
              )
            }
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[250px] sm:h-[300px] relative">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(0,0,0,0.1)",
                },
                ticks: {
                  font: {
                    size: 11,
                  },
                  padding: 8,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 11,
                  },
                  maxRotation: 45,
                  minRotation: 45,
                  padding: 8,
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  boxWidth: 12,
                  padding: 15,
                  font: {
                    size: 11,
                  },
                },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                padding: 12,
                titleFont: {
                  size: 13,
                },
                bodyFont: {
                  size: 12,
                },
                displayColors: true,
                boxWidth: 10,
                boxHeight: 10,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DynamicLineChart;
