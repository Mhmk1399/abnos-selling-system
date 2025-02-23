"use client";
import DynamicTable from "@/components/global/tables";
import FileInput from "@/components/static/file-input";
import SalerForm from "@/components/static/saler/saler-form";
import SupervisorForm from "@/components/static/supervisor/supervisor-form";
import { JSX } from "react";

export default function Home() {
  interface Column {
    key: string;
    header: string;
    sortable?: boolean;
    render?: (value: any) => JSX.Element;
  }

 

  const columns: Column[] = [
    { key: "name", header: "نام", sortable: true },
    { key: "date", header: "تاریخ" },
    {
      key: "status",
      header: "وضعیت",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value === "active" ? "فعال" : "غیرفعال"}
        </span>
      ),
    },
    {
      key: "pos",
      header: "پوزیشن",
    },
  ];

  const sampleData = [
    { name: "علی محمدی", date: "1402/08/15", status: "active", pos: "iiiiii" },
    {
      name: "سارا احمدی",
      date: "1402/08/14",
      status: "inactive",
      pos: "iiiiii",
    },
  ];
  return (
    <div className="">
      {/* <SalerForm /> */}
      {/* <SupervisorForm /> */}
      {/* <FileInput /> */}
      <DynamicTable
        columns={columns}
        data={sampleData}
        onSort={(key, direction) => console.log("Sort:", key, direction)}
        onFilter={(filters) => console.log("Filters:", filters)}
      />
    </div>
  );
}
