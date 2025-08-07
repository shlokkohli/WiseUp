import { PaymentMethodDivision } from "@/types/stats.type";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";
import { CustomTooltip } from "../AnalyticsHelper/CutomTooltip";

type Props = {
  data: PaymentMethodDivision[];
  loading : boolean
};

export default function PaymentDivision({ data, loading }: Props) {
  if(loading){
    <PaymentDivisionSkeleton/>
  }
  return (
    <div className="h-full">
      {data.length === 0 ? (
        <div className="bg-gray-100 h-full flex items-center flex-col p-2  rounded-lg">
        <h2 className="px-3 pb-5 text-center text-lg font-semibold text-gray-700">Payment Method Analysis</h2>
        <p className="text-lg font-semibold mx-auto my-auto text-gray-500">
          Nothing to Show here. Please add some transactions
        </p>
        </div>
      ) : (
        <div className="bg-gray-100 h-full flex flex-col items-center justify-center p-2 rounded-lg">
          <h2 className="text-lg pb-5 font-semibold text-gray-700 text-center ">
            Payment Method Analysis
          </h2>
          <RadarChart
          className="text-xs"
            outerRadius={90}
            width={350}
            height={250}
            data={data.map((d) => ({
              ...d,
              "_sum.amount": d._sum.amount ?? 0, // handle null safely
            }))}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="paymentMethod" />
            <PolarRadiusAxis angle={30} />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Payment Methods"
              dataKey="_sum.amount"
              stroke="#6a62ff"
              fill="#ff28df"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </div>
      )}
    </div>
  );
}

export function PaymentDivisionSkeleton() {
  return (
    <div className="h-full">
      <div className="bg-gray-100 h-full flex flex-col items-center justify-center p-2 rounded-lg animate-pulse">
        <div className="w-48 h-6 bg-gray-300 rounded mb-5" />

        <div className="relative w-[350px] h-[250px]">
          {/* Circular radar-like background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-gray-300 rounded-full" />
          </div>

          {/* Spokes */}
          {Array.from({ length: 6 }).map((_, index) => {
            const angle = (index / 6) * 360;
            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 w-[2px] h-20 bg-gray-200 origin-top"
                style={{ transform: `rotate(${angle}deg) translateY(-50%)` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
