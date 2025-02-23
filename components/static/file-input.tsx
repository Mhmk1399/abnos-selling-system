"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaUser, FaPhone, FaHistory, FaComments } from "react-icons/fa";

const FileInput = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: "اطلاعات شخصی", icon: <FaUser /> },
    { name: "لیست تماس", icon: <FaPhone /> },
    { name: "سابقه خرید", icon: <FaHistory /> },
    { name: "نظرات", icon: <FaComments /> },
  ];

  const PersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">نام و نام خانوادگی</label>
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            className="w-full p-3 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE] transition-all duration-300"
          />
        </div>

        <div dir="rtl">
          <label className="block text-gray-700 mb-2">شماره تماس</label>
          <input
            dir="rtl"
            type="tel"
            placeholder="شماره تماس"
            className="w-full p-3 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE] transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">تاریخ تولد</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            className="w-full p-3 border-2 border-[#6FBDF5] shadow-md"
            minDate={new Date(1921, 0, 1)}
            maxDate={new Date()}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">آدرس</label>
          <textarea
            placeholder="آدرس"
            className="w-full p-3 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE] transition-all duration-300 h-32"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">شهر</label>
          <select className="w-full p-3 border-2 text-black border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE] transition-all duration-300">
            <option>تهران</option>
            <option>مشهد</option>
            <option>اصفهان</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">کارشناس مربوطه</label>
          <input
            type="text"
            className="w-full p-3 text-black border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE] transition-all duration-300"
          />
        </div>
      </div>
    </motion.div>
  );

  const CallsList = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto"
    >
      <table className="min-w-full text-black bg-white rounded-xl overflow-hidden shadow-sm">
        <thead className="bg-[#6FBDF5] text-white">
          <tr>
            <th className="py-4 px-6 text-right font-medium">تاریخ</th>
            <th className="py-4 px-6 text-right font-medium">موضوع</th>
            <th className="py-4 px-6 text-right font-medium">نتیجه</th>
            <th className="py-4 px-6 text-right font-medium">کارشناس</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-[#F8FBFE] transition-colors">
            <td className="py-4 px-6">۱۴۰۲/۰۸/۱۵</td>
            <td className="py-4 px-6">پیگیری سفارش</td>
            <td className="py-4 px-6">موفق</td>
            <td className="py-4 px-6">علی محمدی</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );

  const PurchaseHistory = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white p-4 rounded-lg shadow-sm border border-[#6FBDF5]/20"
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[#6FBDF5]">
              سفارش #{item}
            </span>
            <span className="text-[#6FBDF5]">۱,۲۰۰,۰۰۰ تومان</span>
          </div>
          <div className="text-gray-600 mt-2">تاریخ: ۱۴۰۲/۰۸/۱۵</div>
          <div className="text-gray-600">وضعیت: تکمیل شده</div>
        </div>
      ))}
    </motion.div>
  );

  const Comments = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <textarea
          placeholder="نظر خود را وارد کنید..."
          className="w-full p-3 text-black border-2 border-[#6FBDF5] rounded-lg focus:outline-none focus:border-[#5CA8E0] h-32"
        />
        <button className="mt-2 bg-[#6FBDF5] text-white px-4 py-2 rounded-lg hover:bg-[#5CA8E0] transition-colors">
          ثبت نظر
        </button>
      </div>

      {/* Previous comments */}
      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="bg-white p-4 rounded-lg shadow-sm border border-[#6FBDF5]/20"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-black">کارشناس فروش</span>
              <span className="text-[#6FBDF5] text-sm">۱۴۰۲/۰۸/۱۵</span>
            </div>
            <p className="text-gray-700">نظر کاربر در مورد محصول یا خدمات</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Tab.Group onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 justify-center items-center rounded-2xl bg-white p-2 shadow-lg">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-xl lg:py-3 py-1 px-1 text-nowrap text-xs md:text-sm font-medium leading-5 flex items-center justify-center gap-3 transition-all duration-300 ease-in-out
              ${
                selected
                  ? "bg-[#6FBDF5] text-white shadow-md transform scale-105"
                  : "text-[#5CA8E0] hover:bg-[#E8F4FE] hover:text-[#4A96CE]"
              }`
              }
            >
              {tab.icon}
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <Tab.Panels>
            <Tab.Panel
              key="personal-info"
              className={selectedTab === 0 ? "block" : "hidden"}
            >
              <PersonalInfo />
            </Tab.Panel>
            <Tab.Panel
              key="calls-list"
              className={selectedTab === 1 ? "block" : "hidden"}
            >
              <CallsList />
            </Tab.Panel>
            <Tab.Panel
              key="purchase-history"
              className={selectedTab === 2 ? "block" : "hidden"}
            >
              <PurchaseHistory />
            </Tab.Panel>
            <Tab.Panel
              key="comments"
              className={selectedTab === 3 ? "block" : "hidden"}
            >
              <Comments />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default FileInput;
