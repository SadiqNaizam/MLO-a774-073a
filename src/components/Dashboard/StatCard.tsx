import React from 'react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title?: string; // Title is optional as per some designs (e.g. percentages)
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
  valueClassName
}) => {
  return (
    <div className={cn("p-4 bg-card rounded-lg border border-border", className)}>
      {title && <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>}
      <div className={cn("text-3xl font-bold text-card-foreground", valueClassName)}>{value}</div>
      <p className="text-xs text-muted-foreground mt-1 flex items-center">
        {description}
        {icon && <span className="ml-1.5">{icon}</span>}
      </p>
    </div>
  );
};

export default StatCard;
