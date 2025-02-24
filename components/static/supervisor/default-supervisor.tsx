import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment-jalaali";
import Select, { MultiValue, SingleValue } from "react-select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaUserCircle } from "react-icons/fa";
import { BsCalendarEvent, BsTelephoneForward } from "react-icons/bs";
import { AiOutlineAim, AiOutlineGift } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import { BiFilterAlt } from "react-icons/bi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalerOption {
  value: string;
  label: string;
}

interface DateRangeOption {
  value: "week" | "month" | "custom";
  label: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
  }[];
}

const DefaultSupervisor: React.FC = () => {
  // const [currentTime, setCurrentTime] = useState<string>(
  //   moment().format("HH:mm:ss")
  // );
  const [username, setUsername] = useState<string>("سرپرست");
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSalers, setSelectedSalers] = useState<MultiValue<SalerOption>>(
    []
  );
  const [isHorizontal, setIsHorizontal] = useState(false);

  const [selectedDateRange, setSelectedDateRange] =
    useState<SingleValue<DateRangeOption>>(null);
  const [filteredData, setFilteredData] = useState<ChartData>({
    labels: [
      "علی محمدی",
      "سارا احمدی",
      "رضا کریمی",
      "مریم حسینی",
      "امیر رضایی",
    ],
    datasets: [
      {
        label: "عملکرد فروش",
        data: [65, 89, 45, 78, 92],
        backgroundColor: "#6FBDF5",
        borderRadius: 8,
      },
      {
        label: "تماس‌های موفق",
        data: [45, 67, 34, 56, 78],
        backgroundColor: "#4CAF50",
        borderRadius: 8,
      },
    ],
  });

  const currentDate = moment().format("jYYYY/jMM/jDD");

  const salerOptions: SalerOption[] = [
    { value: "all", label: "همه فروشندگان" },
    { value: "ali", label: "علی محمدی" },
    { value: "sara", label: "سارا احمدی" },
    { value: "reza", label: "رضا کریمی" },
    { value: "maryam", label: "مریم حسینی" },
    { value: "amir", label: "امیر رضایی" },
  ];

  const dateRangeOptions: DateRangeOption[] = [
    { value: "week", label: "هفته جاری" },
    { value: "month", label: "ماه جاری" },
    { value: "custom", label: "انتخاب بازه" },
  ];
  useEffect(() => {
    setIsHorizontal(window.innerWidth < 768);

    const handleResize = () => {
      setIsHorizontal(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: "0.5rem",
      border: "2px solid #6FBDF5",
      "&:hover": {
        border: "2px solid #5CA8E0",
      },
    }),
    option: (base: any, state: { isSelected: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected ? "#6FBDF5" : "white",
      "&:hover": {
        backgroundColor: "#E8F4FE",
      },
    }),
  };

  const chartOptions = {
    responsive: true,

    indexAxis: isHorizontal ? "y" : "x",
    plugins: {
      legend: {
        position: "top" as const,
        rtl: true,
        labels: {
          font: {
            family: "IRANSans",
          },
        },
      },
      title: {
        display: true,
        text: "عملکرد فروشندگان",
        font: {
          family: "IRANSans",
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    // const timer = setInterval(() => {
    //   setCurrentTime(moment().format("HH:mm:ss"));
    // }, 1000);

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
    // return () => clearInterval(timer);
  }, []);

  const handleFilter = () => {
    // Filter logic implementation
    const newData = { ...filteredData };
    // Update newData based on filters
    setFilteredData(newData);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedSalers, selectedDate, selectedDateRange]);

  const CustomDatePickerInput: React.FC<{
    openCalendar: () => void;
    value: string;
  }> = ({ openCalendar, value }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={openCalendar}
        className="w-full p-2 border-2 border-[#6FBDF5] rounded-lg text-right  text-black hover:bg-[#E8F4FE] transition-colors"
      >
        {value || "انتخاب تاریخ"}
      </motion.button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" min-h-screen md:mx-16 pb-16"
      dir="rtl"
    >
      {/* Header Section */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-4 left-4 z-10"
      >
        <div className="bg-white rounded-2xl shadow-sm p-2  flex items-center gap-4">
          <div className="bg-[#6FBDF5] rounded-full p-3">
            <FaUserCircle size={24} className="text-white" />
          </div>
          <div className="border-r-2 border-gray-100 pr-4">
            <div className="text-sm text-gray-500">خوش آمدید</div>
            <div className="font-bold text-gray-700">{username}</div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <BsCalendarEvent size={14} />
              <span>{currentDate}</span>
              {/* <span className="mx-2">|</span>
              <BsClock size={14} />
              <span>{currentTime}</span> */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chart Section */}
      <div className="mt-32  mb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white  p-6 rounded-xl shadow-lg"
        >
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select
              isMulti
              options={salerOptions}
              placeholder="انتخاب فروشنده"
              className="text-right text-black"
              styles={customSelectStyles}
              onChange={(selected) => setSelectedSalers(selected)}
            />

            {/* <Select
              options={dateRangeOptions}
              placeholder="بازه زمانی"
              className="text-right text-black"
              styles={customSelectStyles}
              onChange={(selected) => setSelectedDateRange(selected)}
            /> */}

            <DatePicker
              calendar={persian}
              locale={persian_fa}
              range
              className="rmdp-prime blue text-black placeholder:text-black"
              placeholder="انتخاب تاریخ"
              onChange={setSelectedDate}
              render={
                <CustomDatePickerInput
                  openCalendar={() => {}}
                  value={selectedDate}
                  key={selectedDate}
                />
              }
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFilter}
              className="flex items-center justify-center gap-2 bg-[#6FBDF5] text-white py-2 px-4 rounded-lg hover:bg-[#5CA8E0] transition-colors"
            >
              <BiFilterAlt size={20} />
              <span>اعمال فیلتر</span>
            </motion.button>
          </div>

          {/* Chart */}
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(filteredData)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[400px] sm:h-[600px] md:h-[500px] lg:w-1/2 lg:h-[400px] mx-auto md:mx-0"
            >
              <Bar
                data={filteredData}
                options={{
                  ...chartOptions,
                  maintainAspectRatio: false,
                  barThickness: window?.innerWidth < 768 ? 20 : 10,
                  categoryPercentage: 0.8,
                }}
              />{" "}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 bg-[#6FBDF5] text-white py-4 px-6 rounded-lg shadow-lg hover:bg-[#5CA8E0] transition-colors"
        >
          <AiOutlineAim size={20} />
          <span>لیست اهداف</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 bg-white text-[#6FBDF5] py-4 px-6 rounded-lg shadow-lg border-2 border-[#6FBDF5] hover:bg-[#6FBDF5] hover:text-white transition-colors"
        >
          <BsTelephoneForward size={20} />
          <span>لیست تماس‌ها</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 bg-white text-[#6FBDF5] py-4 px-6 rounded-lg shadow-lg border-2 border-[#6FBDF5] hover:bg-[#6FBDF5] hover:text-white transition-colors"
        >
          <AiOutlineGift size={20} />
          <span>تعریف پاداش</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DefaultSupervisor;
