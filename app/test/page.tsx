  import DynamicTreeChart from "@/components/manager/Manager";

  const sampleData = {
    totalCalls: 150,
    salesData: [
      {
        name: "Saler 1",
        calls: 45,
        statuses: [
          { status: "Completed", count: 20 },
          { status: "Pending", count: 15 },
          { status: "Failed", count: 10 }
        ]
      },
      {
        name: "Saler 2",
        calls: 45,
        statuses: [
          { status: "Completed", count: 10 },
          { status: "Pending", count: 35 },
          { status: "Failed", count: 13 }
        ]
      },
      {
        name: "Saler 3",
        calls: 335,
        statuses: [
          { status: "Completed", count: 30 },
          { status: "Pending", count: 35 },
          { status: "Failed", count: 14 }
        ]
      },
      // Add more salers as needed
    ]
  };

  const Page = () => {
    return (
      <div>
        <DynamicTreeChart totalCalls={sampleData.totalCalls} salesData={sampleData.salesData} />
      </div>
    );
  };

  export default Page;
