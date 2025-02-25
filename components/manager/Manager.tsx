"use client";
import CallDistributionDashboard from "@/components/manager/totalreports/MainComponent";
import MainCalls from "./calls/MainCalls";
import { useState } from "react";
import { motion } from "framer-motion";
import MainCostumer from "./costumers/MainCostumer";
import RoleChanger from "./role-changer";
import MainSales from "./sales/main-sales";

const navItems = [
  { id: "main", title: "صفحه ی اصلی" },
  { id: "calls", title: "تماس‌ها" },
  { id: "sales", title: "فروش" },
  { id: "customers", title: "مشتریان" },
  { id: "users", title: "لیست کاربران" },
];

export default function Manager() {
  const [activeTab, setActiveTab] = useState("main");

  const renderContent = () => {
    switch (activeTab) {
      case "main":
        return <CallDistributionDashboard />;
      case "calls":
        return (
          <div className="max-w-7xl flex justify-center mx-auto">
            <MainCalls />
          </div>
        ); // Replace with your Calls component
      case "sales":
        return <MainSales />; // Replace with your Sales component
      case "users":
        return <RoleChanger />; // Replace with your Orders component
      case "customers":
        return (
          <div className="max-w-7xl flex justify-center mx-auto">
            <MainCostumer />
          </div>
        );
      default:
        return <CallDistributionDashboard />;
    }
  };
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-3"
      dir="rtl"
    >
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">
        داشبورد مدیریت
      </h1>
      <button
        onClick={() => (window.location.href = "/")}
        className="absolute left-4 top-[100px] py-1 px-4 inline-block text-white font-bold rounded-md bg-yellow-500 hover:text-red-50 transition-colors"
      >
        ← بازگشت به صفحه اصلی
      </button>
      <div className="rounded-lg p-2 shadow-sm">
        <nav className="flex items-center justify-center gap-2 md:gap-8">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <motion.button
                onClick={() => setActiveTab(item.id)}
                className={`relative px-2 md:px-6 py-3 text-nowrap text-xs rounded-md hover:bg-white/40 md:text-sm font-medium transition-colors
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
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
}
