"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { IoAdd, IoClose } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { s } from "framer-motion/client";

interface RewardForm {
  saler: string;
  customer: string;
  startDate: string;
  endDate: string;
  amount: string;
  price: string;
  city: string;
  product: string[];
}

const DefinitionReward = () => {
  const [rewards, setRewards] = useState<RewardForm[]>([]);
  const [currentReward, setCurrentReward] = useState<RewardForm>({
    saler: "",
    customer: "",
    startDate: "",
    endDate: "",
    amount: "",
    price: "",
    city: "",
    product: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const salerOptions = [
    { value: "all", label: "همه" },
    { value: "1", label: "علی محمدی" },
    { value: "2", label: "سارا احمدی" },
    { value: "3", label: "رضا کریمی" },
  ];

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        body: JSON.stringify({
          ...currentReward,
          supervisor: "67badd17741200a6b19590af",
          startDate: currentReward.startDate,
          endDate: currentReward.endDate,
          saler: "67badd17741200a6b19590af",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //   const data = await response.json();
      //   setRewards([...rewards, data.reward]);
      //   setIsModalOpen(false);
      setCurrentReward({
        saler: "",
        customer: "",
        startDate: "",
        endDate: "",
        amount: "",
        price: "",
        city: "",
        product: [],
      });
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 mx-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#6FBDF5] flex items-center gap-2">
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
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">{reward?.saler || ""}</h3>
            <div className="text-sm text-gray-600">
              <p className="text-gray-600">مشتری: {reward?.customer}</p>
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
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Select
                  options={salerOptions}
                  placeholder="انتخاب فروشنده"
                  onChange={(option) =>
                    setCurrentReward({
                      ...currentReward,
                      saler: option?.value || "",
                    })
                  }
                  className="text-right text-black"
                />
              </div>
              <input
                type="text"
                placeholder="نام مشتری"
                className="border rounded-lg p-2 text-black"
                onChange={(e) =>
                  setCurrentReward({
                    ...currentReward,
                    customer: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="مبلغ پاداش"
                className="border rounded-lg p-2 text-black"
                onChange={(e) =>
                  setCurrentReward({ ...currentReward, amount: e.target.value })
                }
              />
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                placeholder="تاریخ شروع"
                className=" border rounded-lg p-2 w-full text-right"
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
                className=" border rounded-lg p-2 w-full text-right"
                onChange={(date) => {
                  setCurrentReward({
                    ...currentReward,
                    endDate: date?.toString() || "",
                  });
                }}
              />
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
