"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BsCartCheck, BsTelephone, BsTelephoneForward } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineAim } from "react-icons/ai";
import DefaultDashboard from "./default-saler";
import { Costumers } from "./costumers";
import SalerTargets from "./targets";
import { CallsList } from "@/components/callsList";

const SalerForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("");
  const [closedWidth, setClosedWidth] = useState("50px");
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const menuItems = [
    { id: "dashboard", icon: <MdDashboard size={23} />, title: "داشبورد" },
    {
      id: "customers",
      icon: <FaUserFriends size={23} />,
      title: "لیست مشتریان",
    },
    { id: "orders", icon: <BsCartCheck size={23} />, title: "سفارشات" },
    {
      id: "transactions",
      icon: <BsTelephone size={23} />,
      title: "ثبت تماس ها",
    },
    {
      id: "reports",
      icon: <BsTelephoneForward size={23} />,
      title: "لیست تماس ها",
    },
    { id: "targets", icon: <AiOutlineAim size={23} />, title: "لیست اهداف" },
    { id: "settings", icon: <FiSettings size={23} />, title: "تنظیمات" },
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <DefaultDashboard />;
      case "sales":
        return null;
      case "analytics":
        return null;
      case "customers":
        return <Costumers />;
      case "targets":
        return <SalerTargets />;
      case "settings":
        return null;
        case "transactions":
            return null;
          case "reports":
            return <CallsList />;
    
      default:
        return <DefaultDashboard />;
    }
  };
  useEffect(() => {
    // Move window check inside useEffect which only runs client-side
    setClosedWidth(window.innerWidth >= 1024 ? "50px" : "0px");

    const handleResize = () => {
      setClosedWidth(window.innerWidth >= 1024 ? "50px" : "0px");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex" dir="rtl">
      <motion.div
        animate={{ width: isOpen ? "200px" : closedWidth }}
        className={`min-h-screen bg-[#6FBDF5] ${
          isOpen ? "backdrop-blur-sm bg-opacity-80" : ""
        } z-[9999] text-white py-3 fixed ${
          !isOpen && window.innerWidth < 1024 ? "pointer-events-none" : ""
        }`}
      >
        <motion.div
          animate={isOpen ? { x: 0 } : { x: -10 }}
          className="absolute cursor-pointer left-[-20px] top-3 w-8 h-8 bg-white rounded-full flex items-center justify-center pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenuAlt3 size={20} color="#6FBDF5" />
        </motion.div>

        <div className="mt-10">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className={`flex items-center relative cursor-pointer hover:bg-white/10 py-3 px-3 ${
                activeComponent === item.id ? "bg-white/10" : ""
              }`}
              onClick={() => setActiveComponent(item.id)}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                animate={
                  isOpen
                    ? { opacity: 1, display: "block" }
                    : {
                        opacity: isLargeScreen ? 1 : 0,
                        display: isLargeScreen ? "block" : "none",
                      }
                }
                className={`text-white peer`}
              >
                {item.icon}
              </motion.span>

              <motion.span
                animate={
                  isOpen
                    ? { opacity: 1, display: "block" }
                    : { opacity: 0, display: "none" }
                }
                className="mr-4 whitespace-break-spaces"
              >
                {item.title}
              </motion.span>

              {/* Custom Tooltip */}
              {!isOpen && (
                <div className="absolute right-[60px] hidden md:block bg-[#6FBDF5] px-3 py-2 rounded-md opacity-0 invisible peer-hover:opacity-100 peer-hover:visible transition-all duration-300 whitespace-nowrap z-50 before:content-[''] before:absolute before:top-[50%] before:right-[-5px] before:translate-y-[-50%] before:border-[6px] before:border-transparent before:border-l-[#6FBDF5]">
                  {item.title}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex-1 p-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsOpen(false)}
        >
          {renderComponent()}
        </motion.div>
      </div>
    </div>
  );
};

export default SalerForm;
