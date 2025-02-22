"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment-jalaali";
import { FaUserCircle } from "react-icons/fa";
import {
  BsTelephone,
  BsGraphUp,
  BsListCheck,
  BsCalendarEvent,
  BsClock,
  BsTelephoneFill,
} from "react-icons/bs";
import { AiFillStar, AiFillTrophy, AiOutlineTrophy } from "react-icons/ai";

const DefaultDashboard = () => {
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
  const [username, setUsername] = useState("کاربر گرامی");

  const currentDate = moment().format("jYYYY/jMM/jDD");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("HH:mm:ss"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    // Time update
    const timer = setInterval(() => {
      setCurrentTime(moment().format("HH:mm:ss"));
    }, 1000);

    // Fetch username
    const fetchUsername = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsername(data.username || "کاربر گرامی");
      } catch (error) {
        console.log("Using default username");
      }
    };

    fetchUsername();
    return () => clearInterval(timer);
  }, []);

  const rewards = [
    { title: "فروش برتر هفته", amount: "۱,۲۰۰,۰۰۰ تومان", icon: <AiFillTrophy size={24} /> },
    { title: "تماس‌های موفق", count: "۴۵ تماس", icon: <BsTelephoneFill size={24} /> },
    { title: "امتیاز عملکرد", score: "۹۵/۱۰۰", icon: <AiFillStar size={24} /> },
  ];
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6  min-h-screen"
      dir="rtl"
    >
      {/* Date and Time Header */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-4 left-4 z-10"
      >
        <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center gap-4">
          <div className="bg-[#6FBDF5] rounded-full p-2">
            <FaUserCircle size={15} className="text-white" />
          </div>
          <div className="border-r-2 border-gray-100 pr-4">
            <div className="text-sm text-gray-500">خوش آمدید</div>
            <div className="font-bold text-gray-700">{username}</div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <BsCalendarEvent size={14} />
              <span>{currentDate}</span>
              <span className="mx-2">|</span>
              <BsClock size={14} />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rewards Section */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="grid grid-cols-1 mt-32 md:grid-cols-3 gap-6 mb-8"
      >
        {rewards.map((reward, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm border-2 border-[#6FBDF5]/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{reward.icon}</span>
              <AiOutlineTrophy className="text-[#6FBDF5] text-2xl" />
            </div>
            <h3 className="text-lg font-bold mt-4 text-gray-700">
              {reward.title}
            </h3>
            <p className="text-[#6FBDF5] text-xl font-bold mt-2">
              {reward.amount || reward.count || reward.score}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 bg-[#6FBDF5] text-white py-4 px-6 rounded-lg shadow-lg hover:bg-[#5CA8E0] transition-colors"
        >
          <BsTelephone size={20} />
          <span>ثبت تماس جدید</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 bg-white text-[#6FBDF5] py-4 px-6 rounded-lg shadow-lg border-2 border-[#6FBDF5] hover:bg-[#6FBDF5] hover:text-white transition-colors"
        >
          <BsGraphUp size={20} />
          <span>مشاهده عملکرد</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 bg-white text-[#6FBDF5] py-4 px-6 rounded-lg shadow-lg border-2 border-[#6FBDF5] hover:bg-[#6FBDF5] hover:text-white transition-colors"
        >
          <BsListCheck size={20} />
          <span>لیست گزارشات</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DefaultDashboard;
