import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard'; // Use relative path

export interface StatOverviewCardsProps {
  title: string;
  items: StatCardProps[];
  className?: string;
  gridCols?: '2' | '3' | '4'; // Allow customization for cols
}

const StatOverviewCards: React.FC<StatOverviewCardsProps> = ({
  title,
  items,
  className,
  gridCols = '4' // Default to 4 as per initial requirement
}) => {

  const gridColClass = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4', // Fallback for 4 per requirement, with responsiveness
  }[gridCols];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className={cn('grid grid-cols-1 gap-4 sm:gap-6', gridColClass)}>
            {items.map((item, index) => (
              <StatCard
                key={index} // It's better to have unique IDs if items can change order
                title={item.title}
                value={item.value}
                description={item.description}
                icon={item.icon}
                valueClassName={item.valueClassName}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatOverviewCards;
