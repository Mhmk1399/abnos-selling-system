import React, { useState } from "react";
import { motion } from "framer-motion";

interface Issue {
  issue: string;
}

interface AggregatedIssue {
  issue: string;
  count: number;
}

const aggregateIssues = (issues: Issue[]): AggregatedIssue[] => {
  const issueCounts = issues.reduce(
    (acc: Record<string, number>, curr: Issue) => {
      acc[curr.issue] = (acc[curr.issue] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(issueCounts)
    .map(([issue, count]) => ({ issue, count }))
    .sort((a, b) => b.count - a.count);
};

interface SupportIssuesTableProps {
  issues: Issue[];
}

const SupportIssuesTable: React.FC<SupportIssuesTableProps> = ({ issues }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const aggregatedData = aggregateIssues(issues);
  const filteredData = aggregatedData.filter((item) =>
    item.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIssues = aggregatedData.reduce((sum, item) => sum + item.count, 0);
  const highPriorityIssues = aggregatedData.filter(
    (item) => item.count >= 3
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white rounded-xl shadow-lg"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Support Issues Dashboard
          </h2>
          <p className="text-gray-500">
            Track and manage customer support requests
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 md:flex-none bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-600 mb-1">Total Issues</p>
            <p className="text-2xl font-bold text-blue-700">{totalIssues}</p>
          </div>
          <div className="flex-1 md:flex-none bg-red-50 p-4 rounded-lg text-center">
            <p className="text-sm text-red-600 mb-1">High Priority</p>
            <p className="text-2xl font-bold text-red-700">
              {highPriorityIssues}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Search issues..."
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">
                Issue Description
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3 w-32">
                Occurrences
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3 w-32">
                Priority
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3 w-32">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredData.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-800">
                  {item.issue}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.count}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.count >= 3
                        ? "bg-red-100 text-red-800"
                        : item.count === 2
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.count >= 3
                      ? "High"
                      : item.count === 2
                      ? "Medium"
                      : "Low"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Active
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No support issues found matching your search.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SupportIssuesTable;
