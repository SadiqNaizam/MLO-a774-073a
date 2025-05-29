import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface LineChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const initialLineChartData: LineChartDataPoint[] = [
  { month: 'March', closedWon: 88, closedLost: 65 },
  { month: 'April', closedWon: 62, closedLost: 38 },
  { month: 'May', closedWon: 95, closedLost: 70 },
  { month: 'June', closedWon: 35, closedLost: 8 },
  { month: 'July', closedWon: 68, closedLost: 42 },
  { month: 'August', closedWon: 110, closedLost: 55 },
];

const LineChartWidget: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<string>('last-6-months');
  const [chartData, setChartData] = React.useState<LineChartDataPoint[]>(initialLineChartData);

  // Placeholder for data fetching/filtering logic based on timeRange
  React.useEffect(() => {
    // Simulate data change for different time ranges
    if (timeRange === 'last-3-months') {
      setChartData(initialLineChartData.slice(-3));
    } else if (timeRange === 'last-12-months') {
      // For demo, just duplicate and slightly alter data to make it longer
      const extendedData = [
        ...initialLineChartData.map(d => ({...d, closedWon: d.closedWon * 0.8, closedLost: d.closedLost * 0.8})).slice(0, -3),
        { month: 'Dec', closedWon: 50, closedLost: 30 },
        { month: 'Jan', closedWon: 70, closedLost: 40 },
        { month: 'Feb', closedWon: 60, closedLost: 25 },
        ...initialLineChartData,
      ].slice(-12);
      setChartData(extendedData);
    } else {
      setChartData(initialLineChartData);
    }
  }, [timeRange]);

  const totalClosed = React.useMemo(() => chartData.reduce((sum, item) => sum + item.closedWon, 0), [chartData]);
  const totalLost = React.useMemo(() => chartData.reduce((sum, item) => sum + item.closedLost, 0), [chartData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 border rounded-md shadow-lg">
          <p className="label text-sm font-medium text-card-foreground">{`${label}`}</p>
          {payload.map((pld: any) => (
            <p key={pld.dataKey} style={{ color: pld.stroke }} className="text-xs">
              {`${pld.name}: ${pld.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full col-span-2"> {/* Assuming this widget takes full width of 2 cols in grid */} 
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
          <div className="mt-2 space-x-6">
            <span className="text-2xl font-bold text-card-foreground">{totalClosed}</span>
            <span className="text-sm text-muted-foreground">total closed</span>
            <span className="text-2xl font-bold text-card-foreground ml-4">{totalLost}</span>
            <span className="text-sm text-muted-foreground">total lost</span>
          </div>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] text-xs">
            <CalendarDays className="h-3 w-3 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              width={30}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Legend 
              verticalAlign="bottom" 
              align="left" 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ paddingLeft: '20px', paddingTop: '10px' }}
              formatter={(value, entry) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
            />
            <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#10B981" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, fill: '#10B981', strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF', fill: '#10B981'}} />
            <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#EF4444" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, fill: '#EF4444', strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF', fill: '#EF4444'}} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartWidget;
