"use client";
import DynamicTable from "@/components/global/tables";
import IranMap from "./IranMap";
import { useState } from "react";
import StyledTable from "./conditionalDynamicTable";

interface CityData {
  city: string;
  sales: number;
  customers: number;
  coordinates: [number, number];
  personal: number;
  corporate: number;
  agent: number;
  invoiceCount: number;
  date: string; // Added date property
}
interface CityData1 {
  name: string;
  sales: number;
  customers: number;
  producta: number;
  productb: number;
  productc: number;

  invoiceCount: number;
  date: string; // Added date property
}
interface StyleRule {
  condition: (value: any) => boolean;
  className: string;
}
interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
  styleRules?: StyleRule[];
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

const cityData1: CityData1[] = [
  {
    name: "علی",
    sales: 15930000,
    customers: 650,

    producta: 800,
    productb: 300,
    productc: 100,
    invoiceCount: 200,
    date: "2023-01-01", // Added sample date
  },
  {
    name: "شرکت اخوان",
    sales: 8000000,
    customers: 650,
    producta: 800,
    productb: 300,
    productc: 100,
    invoiceCount: 120,
    date: "2023-01-02", // Added sample date
  },
  {
    name: "مهدی",
    sales: 600000,
    customers: 480,
    producta: 800,
    productb: 300,
    productc: 100,
    invoiceCount: 90,
    date: "2023-01-03", // Added sample date
  },
  {
    name: "محمد",
    sales: 900000,
    customers: 750,
    producta: 800,
    productb: 300,
    productc: 100,
    invoiceCount: 150,
    date: "2023-01-04", // Added sample date
  },
  {
    name: "نماینده شرق",
    sales: 700000,
    customers: 520,
    producta:325,
    productb:234,
    productc:22,
    invoiceCount: 110,
    date: "2023-01-05", // Added sample date
  },
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
  const salesColumns: Column[] = [
    {
      key: "name",
      header: "مشتریان",
      sortable: true,
    },
    {
      key: "sales",
      header: "میزان فروش",
      sortable: true,
      styleRules: [
        {
          condition: (value) => value < 700000,
          className: "text-red-600 bg-red-50",
        },
        {
          condition: (value) => value >= 700000 && value <= 900000,
          className: "text-yellow-600 bg-yellow-50",
        },
        {
          condition: (value) => value > 900000,
          className: "text-green-600 bg-green-50",
        },
      ],
      render: (value) => value.toLocaleString("fa-IR"),
    },

    {
      key: "invoiceCount",
      header: "تعداد فاکتور",
      styleRules: [
        {
          condition: (value) => value < 100,
          className: "text-red-600 bg-red-50",
        },
        {
          condition: (value) => value >= 100 && value <= 150,
          className: "text-yellow-600 bg-yellow-50",
        },
        {
          condition: (value) => value > 150,
          className: "text-green-600 bg-green-50",
        },
      ],
    },
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    // Additional handling like filtering table data can be added here
  };

  return (
    <div className="flex flex-col gap-4   sm:m-0 md:p-6 animate-fadeIn">
      <h1 className="text-xl justify-center text-center lg:mb-8 sm:m-16 md:text-2xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
        نقشه فروش کشوری
      </h1>
      <div className="flex flex-col justify-center mx-auto gap-4 ">
        <div className="w-full justify-center mx-auto  rounded-xl transform hover:scale-[1.02] transition-transform duration-300">
          <IranMap data={cityData} onCitySelect={handleCitySelect} />
        </div>
        <div className="w-full bg-transparent rounded-xl p-2 md:p-4 transform hover:scale-[1.02] transition-transform duration-300">
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
          </div>
        </div>
      </div>

      {/* New full-width section for StyledTable */}
      <div className="w-full bg-white justify-center  rounded-xl p-2 md:p-4 transform hover:scale-[1.02] transition-transform duration-300">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-800 text-center justify-center">
          جدول فروش با فیلتر زمانی
        </h2>
        <StyledTable columns={salesColumns} data={cityData1} />
      </div>
    </div>
  );
}
