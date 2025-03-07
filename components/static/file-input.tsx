"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaUser, FaPhone, FaHistory, FaComments } from "react-icons/fa";
import callLog from "@/models/callLog";
import moment from "moment-jalaali";
import { AddCall } from "../addCall";
import { BsTelephone } from "react-icons/bs";

interface Customer {
  _id?: string;
  name?: string;
  phones?: string[];
  city?: string;
  address?: string;
  comments?: string[];

}

interface CallLog {
  created: string;
  type: string;
  user: {
    name: string;
    _id: string;
    phoneNumber?: string;
    role?: string;
  };
  customer: {
    _id: string;
    name: string;
    phones: string[];
    city: string;
  }
}

const FileInput = (InitialId:any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    type: 'individual'
  });
    console.log(InitialId.id,"InitialId");
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    user: '',
    customer: {
      name: '' as string,
      phones: ["", ""] as string[],
      _id: '' as string,
      comments: [] as string[],
      city: '' as string,
      address: '' as string,
    },
    comments: [] as string[],
    type: 'priceAsker',
    followUp: [{
      date: '',
      info: '',
      time: ''
    }]
  });
  const tabs = [
    { name: "اطلاعات شخصی", icon: <FaUser /> },
    { name: "جزئیات مشتری", icon: <FaUser /> },
    { name: "لیست تماس", icon: <FaPhone /> },
    { name: "سابقه خرید", icon: <FaHistory /> },
    { name: "نظرات", icon: <FaComments /> },
  ];
  
  const handleAddCustomer = async () => {
   
    try {
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name: newCustomer.name,
            type: newCustomer.type
          }
        ),
      });

      if (response.ok) {
        const data = await response.json();
        // Update customers list
        setCustomers([...customers, data.customer]);
        // Reset form
        setNewCustomer({ name: '', type: 'individual' });
        // Set the new customer as selected
        setFormData({
          ...formData,
          customer: {
            name: data.customer.name,
            phones: data.customer.phones || ["", ""],
            _id: data.customer._id,
            comments: data.customer.comments || [],
            city: data.customer.city || '',
            address: data.customer.address || ''
          }
        });
        filteredCustomers.push(data.customer);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch('/api/customer');
      const data = await response.json();
      setCustomers(data.customer);
    };
    fetchCustomer();
    const userId = localStorage.getItem('user');

  }, []);
  const fetchInitialData = async () => {
    try {
      const customer = formData.customer._id;

      const headers = {
        "Content-Type": "application/json",
        customer: customer,
      };

      const response = await fetch("/api/callLog/customerId", { headers });
      const data = await response.json();
      setCalls(data.callLog);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {

    fetchInitialData();
  }, [formData]);
useEffect(() => {
  
  if (InitialId.id) {
    const fetchInitialCustomer = async () => {
      try {
        const response = await fetch(`/api/customer/id`, {
          headers: {
            'Content-Type': 'application/json',
            'id': InitialId.id
          }
        })
        
        const data = await response.json();
        console.log(data,"data");
        // Access the customer data directly from data
        setFormData({
          ...formData,
          customer: {
            name: data.costumer.name || '',
            phones: data.costumer.phones || ["", ""],
            _id: data.costumer._id || '',
            comments: data.costumer.comments || [],
            city: data.costumer.city || '',
            address: data.costumer.address || ''
          }
        });
      } catch (error) {
        console.error("Error fetching initial customer:", error);
      }
    };

    fetchInitialCustomer();
  }
}, [InitialId.id]);

  

  
  const filteredCustomers = customers.filter((customer: any) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phones.some((phone: string) => phone.includes(searchTerm)) ||
    (customer.city && customer.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const CustomerDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {formData.customer._id && (
        <div className="bg-[#F8FBFE] p-6 rounded-xl border-2 border-[#E8F4FE]">
          <h3 className="text-xl font-bold mb-6">اطلاعات تفصیلی مشتری</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 flex items-center gap-2">
                <span className="font-semibold">نام:</span> 
                {formData.customer.name}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <span className="font-semibold">تلفن:</span> 
                {formData.customer.phones?.join(', ')}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 flex items-center gap-2">
                <span className="font-semibold">شهر:</span> 
                {formData.customer.city}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <span className="font-semibold">آدرس:</span> 
                {formData.customer.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
  
  const PersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full h-[50vh] overflow-y-auto">
     
      <div className="space-y-2">
        <label className="block text-gray-700">انتخاب مشتری</label>
        <div className="relative">
          <input
            type="text"
            placeholder="جستجوی مشتری..."
            onBlur={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 mb-2 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
            autoComplete="off"
          />

          <select
            value={formData.customer._id}
            onChange={(e) => {
              const selected = customers.find(c => c._id === e.target.value);
              if (selected) {
                setFormData({
                  ...formData,
                  customer: {
                    name: selected.name || '',
                    phones: selected.phones || ["", ""],
                    _id: selected._id || '',
                    comments: selected.comments || [''],
                    city: selected.city || '',
                    address: selected.address || ''
                  }
                });
                console.log(selected);

              }
            }}
            className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
          >
            <option value="">انتخاب کنید</option>
            {filteredCustomers.map((customer) => (
              <option key={customer._id} value={customer._id} >
                {`نام:${customer.name} | تلفن: ${customer?.phones?.join(', ')} | شهر: ${customer.city || '-'}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-4 bg-[#F8FBFE] p-4 rounded-xl border-2 border-[#E8F4FE]">
        <h3 className="text-lg font-bold">افزودن مشتری جدید</h3>

        <input
          type="text"
          placeholder={newCustomer.name ? newCustomer.name : "نام مشتری"}
          onBlur={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-white"
        />
        <select
          value={newCustomer.type}
          onChange={(e) => setNewCustomer({ ...newCustomer, type: e.target.value })}
          className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-white"
        >
          <option value="individual">شخص حقیقی</option>
          <option value="company">شرکت</option>
          <option value="presenter">نماینده</option>
        </select>
        <button
          onClick={handleAddCustomer}
          className="w-full bg-[#6FBDF5] text-white py-3 rounded-xl hover:bg-[#5CA8E0] transition-all"
        >
          ثبت مشتری جدید
        </button>
      </div>
      
    </div>
  );

  /**
   * Renders a list of call logs with the ability to add a new call.
   * 
   * @param calls - An array of call log objects.
   * @returns A React component that displays the call log list and a button to add a new call.
   */
  const CallsList = ({ calls }: { calls: CallLog[] }) => {
    const [isAddingCall, setIsAddingCall] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto"
      >
        {isAddingCall ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg "
          >
            <div className="flex justify-between items-center  border-b ">

              <button
                onClick={() => {
                  setIsAddingCall(false)
                  fetchInitialData();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                بازگشت
              </button>
            </div>
            <AddCall customer={formData.customer._id} />
          </motion.div>
        ) : (
          <>
            <table className="min-w-full text-black bg-white rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-[#6FBDF5] text-white">
                <tr>
                  <th className="py-4 px-6 text-right font-medium">تاریخ</th>
                  <th className="py-4 px-6 text-right font-medium">موضوع</th>
                  <th className="py-4 px-6 text-right font-medium">کارشناس</th>
                  <th className="py-4 px-6 text-right font-medium">شهر</th>
                </tr>
              </thead>
              <tbody>
                {calls && calls.length > 0 ? (
                  calls.map((call, index) => (
                    <tr key={index} className="border-b hover:bg-[#F8FBFE] transition-colors">
                      <td className="py-4 px-6">
                        {moment(call.created).format('jYYYY/jMM/jDD ')}
                      </td>
                      <td className="py-4 px-6">{call.type === "order" ? 'سفارش ' : call.type === "priceAsker" ? 'قیمت گیری' : 'پشتیبانی'}</td>
                      <td className="py-4 px-6">{call.user?.name}</td>
                      <td className="py-4 px-6">{call.customer?.city}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 px-6 text-center text-gray-500">
                      هیچ تماسی ثبت نشده است
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <motion.button

              onClick={() => setIsAddingCall(true)}
              className="mt-4 bg-[#6FBDF5] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-[#5CA8E0] transition-all flex items-center gap-2"
            >
              <BsTelephone size={20} />
              ثبت تماس جدید
            </motion.button>
          </>
        )}
      </motion.div>
    );
  }

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

  const Comments = () => {
    const [newComment, setNewComment] = useState("");

    const handleSubmitComment = async () => {
      if (!newComment.trim()) return;

      try {
        const updatedComments = [...(formData.customer.comments || []), newComment];

        const response = await fetch(`/api/customer/id`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'id': formData.customer._id
          },
          body: JSON.stringify({
            comments: updatedComments
          }),
        });

        if (response.ok) {
          setFormData({
            ...formData,
            customer: {
              ...formData.customer,
              comments: updatedComments
            }
          });
          setNewComment("");
        }
      } catch (error) {
        console.error("Error updating comments:", error);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را وارد کنید..."
            className="w-full p-3 text-black border-2 border-[#6FBDF5] rounded-lg focus:outline-none focus:border-[#5CA8E0] h-32"
          />
          <button
            onClick={handleSubmitComment}
            className="mt-2 bg-[#6FBDF5] text-white px-4 py-2 rounded-lg hover:bg-[#5CA8E0] transition-colors"
          >
            ثبت نظر
          </button>
        </div>

        <div className="space-y-4 flex flex-col gap-4">
          {formData.customer?.comments?.map((comment, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-[#6FBDF5]/20"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-black">نظر {index + 1}</span>

              </div>
              <p className="text-gray-700">{comment}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 max-h-[80vh] overflow-y-auto" dir="rtl">
      <Tab.Group onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 justify-center items-center rounded-2xl bg-white p-2 shadow-lg">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-xl lg:py-3 py-1 px-1 text-nowrap text-xs md:text-sm font-medium leading-5 flex items-center justify-center gap-3 transition-all duration-300 ease-in-out
              ${selected
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
    key="customer-details"
    className={selectedTab === 1 ? "block" : "hidden"}
  >
    <CustomerDetails />
  </Tab.Panel>
  <Tab.Panel
    key="calls-list"
    className={selectedTab === 2 ? "block" : "hidden"}
  >
    <CallsList calls={calls} />
  </Tab.Panel>
            <Tab.Panel
              key="purchase-history"
              className={selectedTab === 3 ? "block" : "hidden"}
            >
              <PurchaseHistory />
            </Tab.Panel>
            <Tab.Panel
              key="comments"
              className={selectedTab === 4 ? "block" : "hidden"}
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
