"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/global/tables";
import { motion } from "framer-motion";
import { FaUserTie } from "react-icons/fa";
import { MdVerified, MdPending } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";

interface Saler {
  id: number;
  name: string;
  phone: string;
  status: "active" | "pending" | "inactive";
  totalCalls: number;
  successRate: number;
  lastActive: string;
  date: string;
  performance: number;
}

const SalersList = () => {
  const [salers, setSalers] = useState<Saler[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSalers = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("user") || "",
        },
      });
      const data = await response.json();
      console.log(data, "salers");
      setSalers(data.users);
    } catch (error) {
      console.error("Error fetching salers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalers();
  }, []);

  const columns = [
    {
      key: "name",
      header: "نام فروشنده",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-3">
          <FaUserTie className="text-[#6FBDF5] text-xl" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (value: string) => (
        <div
          className={`flex items-center gap-2 ${
            value === "active"
              ? "text-green-500"
              : value === "pending"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {value === "active" ? <MdVerified /> : <MdPending />}
          <span>
            {value === "active"
              ? "فعال"
              : value === "pending"
              ? "در انتظار"
              : "غیرفعال"}
          </span>
        </div>
      ),
    },
    {
      key: "totalCalls",
      header: "تعداد تماس‌ها",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <BiPhoneCall className="text-[#6FBDF5]" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "successRate",
      header: "نرخ موفقیت",
      sortable: true,
      render: (value: number) => (
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-[#6FBDF5] to-blue-600"
            style={{ width: `${value}%` }}
          />
          <span className="absolute -top-6 right-0">{value}%</span>
        </div>
      ),
    },
    {
      key: "performance",
      header: "عملکرد",
      sortable: true,
      render: (value: number) => {
        const getPerformanceColor = (val: number) => {
          if (val >= 80) return "text-green-500";
          if (val >= 50) return "text-yellow-500";
          return "text-red-500";
        };

        return (
          <motion.div
            className={`font-bold ${getPerformanceColor(value)}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            {value}/100
          </motion.div>
        );
      },
    },
    {
      key: "lastActive",
      header: "آخرین فعالیت",
      sortable: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:p-6 md:mr-12"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800">لیست فروشندگان</h1>
          <p className=" text-gray-600">
            تعداد کل مشتریان: {salers.length} نفر
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#6FBDF5] text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors"
        >
          افزودن فروشنده جدید
        </motion.button>
      </div>

      <DynamicTable columns={columns} data={salers} loading={loading} />
    </motion.div>
  );
};

export default SalersList;
