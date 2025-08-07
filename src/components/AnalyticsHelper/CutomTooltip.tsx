import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";


export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const category = payload[0].name; // instead of `label`
    const amount = payload[0].value;

    return (
      <div className="bg-white/90 p-2 shadow rounded text-md border border-gray-200">
        <p className="text-sm">
          <span className="text-gray-500">Category:</span> <span className="font-semibold text-gray-700">{category}</span>
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Amount:</span> <span className="font-semibold text-gray-700">₹{amount}</span>
        </p>
      </div>
    );
  }

  return null;
};
