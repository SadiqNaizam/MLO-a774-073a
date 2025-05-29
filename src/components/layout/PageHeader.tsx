import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface PageHeaderTab {
  value: string;
  label: string;
}

interface PageHeaderProps {
  tabs: PageHeaderTab[];
  defaultTab?: string;
  onTabChange?: (value: string) => void;
  children?: React.ReactNode; // To render content associated with the active tab
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  children,
  className
}) => {
  const effectiveDefaultTab = defaultTab || (tabs.length > 0 ? tabs[0].value : '');

  return (
    <div className={cn("mb-6", className)}>
      <Tabs defaultValue={effectiveDefaultTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="border-b border-border rounded-none p-0 h-auto bg-transparent justify-start">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                'pb-3 px-1 mr-6 rounded-none border-b-2 border-transparent',
                'text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none',
                'hover:text-primary focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Render children directly if they are intended as TabsContent equivalent, or structure with TabsContent */} 
        {/* For this component, we assume children might be passed to be displayed below tabs, not necessarily as TabsContent */} 
        {/* If specific TabsContent for each tab is needed, the API would be different */} 
      </Tabs>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default PageHeader;
