import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch, FiUser, FiPhone, FiCalendar } from "react-icons/fi";
import { CSSObjectWithLabel } from "react-select";
import { ControlProps, OptionProps } from "react-select";

interface SelectStyles {
  control: (
    base: CSSObjectWithLabel,
    state: ControlProps<RoleOption, false>
  ) => CSSObjectWithLabel;
  option: (
    base: CSSObjectWithLabel,
    state: OptionProps<RoleOption, false>
  ) => CSSObjectWithLabel;
}
interface User {
  _id: string;
  name: string;
  role: string;
  phoneNumber?: string;
  created: Date;
}

interface RoleOption {
  value: "saler" | "supervisor" | "manager" | "superAdmin";
  label: string;
}
interface PendingChange {
  userId: string;
  newRole: string;
}
const RoleChanger: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([]);

  const customSelectStyles: SelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "white",
      borderColor: "#E2E8F0",
      borderRadius: "0.75rem",
      padding: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#CBD5E0",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3B82F6"
        : state.isFocused
        ? "#EFF6FF"
        : "white",
      color: state.isSelected ? "white" : "#1F2937",
    }),
  };
  const roleOptions: RoleOption[] = [
    { value: "saler", label: "فروشنده" },
    { value: "supervisor", label: "سرپرست" },
    { value: "manager", label: "مدیر" },
    { value: "superAdmin", label: "مدیر ارشد" },
  ];

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id") || "",
        },
      });
      if (response.ok) {
        toast.info("کاربران با موفقیت دریافت شدند");
      }
      const data = await response.json();
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات کاربران");
      setLoading(false);
    }
  };

  // Update user role
  const handleRoleSelect = (userId: string, newRole: string) => {
    setPendingChanges((prev) => {
      const filtered = prev.filter((change) => change.userId !== userId);
      return [...filtered, { userId, newRole }];
    });
  };

  const handleSubmitChanges = async (userId: string) => {
    const change = pendingChanges.find((c) => c.userId === userId);
    if (!change) return;

    try {
      const response = await fetch(`/api/auth/id`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") || "",
          id: userId,
        },
        body: JSON.stringify({ role: change.newRole }),
      });

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: change.newRole } : user
          )
        );
        setPendingChanges((prev) => prev.filter((c) => c.userId !== userId));
        toast.success("نقش کاربر با موفقیت تغییر کرد");
      } else {
        throw new Error("Failed to update role");
      }
    } catch (error) {
      toast.error("خطا در بروزرسانی نقش کاربر");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber?.includes(searchQuery)
  );

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8" dir="rtl">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-[#5CA8E0] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            مدیریت نقش‌های کاربران
          </h2>
          <p className="text-blue-100 mt-2">
            تغییر و مدیریت دسترسی‌های کاربران سیستم
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="relative mb-8">
            <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو بر اساس نام یا شماره تماس..."
              className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-ping"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredUsers.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-blue-100 transition-all duration-200 p-6 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FiUser className="text-blue-500" />
                        <h3 className="font-semibold text-lg text-gray-800">
                          {user.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <FiPhone className="text-gray-400" />
                        <p className="text-sm">{user.phoneNumber}</p>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <FiCalendar className="text-gray-400" />
                        <p className="text-xs">
                          تاریخ ثبت:{" "}
                          {new Date(user.created).toLocaleDateString("fa-IR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-64">
                        <Select
                          options={roleOptions}
                          value={roleOptions.find((option) => {
                            const pendingChange = pendingChanges.find(
                              (c) => c.userId === user._id
                            );
                            return (
                              option.value ===
                              (pendingChange?.newRole || user.role)
                            );
                          })}
                          onChange={(option) =>
                            handleRoleSelect(user._id, option?.value || "saler")
                          }
                          isSearchable={false}
                          styles={customSelectStyles}
                          className="text-right"
                          classNamePrefix="select"
                        />
                      </div>
                      {pendingChanges.some(
                        (change) => change.userId === user._id
                      ) && (
                        <motion.button
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSubmitChanges(user._id)}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                          ثبت تغییرات
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RoleChanger;
