"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BiSearch, BiFilterAlt, BiSortAlt2 } from "react-icons/bi";

interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
}

interface DynamicTableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  onFilter?: (filters: any) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  loading = false,
  onSort,
  onFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Add date filtering logic here based on dateRange
      return matchesSearch;
    });
  }, [data, searchTerm, dateRange]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6" dir="rtl">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pr-12 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
          />
          <BiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6FBDF5] text-xl" />
        </div>

        <DatePicker
          calendar={persian}
          locale={persian_fa}
          range
          value={dateRange}
          onChange={setDateRange}
          render={
            <input
              className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
              placeholder="انتخاب بازه زمانی"
            />
          }
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilter?.({ searchTerm, dateRange })}
          className="flex items-center justify-center gap-2 bg-[#6FBDF5] text-white rounded-xl hover:bg-[#5CA8E0] transition-colors"
        >
          <BiFilterAlt size={20} />
          <span>اعمال فیلتر</span>
        </motion.button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FBFE]  border-b-2 border-[#E8F4FE]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-right font-medium text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <BiSortAlt2
                        className="cursor-pointer hover:text-[#6FBDF5]"
                        onClick={() => handleSort(column.key)}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8">
                    <div className="animate-pulse">در حال بارگذاری...</div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b text-black border-[#E8F4FE] hover:bg-[#F8FBFE]"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4">
                        {column.render
                          ? column.render(row[column.key])
                          : row[column.key]}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
