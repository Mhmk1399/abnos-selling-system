import React, { useEffect, useState } from 'react'
import DynamicTable from './global/tables'
interface Customer {
    name: string;
    phones: string[];
  }

  interface User {
    name: string;
  }

  interface CallLog {
    created: string;
    customer: Customer;
    type: string;
    user: User;
  }

  interface FormattedCall extends CallLog {
    date: string;
    customerName: string;
    customerPhone: string;
    userName: string;
  }
export const CallsList = () => {
  const [calls, setCalls] = useState<FormattedCall[]>([])

  const columns = [
    { 
      key: 'created', 
      header: 'تاریخ تماس', 
      sortable: true 
    },
    { 
      key: 'customerName', 
      header: 'نام مشتری', 
      sortable: true 
    },
    { 
      key: 'customerPhone', 
      header: 'شماره تماس'
    },
    { 
      key: 'type', 
      header: 'نوع تماس', 
      sortable: true 
    },
    { 
      key: 'userName', 
      header: 'کاربر'
    }
  ]

  useEffect(() => {
    const fetchCalls = async () => {
      const response = await fetch('/api/callLog')
      const data = await response.json()

    const formattedCalls: FormattedCall[] = data.callLog.map((call: CallLog) => ({
      ...call,
      date: call.created,
      customerName: call.customer.name,
      customerPhone: call.customer.phones[0],
      type: call.type,
      userName: call.user.name
    }))
      
      setCalls(formattedCalls)
    }
    fetchCalls()
  }, [])
  console.log(calls);
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">لیست تماس‌ها</h2>
      {calls&&<DynamicTable 
        columns={columns}
        data={calls}
      />}
    </div>
  )
}
