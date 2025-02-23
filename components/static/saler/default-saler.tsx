"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment-jalaali";
import { Tab } from "@headlessui/react";
import { BiSearch } from "react-icons/bi";
import { FaUser, FaUserCircle } from "react-icons/fa";

import {
  BsTelephone,
  BsGraphUp,
  BsListCheck,
  BsCalendarEvent,
  BsClock,
  BsTelephoneFill,
} from "react-icons/bs";
import { AiFillStar, AiFillTrophy, AiOutlineTrophy } from "react-icons/ai";
import FileInputModal from "../file-input-modal";

const DefaultDashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [username, setUsername] = useState("کاربر گرامی");
  const currentDate = moment().format("jYYYY/jMM/jDD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchOfficer, setSearchOfficer] = useState("");
  const overlayRef = useRef(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setIsModalOpen(false);
    }
  };
  const handleCustomerSelection = async (isNewCustomer: boolean) => {
    if (isNewCustomer) {
      // For new customer, post data first
      try {
        // Post data to server
        // await postNewCustomer({ searchName, searchPhone, searchOfficer });

        setIsModalOpen(false);
        setShowFileInput(true);
      } catch (error) {
        console.log("Error creating customer:", error);
      }
    } else {
      // For existing customer, directly show FileInput
      setIsModalOpen(false);
      setShowFileInput(true);
    }
  };
  useEffect(() => {
    // Set initial time
    setCurrentTime(moment().format("HH:mm:ss"));

    // Update time every second
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
        const response = await fetch("/api/auth/id");
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
    {
      title: "فروش برتر هفته",
      amount: "۱,۲۰۰,۰۰۰ تومان",
      icon: <AiFillTrophy size={24} className="text-yellow-500" />,
    },
    {
      title: "تماس‌های موفق",
      count: "۴۵ تماس",
      icon: <BsTelephoneFill size={24} className="text-green-500" />,
    },
    {
      title: "امتیاز عملکرد",
      score: "۹۵/۱۰۰",
      icon: <AiFillStar size={24} className="text-blue-500" />,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 min-h-screen mx-36"
        dir="rtl"
      >
        {/* Date and Time Header */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-4 left-4 z-10"
        >
          <div className="bg-white rounded-2xl p-2 flex flex-row-reverse items-center gap-4">
            <div className="bg-[#6FBDF5] rounded-full p-2">
              <FaUserCircle size={15} className="text-white" />
            </div>
            <div className="border-l-2 border-gray-100 pl-4">
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
              className=" p-6 rounded-xl shadow-sm border-2 border-[#6FBDF5]/20"
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
            onClick={() => setIsModalOpen(true)}
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

      {/* Modal  */}

      {isModalOpen && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-xl"
          >
            <Tab.Group defaultIndex={1}>
              <Tab.List className="flex space-x-2 rounded-xl bg-[#6FBDF5]/20 p-1 mb-6">
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-3 text-sm font-medium transition-all
                ${
                  selected
                    ? "bg-[#6FBDF5] text-white shadow-md"
                    : "text-[#6FBDF5] hover:bg-white/[0.12]"
                }`
                  }
                >
                  مشتری جدید
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-3 text-sm font-medium transition-all
                ${
                  selected
                    ? "bg-[#6FBDF5] text-white shadow-md"
                    : "text-[#6FBDF5] hover:bg-white/[0.12]"
                }`
                  }
                >
                  مشتری قدیمی
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    <input
                      type="text"
                      placeholder="نام مشتری..."
                      className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                    />
                    <select className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]">
                      <option value="">انتخاب نوع مشتری</option>
                      <option value="present">نماینده</option>
                      <option value="individual">شخصی</option>
                      <option value="company">کمپانی یا شرکت</option>
                    </select>
                    <button
                      onClick={() => handleCustomerSelection(true)}
                      className="px-4 py-2 w-full rounded-lg bg-[#6FBDF5] text-white"
                    >
                      ثبت و ادامه
                    </button>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="grid grid-cols-1 w-full gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="جستجوی نام مشتری..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                      />
                      <BiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6FBDF5] text-xl" />
                    </div>

                    <div className="relative">
                      <input
                        dir="rtl"
                        type="tel"
                        placeholder="جستجوی شماره تماس..."
                        value={searchPhone}
                        onChange={(e) => setSearchPhone(e.target.value)}
                        className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                      />
                      <BsTelephone className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6FBDF5] text-xl" />
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="جستجوی نام کارمند..."
                        value={searchOfficer}
                        onChange={(e) => setSearchOfficer(e.target.value)}
                        className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                      />
                      <FaUser className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6FBDF5] text-xl" />
                    </div>
                    <button
                      onClick={() => handleCustomerSelection(false)}
                      className="px-4 py-2 w-full rounded-lg bg-[#6FBDF5] text-white"
                    >
                      انتخاب و ادامه
                    </button>
                  </div>
                </Tab.Panel>
              </Tab.Panels>

              {/* <div className="mt-6 flex justify-start gap-2">
                <button
                  // whileHover={{ scale: 1.02 }}
                  // whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border-2 border-[#6FBDF5] text-[#6FBDF5] hover:bg-[#6FBDF5] hover:text-white transition-colors"
                >
                  انصراف
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-[#6FBDF5] text-white hover:bg-[#5CA8E0] transition-colors"
                >
                  ثبت تماس
                </motion.button>
              </div> */}
            </Tab.Group>
          </motion.div>
        </motion.div>
      )}
      {showFileInput && (
        <FileInputModal onClose={() => setShowFileInput(false)} />
      )}
    </>
  );
};

export default DefaultDashboard;
