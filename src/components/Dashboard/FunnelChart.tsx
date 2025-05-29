import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface FunnelStage {
  id: string;
  name: string;
  value: number;
  dealValue: number;
  duration: string;
  color: string;
  isTooltipTarget?: boolean;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', value: 200, dealValue: 200, duration: '2 days', color: 'bg-accentRed' },
  { id: 'qualified', name: 'Qualified', value: 100, dealValue: 100, duration: '2 days', color: 'bg-accentYellow', isTooltipTarget: true },
  { id: 'in-conversation', name: 'In conversation', value: 50, dealValue: 100, duration: '--', color: 'bg-gray-700' }, // Using gray as placeholder, could be a specific theme color
  { id: 'negotiations', name: 'Negotiations', value: 20, dealValue: 50, duration: '8 days', color: 'bg-accentGreen' },
  { id: 'closed-won', name: 'Closed won', value: 20, dealValue: 50, duration: '10 days', color: 'bg-purple-500' }, // Using purple as placeholder
];

const totalActiveLeads = 600;

const FunnelChart: React.FC = () => {
  const totalFunnelValue = React.useMemo(() => funnelData.reduce((sum, item) => sum + item.value, 0), []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">{totalActiveLeads}</span>
          <span className="ml-2 text-sm text-muted-foreground">active leads</span>
        </div>

        <div className="mb-6 h-3 flex rounded overflow-hidden">
          {funnelData.map(stage => (
            <div
              key={stage.id}
              className={cn("h-full", stage.color)}
              style={{ width: `${(stage.value / totalFunnelValue) * 100}%` }}
              title={`${stage.name}: ${stage.value}`}
            ></div>
          ))}
        </div>

        <TooltipProvider>
          <ul className="space-y-3">
            {funnelData.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 text-sm">
                <div className="flex items-center">
                  <span className={cn("w-3 h-3 rounded-sm mr-2", stage.color)}></span>
                  <span className="text-card-foreground font-medium">{stage.name}</span>
                </div>
                <div className="text-right text-muted-foreground">{stage.value}</div>
                <div className="text-right text-muted-foreground">$ {stage.dealValue}</div>
                {
                  stage.isTooltipTarget ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-right text-muted-foreground cursor-help">{stage.duration}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>average time on this stage</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div className="text-right text-muted-foreground">{stage.duration}</div>
                  )
                }
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
