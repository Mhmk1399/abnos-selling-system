"use client";
import { motion } from "framer-motion";
import { FaUserTie, FaUsers, FaFlask } from "react-icons/fa";
import SalerForm from "@/components/static/saler/saler-form";
import { useState } from "react";
import SupervisorForm from "@/components/static/supervisor/supervisor-form";
import Manager from "@/components/manager/Manager";

export default function Home() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const buttons = [
    {
      id: "saler",
      icon: FaUserTie,
      label: "پنل فروشنده",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "supervisor",
      icon: FaUsers,
      label: "پنل ناظر",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "test",
      icon: FaFlask,
      label: "پنل مدیر",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className=" flex flex-col  justify-center">
      {!selectedForm ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full p-8 mt-24 rounded-lg shadow-sm"
        >
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            به سامانه مدیریت سفارشات آبنوس خوش آمدید
          </h1>

          <div className="grid md:grid-cols-3 justify-center items-center  gap-6">
            {buttons.map((button) => (
              <motion.button
                key={button.id}
                onClick={() => setSelectedForm(button.id)}
                className={`bg-gradient-to-r ${button.color} p-6 rounded-xl text-white shadow-lg
                           hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <button.icon className="text-4xl" />
                  <span className="font-medium text-lg">{button.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div className="relative" transition={{ duration: 0.5 }}>
          {/* <button
            onClick={() => setSelectedForm(null)}
            className="absolute left-4 top-[100px] py-1 px-4 inline-block text-white font-bold rounded-md bg-yellow-500 hover:text-red-50 transition-colors"
          >
            ← بازگشت به صفحه اصلی
          </button> */}

          {selectedForm === "saler" && <SalerForm />}
          {selectedForm === "supervisor" && <SupervisorForm />}
          {selectedForm === "test" && <Manager />}
        </motion.div>
      )}
    </div>
  );
}
