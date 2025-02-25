import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsTelephone } from 'react-icons/bs';
interface AddCallProps {
    customer: string;
  }
  
  export const AddCall = ({ customer }: AddCallProps) => {
    // const [customers, setCustomers] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');
    const id=localStorage.getItem('user');
console.log(customer,"customer");
console.log(id,"user");

    const [formData, setFormData] = useState({
        user: id,
        customer: customer,
        comment: '',
        type: 'priceAsker',
        followUp: [{
            date: '',
            info: '',
            time: ''
        }]
    });
    // const filteredCustomers = customers.filter((customer: any) => {
    //     return Object.values(customer).some(value =>
    //         String(value).toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // });
    // useEffect(() => {
    //     fetchCustomer();
    //     const userId = localStorage.getItem('user');
    //     if (userId) {
    //         setFormData(prev => ({ ...prev, user: userId 
                
    //         }));
    //     }
    // }, []);

    // const fetchCustomer = async () => {
    //     const response = await fetch('/api/customer');
    //     const data = await response.json();
    //     setCustomers(data.customer);
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        
        try {
            const response = await fetch('/api/callLog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Reset form or show success message
                setFormData({
                    user: id,
                    customer: customer,
                    comment: '',
                    type: 'priceAsker',
                    followUp: [{
                        date: '',
                        info: '',
                        time: ''
                    }]
                });
            }
        } catch (error) {
            console.error('Error submitting call:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=""
            dir="rtl"
        >
            <div className="w-full mx-auto bg-white rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-[#6FBDF5] mb-6">ثبت تماس جدید</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* <div className="space-y-2">
                        <label className="block text-gray-700">انتخاب مشتری</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="جستجوی مشتری..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 mb-2 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                            />
                            <select
                                value={formData.customer}
                                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                                required
                            >
                                <option value="">انتخاب کنید</option>
                                {filteredCustomers.map((customer: any) => (
                                    <option key={customer._id} value={customer._id}>
                                        {` نام:${customer.name} | تلفن: ${customer.phones.map(
                                            (phone: any) => phone
                                        ) || '-'} | شهر: ${customer.city || '-'} `}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div> */}

                    <div className="space-y-2">
                        <label className="block text-gray-700">نوع تماس</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                        >
                            <option value="priceAsker">استعلام قیمت</option>
                            <option value="order">سفارش</option>
                            <option value="support">پشتیبانی</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700">توضیحات</label>
                        <textarea
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700">پیگیری بعدی</label>
                        <input
                            type="date"
                            value={formData.followUp[0].date}
                            onChange={(e) => setFormData({
                                ...formData,
                                followUp: [{ ...formData.followUp[0], date: e.target.value }]
                            })}
                            className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                        />
                        <input
                            type="time"
                            value={formData.followUp[0].time}
                            onChange={(e) => setFormData({
                                ...formData,
                                followUp: [{ ...formData.followUp[0], time: e.target.value }]
                            })}
                            className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                        />
                        <input
                            type="text"
                            placeholder="توضیحات پیگیری"
                            value={formData.followUp[0].info}
                            onChange={(e) => setFormData({
                                ...formData,
                                followUp: [{ ...formData.followUp[0], info: e.target.value }]
                            })}
                            className="w-full p-3 border-2 border-[#E8F4FE] rounded-xl focus:outline-none focus:border-[#6FBDF5] bg-[#F8FBFE]"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#6FBDF5] text-white py-4 px-6 rounded-lg shadow-lg hover:bg-[#5CA8E0] transition-colors"
                    >
                        <BsTelephone size={20} />
                        <span>ثبت تماس</span>
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};
