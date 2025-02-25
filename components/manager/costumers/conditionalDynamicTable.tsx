"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BiSearch, BiSortAlt2 } from "react-icons/bi";
import { BsCalendarRange } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

interface StyleRule {
  condition: (value: any) => boolean;
  className: string;
}

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
  styleRules?: StyleRule[];
}

interface TableData {
  date?: string;
  [key: string]: any;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TableData;
}

interface DatePickerInputProps {
  value?: DateObject[];
  openCalendar?: () => void;
}

const CustomInput: React.FC<DatePickerInputProps> = ({ value, openCalendar }) => (
  <div className="relative cursor-pointer" onClick={openCalendar}>
    <input
      value={Array.isArray(value) ? value.map((date) => date?.format?.()).join(" - ") : ""}
      readOnly
      className="w-full p-4 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl 
      focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE] 
      transition-all duration-300 hover:border-[#6FBDF5]"
      placeholder="انتخاب بازه زمانی"
    />
    <BsCalendarRange className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6FBDF5] text-xl" />
  </div>
);

const RowModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="relative bg-white rounded-xl shadow-2xl w-11/12 max-w-2xl mx-auto p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#6FBDF5]">جزئیات اطلاعات</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoClose size={24} className="text-gray-500" />
            </motion.button>
          </div>
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{key}</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const StyledTable = ({ data, columns }: { data: TableData[]; columns: Column[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<any>(null);
  const [selectedRow, setSelectedRow] = useState<TableData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const getStyles = (column: Column, value: any): string => {
    if (!column.styleRules) return '';
    const matchedRule = column.styleRules.find(rule => rule.condition(value));
    return matchedRule?.className || '';
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (row: TableData) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      let matchesDateRange = true;
      if (dateRange && dateRange[0] && dateRange[1] && item.date) {
        const startDate = new Date(dateRange[0].unix * 1000);
        const endDate = new Date(dateRange[1].unix * 1000);
        const itemDate = new Date(item.date);
        matchesDateRange = itemDate >= startDate && itemDate <= endDate;
      }

      return matchesSearch && matchesDateRange;
    });
  }, [data, searchTerm, dateRange]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <div className="bg-white w-full rounded-xl shadow-lg p-6" dir="rtl">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        <div className="relative group">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl 
            focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE] 
            transition-all duration-300 hover:border-[#6FBDF5]"
          />
          <BiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6FBDF5] text-2xl" />
        </div>

        <div className="relative group">
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            range
            value={dateRange}
            onChange={setDateRange}
            render={<CustomInput />}
            calendarPosition="bottom-right"
            format="YYYY/MM/DD"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FBFE] border-b-2 border-[#E8F4FE]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 text-right font-medium text-gray-900">
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
            <AnimatePresence mode="wait">
              {sortedData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b border-[#E8F4FE] hover:bg-[#F8FBFE] cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${index}-${column.key}`}
                      className={`px-6 py-4 text-gray-900 ${getStyles(column, row[column.key])}`}
                    >
                      {column.render ? column.render(row[column.key]) : row[column.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      <RowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedRow || ({} as TableData)}
      />
    </div>
  );
};

export default StyledTable;
