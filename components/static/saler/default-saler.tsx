"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment-jalaali";
import { Tab } from "@headlessui/react";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

import {
  BsTelephone,
  BsGraphUp,
  BsListCheck,
  BsCalendarEvent,
  BsTelephoneFill,
} from "react-icons/bs";
import { AiFillStar, AiFillTrophy, AiOutlineTrophy } from "react-icons/ai";
import FileInputModal from "../file-input-modal";

  import FileInput from "../file-input";
interface Target {
  _id: string;
  saler: string[];
  customer: {
    _id: string;
    name: string;
    phones: string[];
    type: string;
    city: string;
  };
  startDate: string;
  endDate: string;
  amount: string;
  price: string;
  city: string;
  product: string[];
  date: string;
  supervisor: string;
  timestamp: string;
}
const TargetDisplay = ({ target }: { target: Target }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white mb-8 h-fit to-[#F8FBFE] rounded-2xl shadow-lg py-2 px-8"
    >
      <div className="flex flex-col md:flex-col justify-center items-start md:items-center mb-8">
        <h2 className="text-2xl font-bold text-[#6FBDF5] mb-2">هدف فعلی</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <span className="bg-blue-50 px-3 py-1 rounded-full text-sm">
            {target?.startDate}
          </span>
          <span>تا</span>
          <span className="bg-blue-50 px-3 py-1 rounded-full text-sm">
            {target?.endDate}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            اطلاعات مشتری
          </h3>
          <div className="flex flex-row gap-8 justify-center items-center">
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">نام:</span>
              <span className="font-medium text-black">
                {target?.customer?.name || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">شهر:</span>
              <span className="font-medium text-black">
                {target?.customer?.city || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">نوع:</span>
              <span className="font-medium text-black">
                {target?.customer?.type || "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            جزئیات هدف
          </h3>
          <div className="flex flex-row gap-8 justify-center items-center">
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">مقدار:</span>
              <span className="font-medium text-black">
                {target?.amount || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">قیمت:</span>
              <span className="font-medium text-black">
                {target?.price || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600">تعداد محصولات:</span>
              <span className="font-medium text-black">
                {target?.product?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const DefaultDashboard = () => {
  const [username, setUsername] = useState("کاربر گرامی");
  const currentDate = moment().format("jYYYY/jMM/jDD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const overlayRef = useRef(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    _id: "",
  });
  const [currentTarget, setCurrentTarget] = useState<Target[]>([]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setIsModalOpen(false);
    }
  };
  const handleCustomerSelection = async (isNewCustomer: boolean) => {
    if (isNewCustomer) {
      try {
        setIsModalOpen(false);
        setShowFileInput(true);
      } catch (error) {
        console.log("Error creating customer:", error);
      }
    } else {
      setIsModalOpen(false);
      setShowFileInput(true);
    }
  };
  const fetchCustomer = async () => {
    const response = await fetch("/api/customer");
    const data = await response.json();
    setCustomers(data.customer);
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch("/api/auth/id", {
          method: "POST",
          body: JSON.stringify({
            token: localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        console.log("Username:", data);

        setUsername(data.name || "کاربر گرامی");
      } catch (error) {
        console.log("Using default username");
      }
    };

    fetchUsername();
  }, []);

  const handleSubmit = async () => {
    const response = await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
    const  data = await response.json();
    console.log("Customer created:", data);
    
      setSelectedCustomer(data.customer._id);
      setFormData(data.customer);
    }
   
  };
  
  const fetchTargets = async () => {
    try {
      const response = await fetch("/api/targets/id", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("user") || "",
        },
      });
      const data = await response.json();

      const targetsArray = data.target ? [data.target] : [];
      setCurrentTarget(targetsArray);
    } catch (error) {
      console.error("Error fetching targets:", error);
      setCurrentTarget([]);
    }
  };

  // Add useEffect to fetch data
  useEffect(() => {
    fetchTargets();
  }, []);

  // Add these columns for the table


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
        className="p-6 min-h-screen mr-16"
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

        {currentTarget &&
          currentTarget.map((target: Target) => (
            <TargetDisplay key={target._id} target={target} />
          ))}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {setIsModalOpen(true)
              handleCustomerSelection(false)
            }}

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

      {/* {isModalOpen && (
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
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      type="text"
                      placeholder="نام مشتری..."
                      className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                    />
                    <select
                      onChange={(e) => {
                        setFormData({ ...formData, type: e.target.value });
                      }}
                      className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                    >
                      <option value="">انتخاب نوع مشتری</option>
                      <option value="individual">شخصی</option>
                      <option value="company">شرکت</option>
                      <option value="presenter">معرف</option>
                    </select>
                    <button
                      onClick={() => {
                        handleCustomerSelection(true);
                        handleSubmit();
                      }}
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
                        placeholder="جستجو ..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full p-3 pr-12 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                      />
                      <BiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6FBDF5] text-xl" />
                    </div>
                    <button
                      onClick={() => handleCustomerSelection(false)}
                      className="px-4 py-2 w-full rounded-lg bg-[#6FBDF5] text-white"
                    >
                      انتخاب و ادامه
                    </button>
                  </div>
                </Tab.Panel>
              </Tab.Panels> */}

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
            {/* </Tab.Group>
              </Tab.Panels>
            </Tab.Group>
          </motion.div>
        </motion.div>
      )} */}
      {showFileInput && (
          <FileInputModal
            onClose={() => setShowFileInput(false)}
            />
      )}
    </>
  );
};

export default DefaultDashboard;
