import { CategoryDivision as CategoryDivisionType } from "@/types/stats.type";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { CustomTooltip } from "../AnalyticsHelper/CutomTooltip";

type Props = {
  data: CategoryDivisionType[] | []; // `data` is a prop that is an array
  loading : boolean
};

export default function CategoryDivision({data, loading} : Props) {
  const COLORS = ["#756fe3", "#ffc658", "#00C49F", "#ff28df", "#ff712a", "#41e480"];
  if(loading){
    return <CategoryDivisionSkeleton/>
  }
  return (
    <div className="h-full">
    {data.length === 0 ? (
      <div className="bg-gray-100 h-full flex items-center flex-col p-2  rounded-lg">
        <h2 className="px-3 pb-5 text-center text-lg font-semibold text-gray-700">Category Expenses</h2>
        <p className="text-lg font-semibold mx-auto my-auto text-gray-500">
          Nothing to Show here. Please add some transactions
        </p>
      </div>
    ) : (
      <div className="bg-gray-100 h-full flex items-center flex-col p-2  rounded-lg">
      <h2 className="px-3 pb-5 text-center text-lg font-semibold text-gray-700">Category Expenses</h2>
      <PieChart width={200} height={200} >
        <Tooltip content={<CustomTooltip />}/>
        <Pie
          data={data}
          dataKey="_sum.amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={50}
          fill="#8884d8"
          >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
      )
    }
  </div>
    
  );
}

export function CategoryDivisionSkeleton() {
  return (
    <div className="h-full">
      <div className="bg-gray-100 h-full flex items-center flex-col p-2 rounded-lg animate-pulse">
        {/* Skeleton Circle */}
        <div className="relative w-[200px] h-[200px]">
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gray-300" />
          <div className="absolute top-1/4 left-1/4 w-[100px] h-[100px] rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
