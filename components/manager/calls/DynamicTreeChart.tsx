import React from "react";
import { motion } from "framer-motion";

interface TreeChartProps {
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

const DynamicTreeChart: React.FC<TreeChartProps> = ({
  totalCalls,
  salesData,
}) => {
  // Calculate conversion percentages
  const getConversionRate = (parentCount: number, childCount: number) =>
    parentCount > 0 ? ((childCount / parentCount) * 100).toFixed(1) : "0";

  return (
    <div className="w-full min-h-[600px] bg-gray-50 rounded-xl p-8 shadow-lg overflow-x-auto">
      <div className="flex flex-col items-center">
        {/* Root Node (Total Calls) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center w-96 shadow-md mb-8"
        >
          <h3 className="text-lg font-semibold">Total Calls</h3>
          <div className="text-3xl font-bold mt-2">{totalCalls}</div>
        </motion.div>

        {/* Connecting Line */}
        <div className="h-12 w-0.5 bg-blue-200 mb-8" />

        {/* Sales Representatives Level */}
        <div className="flex flex-row gap-4 items-center space-y-12">
          {salesData.map((saler, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col  items-center"
            >
              {/* Saler Node */}
              <div className="relative">
                <div className="bg-white border-2 flex-row border-blue-400 rounded-xl p-4 w-56 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <h4 className="font-bold text-blue-600">{saler.name}</h4>
                    <p className="mt-1 text-gray-600">{saler.calls} Calls</p>
                    <p className="text-sm text-gray-400">
                      {getConversionRate(totalCalls, saler.calls)}% of Total
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting Line to Statuses */}
              {saler.statuses.length > 0 && (
                <div className="h-8 w-0.5 bg-blue-100 mt-4" />
              )}

              {/* Status Level */}
              {saler.statuses.length > 0 && (
                <div className="flex flex-col items-center space-y-6">
                  {saler.statuses.map((status, statusIndex) => (
                    <motion.div
                      key={statusIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: statusIndex * 0.1 + index * 0.2 }}
                      className="bg-white border border-blue-300 rounded-lg p-3 w-48 shadow-sm hover:shadow-md transition-all"
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
