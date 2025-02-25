"use client";
import { useEffect, useState } from "react";
import moment from "jalali-moment";
import StyledTable from "@/components/manager/costumers/conditionalDynamicTable";

interface Customer {
  _id: string;
  name: string;
  city: string;
  type: string;
  invoices: string[];
  created: string;
}

const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customer", {
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("user") || "",
        },
      });
      const data = await response.json();
      setCustomers(data.customer);
    } catch (error) {
      console.error("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    {
      key: "name",
      header: "نام مشتری",
      sortable: true,
    },
    {
      key: "city",
      header: "شهر",
      sortable: true,
    },
    {
      key: "type",
      header: "نوع",
      sortable: true,
      render: (value: string) => {
        const typeMap = {
          individual: "شخصی",
          company: "شرکتی",
          presenter: "معرف",
        };
        return typeMap[value as keyof typeof typeMap] || value;
      },
      styleRules: [
        {
          condition: (value: string) => value === "company",
          className: "text-blue-600 font-semibold",
        },
        {
          condition: (value: string) => value === "presenter",
          className: "text-green-600 font-semibold",
        },
      ],
    },
    {
      key: "purchaseCount",
      header: "تعداد خرید",
      sortable: true,
      render: (value: number) => value.toLocaleString("fa-IR"),
    },
    {
      key: "totalPurchase",
      header: "مبلغ خرید",
      sortable: true,
      render: (value: number) => `${value.toLocaleString("fa-IR")} تومان`,
      styleRules: [
        {
          condition: (value: number) => value > 1000000,
          className: "text-green-600 font-bold",
        },
      ],
    },
    {
      key: "lastPurchaseDate",
      header: "تاریخ آخرین خرید",
      sortable: true,
      render: (value: string) => {
        const date = moment(value).locale("fa").format("YYYY/MM/DD");
        const daysAgo = moment().diff(moment(value), "days");
        return (
          <div className="flex flex-col">
            <span>{date}</span>
            <span className="text-xs text-gray-500">
              {daysAgo === 0
                ? "امروز"
                : daysAgo === 1
                ? "دیروز"
                : `${daysAgo} روز پیش`}
            </span>
          </div>
        );
      },
      styleRules: [
        {
          condition: (value: string) =>
            moment().diff(moment(value), "days") <= 7,
          className: "text-green-600",
        },
        {
          condition: (value: string) =>
            moment().diff(moment(value), "days") > 30,
          className: "text-red-600",
        },
      ],
    },
  ];

  const transformedData = customers.map((customer) => ({
    ...customer,
    purchaseCount: customer.invoices.length,
    totalPurchase: Math.floor(Math.random() * 10000000), // Replace with actual calculation
    lastPurchaseDate: customer.created,
  }));

  return (
    <div className="md:p-6 md:mr-12">
      <h2 className="text-2xl font-bold pr-12 text-gray-800 mb-2">
        لیست مشتریان
      </h2>
      <p className="pr-12 text-gray-600">
        تعداد کل مشتریان: {customers.length} نفر
      </p>
      <StyledTable data={transformedData} columns={columns} />
    </div>
  );
};

export default CustomersList;
