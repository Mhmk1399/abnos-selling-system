"use client";
import DynamicTable from "@/components/global/tables";
import FileInput from "@/components/static/file-input";
import SalerForm from "@/components/static/saler/saler-form";
import SupervisorForm from "@/components/static/supervisor/supervisor-form";
import Link from "next/link";
import { JSX } from "react";

export default function Home() {
  // const token = localStorage.getItem("token") || null;
  // if (!token) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50">
  //       <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4 text-center">
  //         <div className="mb-6">
  //           <h1 className="text-2xl font-bold text-gray-800 mb-2">خوش آمدید</h1>
  //           <p className="text-gray-600">برای دسترسی به سیستم لطفا وارد شوید</p>
  //         </div>
  //         <Link
  //           href="/login"
  //           className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-medium gap-2"
  //         >
  //           <span>ورود به سیستم</span>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-5 w-5"
  //             viewBox="0 0 20 20"
  //             fill="currentColor"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
  //               clipRule="evenodd"
  //             />
  //           </svg>
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  // interface Column {
  //   key: string;
  //   header: string;
  //   sortable?: boolean;
  //   render?: (value: any) => JSX.Element;
  // }

  // const columns: Column[] = [
  //   { key: "name", header: "نام", sortable: true },
  //   { key: "date", header: "تاریخ" },
  //   {
  //     key: "status",
  //     header: "وضعیت",
  //     render: (value) => (
  //       <span
  //         className={`px-2 py-1 rounded-full text-sm ${
  //           value === "active"
  //             ? "bg-green-100 text-green-800"
  //             : "bg-red-100 text-red-800"
  //         }`}
  //       >
  //         {value === "active" ? "فعال" : "غیرفعال"}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "pos",
  //     header: "پوزیشن",
  //   },
  // ];

  // const sampleData = [
  //   { name: "علی محمدی", date: "1402/08/15", status: "active", pos: "iiiiii" },
  //   {
  //     name: "سارا احمدی",
  //     date: "1402/08/14",
  //     status: "inactive",
  //     pos: "iiiiii",
  //   },
  // ];
  return (
    <div className="">
      {/* <SalerForm /> */}
      {/* <FileInput /> */} 
      <SupervisorForm />
      {/* <DynamicTable
        columns={columns}
        data={sampleData}
        onSort={(key, direction) => console.log("Sort:", key, direction)}
        onFilter={(filters) => console.log("Filters:", filters)}
      /> */}
    </div>
  );
}
