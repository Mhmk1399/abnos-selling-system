import { motion } from "framer-motion";
import { useState } from "react";

interface MetricData {
  label: string;
  value: string;
  icon?: React.ReactNode; // Optional icon for each metric
}

interface MetricsTableProps {
  metrics: MetricData[];
}

const dateFilters = [
  { value: "daily", label: "روزانه" },
  { value: "weekly", label: "هفتگی" },
  { value: "monthly", label: "ماهانه" },
  { value: "quarterly", label: "سه ماهه" },
  { value: "biannual", label: "شش ماهه" },
  { value: "yearly", label: "سالانه" },
];

const MetricsTable: React.FC<MetricsTableProps> = ({ metrics }) => {
  const [dateFilter, setDateFilter] = useState("daily");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-gray-800"
        >
          شاخص‌های کلیدی
        </motion.h2>
        
        <motion.select 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 rounded-lg text-gray-700 bg-white border-none 
                     shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none
                     transition-shadow duration-200"
        >
          {dateFilters.map(filter => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </motion.select>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md
                       transition-all duration-200 transform"
          >
            <div className="flex items-center gap-3 mb-2">
              {metric.icon}
              <span className="text-sm font-medium text-gray-500">
                {metric.label}
              </span>
            </div>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-gray-800"
            >
              {metric.value}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MetricsTable;
