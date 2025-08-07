import { DatewiseSum } from "@/types/stats.type";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../AnalyticsHelper/CutomTooltip";
import { getDayName } from "@/helper/DateToDay";

type Props = {
  data: DatewiseSum;
  loading: boolean
};

export default function DatewiseBarChart({ data, loading }: Props) {
  // Transform object into array
  const chartData = Object.entries(data).map(([date, amount]) => ({
    date: getDayName(date) ,
    amount: amount,
  }));
  if(loading){
    <DatewiseBarChartSkeleton/>
  }
  return (
    <div className="h-full">
      {chartData.length === 0 ? (
        <DatewiseBarChartSkeleton/>
      ) : (
        <div className="bg-gray-100 h-full flex flex-col items-center justify-center p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Last Week Record
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis className="text-sm" dataKey="date" />
                <YAxis className="text-sm" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                    dataKey="amount"
                    fill="#7028ff" 
                    radius={[8, 8, 0, 0]}
                    activeBar={{ fill: "#fb5ef3" }} 
                />
                </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export function DatewiseBarChartSkeleton() {
  return (
    <div className="h-full">
      <div className="bg-gray-100 h-full flex flex-col items-center justify-center p-4 rounded-lg animate-pulse">
        <div className="text-lg font-semibold text-gray-300 text-center mb-4 w-40 h-6 bg-gray-300 rounded" />

        <div className="w-full h-[250px] flex items-end gap-2 px-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center justify-end flex-1">
              <div className="w-full h-[60%] bg-gray-300 rounded-t-lg" />
              <div className="h-4 w-10 bg-gray-200 mt-2 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
