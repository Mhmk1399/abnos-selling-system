import { motion } from "framer-motion";
import { JSX, useState } from "react";
import {
  HiTrendingUp,
  HiUsers,
  HiShoppingCart,
  HiCurrencyDollar,
  HiChartBar,
  HiPhone,
  HiClipboardCheck,
  HiUserGroup,
} from "react-icons/hi";
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
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-start mb-8  justify-center md:justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black text-center mx-auto md:mx-0"
        >
          شاخص‌های کلیدی
        </motion.h2>

        <motion.select
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl text-gray-700 
                   bg-white/70 backdrop-blur-sm border-2 border-indigo-100
                   shadow-inner focus:ring-4 focus:ring-indigo-100 
                   focus:border-indigo-300 focus:outline-none
                   transition-all duration-300 hover:border-indigo-200"
        >
          {dateFilters.map((filter) => (
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-6
                     hover:bg-gradient-to-br hover:from-sky-500 hover:to-blue-300
                     transition-all duration-500 ease-out
                     border-2 border-transparent hover:border-indigo-100"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
                        rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="relative flex items-start gap-4 mb-4">
              <div
                className="p-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100
                          group-hover:from-white/20 group-hover:to-white/20 
                          text-indigo-600 group-hover:text-white transition-colors duration-500"
              >
                {getIconForMetric(metric.label)}
              </div>
              <span
                className="text-sm font-medium text-gray-600 group-hover:text-white/80 
                           transition-colors duration-500 mt-2"
              >
                {metric.label}
              </span>
            </div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-gray-800 group-hover:text-white 
                       transition-colors duration-500 ml-2"
            >
              {metric.value}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const getIconForMetric = (label: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    درآمد: <HiCurrencyDollar size={24} />,
    "تعداد مشتریان": <HiUsers size={24} />,
    "سفارشات باز": <HiShoppingCart size={24} />,
    "نرخ رشد": <HiTrendingUp size={24} />,
    "نرخ تبدیل": <HiChartBar size={24} />,
    "تعداد کل تماس‌ها": <HiPhone size={24} />,
    "وظایف تکمیل شده": <HiClipboardCheck size={24} />,
    "کاربران فعال": <HiUserGroup size={24} />,
  };

  return iconMap[label] || <HiTrendingUp size={24} />;
};

export default MetricsTable;
