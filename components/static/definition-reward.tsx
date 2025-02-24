"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { IoAdd, IoClose } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface RewardForm {
  saler: string;
  customer: {
    name: string;
  };
  startDate: string;
  endDate: string;
  amount: string;
  price: string;
  city: string;
  product: string[];
}
interface User {
  _id: string;
  name: string;
  role: string;
}

const DefinitionReward = () => {
  const [rewards, setRewards] = useState<RewardForm[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentReward, setCurrentReward] = useState<RewardForm>({
    saler: "",
    customer: {
      name: "",
    },
    startDate: "",
    endDate: "",
    amount: "",
    price: "",
    city: "",
    product: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        body: JSON.stringify({
          ...currentReward,
          customer: "",
          supervisor: "67badd17741200a6b19590af",
          startDate: currentReward.startDate.toString(),
          endDate: currentReward.endDate.toString(),
          saler: "67badd17741200a6b19590af",
          price: "100000",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //   const data = await response.json();
      //   setRewards([...rewards, data.reward]);
      setIsModalOpen(false);
      if (response.ok) {
        console.log("Reward created successfully!");
        setCurrentReward({
          saler: "",
          customer: {
            name: "",
          },
          startDate: "",
          endDate: "",
          amount: "",
          price: "",
          city: "",
          product: [],
        });
        setIsModalOpen(false);
      } else {
        console.error("Failed to create reward.");
      }
    } catch (error) {
      console.error("Error creating reward:", error);
    }
  };

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch("/api/reward");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        setRewards([...rewards, data.reward]);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };
    fetchRewards();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            id: localStorage.getItem("user") || "",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  // Add these handler functions
  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
    setCurrentReward((prev) => ({
      ...prev,
      saler: selectedUsers.join(","),
    }));
  };

  const handleSelectAll = () => {
    const allUserIds = users.map((user) => user._id);
    setSelectedUsers(selectedUsers.length === users.length ? [] : allUserIds);
    setCurrentReward((prev) => ({
      ...prev,
      saler: selectedUsers.join(","),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 mx-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl text-nowrap font-bold text-[#6FBDF5] flex items-center gap-2">
          <BsTrophy />
          تعریف پاداش فروشندگان
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#6FBDF5] text-nowrap mt-2 md:mt-0  text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <IoAdd size={20} />
          افزودن پاداش جدید
        </motion.button>
      </div>

      {/* Reward List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-[#6FBDF5]/30 to-sky-50 border-r-2 border-[#6FBDF5] p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">{reward?.saler || ""}</h3>
            <div className="text-sm text-gray-600">
              <p className="text-gray-600">مشتری: {reward?.customer?.name}</p>
              <p className="text-gray-600">مبلغ: {reward?.amount} تومان</p>
              <p className="text-gray-600">شهر: {reward?.city}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Reward Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#6FBDF5]">
                تعریف پاداش جدید
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:bg-gray-100 rounded-full p-2"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* User Selection Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#6FBDF5]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    انتخاب فروشندگان
                  </h4>
                  <button
                    onClick={handleSelectAll}
                    className="text-[#6FBDF5] hover:text-[#5CA8E0] text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    {selectedUsers.length === users.length
                      ? "لغو انتخاب همه"
                      : "انتخاب همه"}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto custom-scrollbar p-2">
                  {users.map((user) => (
                    <label
                      key={user._id}
                      className="flex items-center gap-2 space-x-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleUserSelect(user._id)}
                        className="form-checkbox h-5 w-5 text-[#6FBDF5] rounded border-gray-300 focus:ring-[#6FBDF5]"
                      />
                      <span className="text-gray-700 mr-2 select-none">
                        {user.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="مبلغ پاداش"
                  className="w-full border border-gray-200 rounded-xl p-3 pr-12 text-gray-800 focus:ring-2 focus:ring-[#6FBDF5] focus:border-transparent outline-none transition-all"
                  onChange={(e) =>
                    setCurrentReward({
                      ...currentReward,
                      amount: e.target.value,
                    })
                  }
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  placeholder="تاریخ شروع"
                  className="w-full border border-gray-200 rounded-xl p-3 text-right focus:ring-2 focus:ring-[#6FBDF5] focus:border-transparent outline-none transition-all"
                  onChange={(date) => {
                    setCurrentReward({
                      ...currentReward,
                      startDate: date?.toString() || "",
                    });
                  }}
                />

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  placeholder="تاریخ پایان"
                  className="w-full border border-gray-200 rounded-xl p-3 text-right focus:ring-2 focus:ring-[#6FBDF5] focus:border-transparent outline-none transition-all"
                  onChange={(date) => {
                    setCurrentReward({
                      ...currentReward,
                      endDate: date?.toString() || "",
                    });
                  }}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-[#6FBDF5] text-[#6FBDF5] rounded-lg hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#6FBDF5] text-white rounded-lg hover:bg-[#5CA8E0]"
              >
                ثبت پاداش
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DefinitionReward;
