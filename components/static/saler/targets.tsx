"use client";
import { useEffect, useState } from "react";
import DynamicTable from "@/components/global/tables";
import { motion } from "framer-motion";

interface Target {
  _id: string;
  customer: {
    name: string;
    company: string;
  };
  startDate: string;
  endDate: string;
  amount: string;
  price: string;
  city: string;
  product: string[];
}

const SalerTargets = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTargets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/targets/id", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          id: token || "", // Add the id header required by your API route
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTargets(data.target);
    } catch (error) {
      console.log("Error fetching targets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  const columns = [
    {
      key: "customer.name",
      header: "نام مشتری",
      sortable: true,
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: "customer.company",
      header: "شرکت",
      sortable: true,
    },
    {
      key: "startDate",
      header: "تاریخ شروع",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString("fa-IR"),
    },
    {
      key: "endDate",
      header: "تاریخ پایان",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString("fa-IR"),
    },
    {
      key: "amount",
      header: "مقدار هدف",
      sortable: true,
      render: (value: string) => (
        <span className="text-blue-600 font-medium">{value}</span>
      ),
    },
    {
      key: "price",
      header: "قیمت",
      sortable: true,
      render: (value: string) => (
        <span className="text-green-600 font-medium">
          {Number(value).toLocaleString()} تومان
        </span>
      ),
    },
    {
      key: "city",
      header: "شهر",
      sortable: true,
    },
    {
      key: "product",
      header: "محصولات",
      render: (value: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {value.map((product, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
            >
              {product}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:mr-12 mr-0"
    >
      <div className="mb-8 mr-12 p-6">
        <h1 className="text-2xl font-bold text-gray-800">اهداف فروش</h1>
        <p className="text-gray-600 mt-2">
          لیست اهداف تعیین شده برای شما توسط سرپرست
        </p>
      </div>

      <DynamicTable
        columns={columns}
        data={targets.map((target) => ({ ...target, date: target.startDate }))}
        loading={loading}
        onSort={(key, direction) => {
          console.log("Sorting by:", key, direction);
        }}
      />
    </motion.div>
  );
};

export default SalerTargets;
