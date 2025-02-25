import React, { useState } from "react";
import { motion } from "framer-motion";

interface TreeChartProps {
  title: string;
  totalCalls: number;
  salesData: {
    name: string;
    calls: number;
    statuses: {
      status: string;
      count: number;
    }[];
  }[];
}

const timeRanges = [
  { label: "امروز", value: "today" },
  { label: "هفته جاری", value: "thisWeek" },
  { label: "ماه جاری", value: "thisMonth" },
  { label: "سه ماه اخیر", value: "last3Months" },
  { label: "شش ماه اخیر", value: "last6Months" },
  { label: "سال جاری", value: "thisYear" },
];
const DynamicTreeChart: React.FC<TreeChartProps> = ({
  totalCalls,
  salesData,
  title,
}) => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0].value);

  const getConversionRate = (parentCount: number, childCount: number) =>
    parentCount > 0 ? ((childCount / parentCount) * 100).toFixed(1) : "0";

  return (
    <div className="w-full min-h-[600px]  rounded-xl p-4 md:p-8  overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="flex justify-end mb-6">
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    bg-white shadow-sm hover:border-gray-400 transition-colors"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center min-w-[320px]">
        {/* Root Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 md:p-6 text-white text-center w-full max-w-[384px] shadow-md mb-8"
        >
          <h3 className="text-lg font-semibold">Total Calls</h3>
          <div className="text-3xl font-bold mt-2">{totalCalls}</div>
        </motion.div>

        {/* Enhanced Connecting Line */}
        <div className="relative h-12 w-0.5 bg-blue-200 mb-8">
          <div className="absolute top-0 left-1/2 w-[200%] h-0.5 bg-blue-200 -translate-x-1/2" />
        </div>

        {/* Sales Representatives Level */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center">
          {salesData.map((saler, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center relative"
            >
              {/* Saler Node */}
              <div className="w-full max-w-[224px]">
                <div className="bg-white border-2 border-blue-400 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <h4 className="font-bold text-blue-600">{saler.name}</h4>
                    <p className="mt-1 text-gray-600">{saler.calls} Calls</p>
                    <p className="text-sm text-gray-400">
                      {getConversionRate(totalCalls, saler.calls)}% of Total
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Connecting Lines to Statuses */}
              {saler.statuses.length > 0 && (
                <div className="relative h-8 w-0.5 bg-blue-100 mt-4">
                  <div className="absolute bottom-0 left-1/2 w-[120%] h-0.5 bg-blue-100 -translate-x-1/2" />
                </div>
              )}

              {/* Status Level */}
              {saler.statuses.length > 0 && (
                <div className="flex flex-row items-center gap-4">
                  {saler.statuses.map((status, statusIndex) => (
                    <motion.div
                      key={statusIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: statusIndex * 0.1 + index * 0.2 }}
                      className="bg-white border border-blue-300 rounded-lg p-3 w-full max-w-[192px] shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="text-center">
                        <p className="font-medium text-blue-500">
                          {status.status}
                        </p>
                        <p className="text-gray-600 font-semibold">
                          {status.count}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {getConversionRate(saler.calls, status.count)}%
                          Conversion
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicTreeChart;
