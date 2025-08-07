import { DatewiseSum } from "@/types/stats.type";
import CalendarHeatmap, { TooltipDataAttrs } from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';

type Props = {
  data: DatewiseSum;
  loading: boolean
};

export default function Yearly({ data, loading }: Props) {
  const entries = Object.entries(data);
  if(loading){
    return <YearlySkeleton/>
  }
  if (entries.length === 0) {
    return <YearlySkeleton/>;
  }

  const sortedEntries = entries.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
  const startDate = new Date(sortedEntries[0][0]);
  const endDate = new Date(sortedEntries[sortedEntries.length - 1][0]);

  const chartData = sortedEntries.map(([date, amount]) => ({
    date,
    count: amount,
  }));

  return (
    <div className="w-full bg-gray-100 p-2 rounded-lg">
      <CalendarHeatmap
        gutterSize={2} // smaller spacing between cells
        startDate={startDate}
        endDate={endDate}
        values={chartData}
        classForValue={(value) => {
          if (!value) return "color-empty";
          const count = value.count;
          if (count >= 100) return "color-scale-4";
          if (count >= 50) return "color-scale-3";
          if (count >= 10) return "color-scale-2";
          if (count > 0) return "color-scale-1";
          return "color-empty";
        }}
        showWeekdayLabels
        tooltipDataAttrs={(value) => {
          if (!value) return { 'data-tooltip-id': '', 'data-tooltip-content': '' } as TooltipDataAttrs;
          return { 'data-tooltip-id': 'heatmap-tooltip', 'data-tooltip-content': `Rs ${value.count} spent on ${value.date}` } as TooltipDataAttrs;
        }}
      />
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
}

export function YearlySkeleton() {
  return (
    <div className="w-full bg-gray-100 p-2 rounded-lg animate-pulse">
      <div className="w-full h-[150px] bg-gray-300 rounded-md" />
    </div>
  );
}
