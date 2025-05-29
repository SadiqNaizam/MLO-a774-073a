import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface PieChartDataItem {
  name: string;
  value: number; // Represents the percentage for the pie slice
  amount: number; // Represents the $ amount
  fill: string;
}

const initialPieData: PieChartDataItem[] = [
  { name: 'Clutch', value: 50, amount: 3000, fill: 'hsl(var(--destructive))' }, // accentRed
  { name: 'Behance', value: 25, amount: 1000, fill: 'var(--accent-yellow)' },
  { name: 'Instagram', value: 15, amount: 1000, fill: 'var(--accent-green)' },
  { name: 'Dribbble', value: 10, amount: 1000, fill: 'hsl(var(--primary))' }, // accentBlue
];

type ActiveButton = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const PieChartWidget: React.FC = () => {
  const [activeButton, setActiveButton] = React.useState<ActiveButton>('leadsConverted');
  // Data would change based on activeButton in a real app
  const [chartData, setChartData] = React.useState<PieChartDataItem[]>(initialPieData);

  // Placeholder for data fetching/munging logic based on active button
  React.useEffect(() => {
    // Example: In a real app, you might fetch new data or transform existing data here.
    // For this example, we'll just simulate some variation.
    if (activeButton === 'leadsCame') {
      setChartData([
        { name: 'Clutch', value: 40, amount: 2500, fill: 'hsl(var(--destructive))' },
        { name: 'Behance', value: 30, amount: 1500, fill: 'var(--accent-yellow)' },
        { name: 'Instagram', value: 20, amount: 1200, fill: 'var(--accent-green)' },
        { name: 'Dribbble', value: 10, amount: 800, fill: 'hsl(var(--primary))' },
      ]);
    } else {
      setChartData(initialPieData);
    }
  }, [activeButton]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-2 border border-border rounded-md shadow-lg">
          <p className="text-sm text-card-foreground">{`${data.name}: $${data.amount} (${data.value}%)`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    const totalValue = chartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
      <ul className="space-y-2 text-sm w-full md:w-auto">
        {payload.map((entry: any, index: number) => {
          const dataItem = chartData.find(item => item.name === entry.payload.name);
          if (!dataItem) return null;
          const percentage = totalValue > 0 ? ((dataItem.value / totalValue) * 100).toFixed(0) : 0;

          return (
            <li key={`item-${index}`} className="flex items-center justify-between">
              <div className="flex items-center">
                <span style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-sm mr-2"></span>
                <span className="text-card-foreground">{dataItem.name}</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground font-medium">$ {dataItem.amount.toLocaleString()}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-2 text-muted-foreground">{percentage}%</span>
                    </TooltipTrigger>
                    {index === payload.length -1 && (
                       <TooltipContent side="top" align="end">
                        <p>from leads total</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend content={renderLegend} verticalAlign="middle" align="right" layout="vertical" iconSize={0} wrapperStyle={{width: '40%'}}/>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-2 border-t pt-4 mt-4">
          {(['Leads came', 'Leads Converted', 'Total deals size'] as const).map((label, index) => {
            const keyMap: ActiveButton[] = ['leadsCame', 'leadsConverted', 'totalDealsSize'];
            const currentKey = keyMap[index];
            return (
              <Button
                key={label}
                variant="ghost"
                size="sm"
                className={cn(
                  'text-muted-foreground',
                  activeButton === currentKey && 'bg-muted text-primary'
                )}
                onClick={() => setActiveButton(currentKey)}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartWidget;
