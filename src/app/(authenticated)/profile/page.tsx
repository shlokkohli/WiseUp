'use client'

import ProfileCard from "@/components/AnalyticsHelper/ProfileCard";
import CategoryDivision from "@/components/Charts/CategoryDivision.chart";
import PaymentDivision from "@/components/Charts/PaymentDivision.chart";
import Weekly from "@/components/Charts/Weekly.chart";
import Yearly from "@/components/Charts/Yearly.chart";
import GenericLoader from "@/components/skeletons/GenericLoader";
import { statsResponse } from "@/types/stats.type";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading, isError, error } = useQuery<
    statsResponse,
    Error
  >({
    queryKey: ['dashboard-analytics'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      return json.data as statsResponse;
    },
    retry: 2,
    staleTime: 1000 * 60 * 60, // optional: keep fresh for 60m
  });

  if (isLoading) {
    return <GenericLoader/>
  }

  if (isError) {
    return <div>Error loading analytics: {error!.message}</div>;
  }

  return (
    <div className="flex flex-col w-full lg:flex-row min-h-screen">
      <div className="flex-1 flex flex-col w-full">
        <div className="grid p-2 w-full gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
          <div className="md:row-span-2">
            <ProfileCard data={data || null} loading={isLoading} />
          </div>
          <div>
            <CategoryDivision
              data={data!.categoryDivisions}
              loading={isLoading}
            />
          </div>
          <div>
            <PaymentDivision
              data={data!.paymentMethodDivisions}
              loading={isLoading}
            />
          </div>
          <div className="md:col-span-2">
            <Weekly data={data!.lastWeek} loading={isLoading} />
          </div>
        </div>

        <div className="w-full p-2">
          <Yearly data={data!.lastYear} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}
