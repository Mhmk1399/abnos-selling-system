"use client";
import DynamicTable from "@/components/global/tables";
import IranMap from "./IranMap";
import { useState } from "react";

interface CityData {
  city: string;
  sales: number;
  customers: number;
  coordinates: [number, number];
  personal: number;
  corporate: number;
  agent: number;
  invoiceCount: number;
  date?: string; // Added date property
}

interface ProductData {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  lastUpdate: string;
  sales: number;
  customers: number;
  invoiceCount: number;
}

const cityData: CityData[] = [
  {
    city: "Tehran",
    sales: 15930000,
    customers: 1200,
    coordinates: [51.389, 35.6892],
    personal: 800,
    corporate: 300,
    agent: 100,
    invoiceCount: 200,
    date: "2023-01-01", // Added sample date
  },
  {
    city: "Esfahan",
    sales: 8000000,
    customers: 650,
    coordinates: [51.6676, 32.6539],
    personal: 400,
    corporate: 200,
    agent: 50,
    invoiceCount: 120,
    date: "2023-01-02", // Added sample date
  },
  {
    city: "Fars",
    sales: 600000,
    customers: 480,
    coordinates: [52.5319, 29.5926],
    personal: 300,
    corporate: 150,
    agent: 30,
    invoiceCount: 90,
    date: "2023-01-03", // Added sample date
  },
  {
    city: "Razavi Khorasan",
    sales: 900000,
    customers: 750,
    coordinates: [59.6168, 36.2605],
    personal: 500,
    corporate: 200,
    agent: 50,
    invoiceCount: 150,
    date: "2023-01-04", // Added sample date
  },
  {
    city: "East Azarbaijan",
    sales: 700000,
    customers: 520,
    coordinates: [46.2919, 38.08],
    personal: 350,
    corporate: 120,
    agent: 50,
    invoiceCount: 110,
    date: "2023-01-05", // Added sample date
  },
];

const products: ProductData[] = [
  {
    id: 1,
    name: "لپ تاپ گیمینگ MSI",
    category: "لپ تاپ",
    price: 45000000,
    stock: 15,
    sales: 8,
    rating: 4.5,
    lastUpdate: "1402/10/15",
    customers: 10,
    invoiceCount: 8
  },
  {
    id: 2,
    name: "گوشی سامسونگ S23",
    category: "موبایل",
    price: 32000000,
    stock: 25,
    sales: 12,
    rating: 4.8,
    lastUpdate: "1402/10/18",
    customers: 15,
    invoiceCount: 12
  },
  {
    id: 3,
    name: "هدفون بی سیم Sony",
    category: "صوتی",
    price: 8500000,
    stock: 40,
    sales: 22,
    rating: 4.3,
    lastUpdate: "1402/10/12",
    customers: 20,
    invoiceCount: 22
  },
  {
    id: 4,
    name: "تبلت اپل iPad Pro",
    category: "تبلت",
    price: 28000000,
    stock: 18,
    sales: 7,
    rating: 4.9,
    lastUpdate: "1402/10/20",
    customers: 8,
    invoiceCount: 7
  },
  {
    id: 5,
    name: "ساعت هوشمند Garmin",
    category: "پوشیدنی",
    price: 12000000,
    stock: 30,
    sales: 15,
    rating: 4.6,
    lastUpdate: "1402/10/14",
    customers: 18,
    invoiceCount: 15
  }
];

export default function MainCostumer() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const columns = [
    {
      key: "city",
      header: "شهر",
      sortable: true,
    },
    {
      key: "sales",
      header: "میزان فروش (ریال)",
      sortable: true,
      render: (value: number) => value.toLocaleString("fa-IR"),
    },
    {
      key: "customers",
      header: "تعداد مشتری",
      render: (value: number) => value.toLocaleString("fa-IR"),
    },
    {
      key: "personal",
      header: "مشتریان شخصی",
      sortable: true,
    },
    {
      key: "agent",
      header: "نمایندگان",
      sortable: true,
    },
    {
      key: "corporate",
      header: "شرکت ها",
      sortable: true,
    },
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    // Additional handling like filtering table data can be added here
  };

  return (
    <div className="flex flex-col gap-4 p-3 md:p-6 animate-fadeIn">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
        نقشه فروش کشوری
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="w-full lg:w-1/2 bg-white rounded-xl transform hover:scale-[1.02] transition-transform duration-300">
          <IranMap data={cityData} onCitySelect={handleCitySelect} />
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-xl p-2 md:p-4 transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-800 text-center">
            اطلاعات فروش شهرها
          </h2>
          <div className="overflow-x-auto">
            <DynamicTable
              columns={columns}
              data={cityData}
              onSort={(key, direction) => console.log("Sort:", key, direction)}
              onFilter={(filters) => console.log("Filters:", filters)}
            />
            <DynamicTable
              columns={columns}
              data={products}
              onSort={(key, direction) => console.log("Sort:", key, direction)}
              onFilter={(filters) => console.log("Filters:", filters)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
