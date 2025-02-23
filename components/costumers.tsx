"use client";
import React, { useState, useEffect } from "react";
import DynamicTable from "./global/tables";
import { motion } from "framer-motion";

export const Costumers = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phones: [""],
    type: "individual",
    address: [""],
    city: "",
    personalInfo: [""],
    comments: [""],
  });

  const columns = [
    { key: "name", header: "نام", sortable: true },
    { key: "phones", header: "شماره تماس", sortable: true },
    { key: "type", header: "نوع مشتری", sortable: true },
    { key: "city", header: "شهر", sortable: true },
    { key: "created", header: "تاریخ ثبت", sortable: true },
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch("/api/customer");
    const data = await response.json();
    setCustomers(data.customer);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      await fetchCustomers();
      setActiveTab("list");
      setFormData({
        name: "",
        phones: [""],
        type: "individual",
        address: [""],
        city: "",
        personalInfo: [""],
        comments: [""],
      });
    }
  };
  console.log(customers , "ggggggggggggggggggg");
  

  const renderContent = () => {
    switch (activeTab) {
      case "add":
        return (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 bg-white rounded-xl shadow-lg  mr-auto"
          >
            <div>
              <label className="block text-gray-700 mb-2">نام مشتری</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">شماره تماس</label>
              <input
                type="text"
                value={formData.phones[0]}
                onChange={(e) =>
                  setFormData({ ...formData, phones: [e.target.value] })
                }
                className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">نوع مشتری</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5]"
              >
                <option value="individual">شخصی</option>
                <option value="company">شرکت</option>
                <option value="presenter">معرف</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">شهر</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">آدرس</label>
              <input
                type="text"
                value={formData.address[0]}
                onChange={(e) =>
                  setFormData({ ...formData, address: [e.target.value] })
                }
                className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5]"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#6FBDF5] text-white py-3 rounded-xl hover:bg-[#5CA8E0] transition-colors"
            >
              ثبت مشتری
            </motion.button>
          </form>
        );
      case "list":
        return (
          customers?.length > 0 && (
            <DynamicTable columns={columns} data={customers} />
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 w-11/12 mr-auto" dir="rtl">
      <div className="flex gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab("list")}
          className={`px-6 py-3 rounded-xl transition-colors ${
            activeTab === "list" ? "bg-[#6FBDF5] text-white" : "bg-gray-100"
          }`}
        >
          لیست مشتریان
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab("add")}
          className={`px-6 py-3 rounded-xl transition-colors ${
            activeTab === "add" ? "bg-[#6FBDF5] text-white" : "bg-gray-100"
          }`}
        >
          افزودن مشتری
        </motion.button>
      </div>
      {renderContent()}
    </div>
  );
};
