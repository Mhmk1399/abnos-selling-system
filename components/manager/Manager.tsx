"use client";
import CallDistributionDashboard from "@/components/manager/totalreports/MainComponent";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "main", title: "صفحه ی اصلی" },
  { id: "calls", title: "تماس‌ها" },
  { id: "sales", title: "فروش" },
  { id: "orders", title: "سفارشات" },
  { id: "customers", title: "مشتریان" },
];

export default function Manager() {
  const [activeTab, setActiveTab] = useState("calls");

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-8"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">داشبورد مدیریت</h1>
      <div className=" rounded-lg p-2 shadow-sm">
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <motion.button
                onClick={() => setActiveTab(item.id)}
                className={`relative px-2 py-3 text-sm font-medium transition-colors
            ${
              activeTab === item.id
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
              >
                {item.title}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            </div>
          ))}
        </nav>
      </div>
      <CallDistributionDashboard />
    </div>
  );
}
