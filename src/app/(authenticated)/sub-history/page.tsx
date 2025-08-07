'use client'

import { useQuery } from "@tanstack/react-query";
import GenericLoader from "@/components/skeletons/GenericLoader";

export default function Page() {
  const fetchHistory = async () => {
    const res = await fetch('/api/subscriptionHistory');
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    console.log("Sub History",json.subscriptions);
    return json.subscriptions;
  };
  

  const { data, isLoading, isError, error } = useQuery(
    {
      queryKey: ['subscription-history'],
      queryFn: fetchHistory,
      retry: 2
    }
  );

  if (isLoading) {
    return <GenericLoader />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col w-full p-5">
        
    <h2 className="text-xl sm:w-[90%] items-center mx-auto w-full m-2 md:w-[80%] font-semibold text-violet-600 mt-10">Subscription History</h2>
      {data?.length > 0 ? (
          <div className="flex flex-col sm:w-[90%] items-center mx-auto w-full m-2 md:w-[80%]  gap-4">
          {data.map((item: any) => (
              <div
              key={item.id}
              className="bg-white d w-full rounded-lg p-4 border border-gray-300"
              >
              <h3 className=" font-semibold text-gray-800">Subscription ID: {item.id}</h3>
              <p className="text-gray-600 text-sm">Amount: ${item.subscriptionAmount}</p>
              <p className="text-gray-500 text-sm">
                Subscribed on: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
          <p className="p-5 text-gray-700 font-semibold">No subscription history available.</p>
        )}
        </div>
  );
}
