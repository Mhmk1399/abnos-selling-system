import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useState } from "react";

interface DynamicPieChartProps {
  title: string;
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
}

const dateFilters = [
  { value: "daily", label: "روزانه" },
  { value: "weekly", label: "هفتگی" },
  { value: "monthly", label: "ماهانه" },
  { value: "quarterly", label: "سه ماهه" },
  { value: "biannual", label: "شش ماهه" },
  { value: "yearly", label: "سالانه" },
];

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({ title, data }) => {
  const [dateFilter, setDateFilter] = useState("daily");

  const chartData = {
    labels: data.labels,
    datasets: [{
      data: data.values,
      backgroundColor: data.colors,
      borderWidth: 2,
      borderColor: '#ffffff',
    }],
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        
        <select 
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {dateFilters.map(filter => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="h-[300px] relative">
          <Pie 
            data={chartData} 
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  titleColor: '#1e293b',
                  bodyColor: '#1e293b',
                  padding: 12,
                  borderColor: '#e2e8f0',
                  borderWidth: 1,
                }
              }
            }} 
          />
        </div>

        <div className="overflow-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">متغیر</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">رنگ</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">مقدار</th>
              </tr>
            </thead>
            <tbody>
              {data.labels.map((label, index) => (
                <tr key={label} className="border-b">
                  <td className="px-4 py-3 text-sm text-gray-800">{label}</td>
                  <td className="px-4 py-3">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: data.colors[index] }}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {data.values[index].toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default DynamicPieChart;
