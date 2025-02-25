"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select from "react-select";
import {
  FiTarget,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiPackage,
  FiUser,
} from "react-icons/fi";

interface DisplayTarget extends Omit<TargetFormData, "customer"> {
  _id: string;
  customer: Customer;
}

interface User {
  _id: string;
  name: string;
  role: string;
}

interface Customer {
  _id: string;
  name: string;
  company: string;
}

interface TargetFormData {
  saler: string[]; // Changed from string to string[]
  customer: string;
  startDate: string;
  endDate: string;
  amount: string;
  price: string;
  city: string;
  product: string[];
  supervisor: string;
}

const DefinitionTarget = () => {
  const [salers, setSalers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [postedTargets, setPostedTargets] = useState<DisplayTarget[]>([]);
  const [salersLoading, setSalersLoading] = useState(true);

  const [formData, setFormData] = useState<TargetFormData>({
    saler: [],
    customer: "",
    startDate: "",
    endDate: "",
    amount: "",
    price: "",
    city: "",
    product: [],
    supervisor: localStorage.getItem("user") || "",
  });
  const fetchPostedTargets = async () => {
    try {
      const response = await fetch("/api/targets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setPostedTargets(data.target || []);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  useEffect(() => {
    fetchPostedTargets();
  }, []);

  useEffect(() => {
    // Fetch salers, customers and products data
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          id: userId || "",
        };
        setSalersLoading(true);

        // Updated API endpoints to match your backend routes
        const [salersRes, customersRes] = await Promise.all([
          fetch("/api/auth", {
            method: "GET",
            headers,
          }),
          fetch("/api/customer", {
            method: "GET",
            headers,
          }),
        ]);

        // Check responses individually for better error handling
        if (!salersRes.ok) {
          throw new Error(`Salers API failed: ${salersRes.status}`);
        }
        if (!customersRes.ok) {
          throw new Error(`Customers API failed: ${customersRes.status}`);
        }

        const salersData = await salersRes.json();
        const customersData = await customersRes.json();

        // Set state with validated data
        setSalers(salersData?.users || []);
        setSalersLoading(false);


        setCustomers(customersData?.customer || []);

        setProducts(["Product 1", "Product 2"]); // Temporary static products until API is ready
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // Set empty arrays as fallback
        setSalers([]);
        setCustomers([]);
        setProducts([]);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/targets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(formData, "formData");

        setSuccess(true);
        setFormData({
          saler: [],
          customer: "",
          startDate: "",
          endDate: "",
          amount: "",
          price: "",
          city: "",
          product: [],
          supervisor: localStorage.getItem("user") || "",
        });

        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting target:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          تعریف هدف جدید
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer border-b pb-2 mb-2">
                <input
                  type="checkbox"
                  checked={formData.saler.length === salers.length}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      saler: e.target.checked ? salers.map((s) => s._id) : [],
                    }));
                  }}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-bold">انتخاب همه</span>
              </label>

              {salersLoading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                salers.map((saler) => (
                  <label
                    key={saler._id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={saler._id}
                      checked={formData.saler.includes(saler._id)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          saler: e.target.checked
                            ? [...prev.saler, value]
                            : prev.saler.filter((id) => id !== value),
                        }));
                      }}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{saler.name}</span>
                  </label>
                ))
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مشتری
              </label>
              <Select
                options={customers.map((customer) => ({
                  value: customer._id,
                  label: customer.name,
                }))}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    customer: selected?.value || "",
                  }))
                }
                placeholder="انتخاب مشتری"
                className="text-right text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاریخ شروع
              </label>
              <DatePicker
                value={formData.startDate}
                onChange={(date) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: date?.toString() || "",
                  }))
                }
                calendar={persian}
                locale={persian_fa}
                className="w-full text-black"
                containerClassName="text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاریخ پایان
              </label>
              <DatePicker
                value={formData.endDate}
                onChange={(date) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: date?.toString() || "",
                  }))
                }
                calendar={persian}
                locale={persian_fa}
                className="w-full text-black"
                containerClassName="text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مقدار هدف
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
                className="w-full px-4 py-2 text-black rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                قیمت (تومان)
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full px-4 py-2 text-black rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                شهر
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                className="w-full px-4 py-2 text-black rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                محصولات
              </label>
              <Select
                isMulti
                options={products.map((product) => ({
                  value: product,
                  label: product,
                }))}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    product: selected.map((item) => item.value),
                  }))
                }
                placeholder="انتخاب محصولات"
                className="text-right text-black"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg text-white font-medium
                ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
                transition-colors duration-200`}
            >
              {loading ? "در حال ثبت..." : "ثبت هدف"}
            </motion.button>
          </div>
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg"
              >
                هدف با موفقیت ثبت شد
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            اهداف ثبت شده
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postedTargets.map((target) => (
              <motion.div
                key={target._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FiTarget className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {target.customer.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {target.customer.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2 gap-2 text-gray-600">
                  <FiUser className="w-4 h-4" />
                  <div className="flex flex-wrap gap-2">
                    {salers
                      .filter((s) => target.saler.includes(s._id))
                      .map((saler, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded-full"
                        >
                          {saler.name}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiCalendar className="w-4 h-4" />
                    <span className="text-sm">
                      {target.startDate}
                      تا
                      {target.endDate}{" "}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FiDollarSign className="w-4 h-4" />
                    <span className="text-sm">
                      {Number(target.price).toLocaleString()} تومان
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="w-4 h-4" />
                    <span className="text-sm">{target.city}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPackage className="w-4 h-4" />
                    <div className="flex flex-wrap gap-2">
                      {target.product.map((prod, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DefinitionTarget;
