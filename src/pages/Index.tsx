import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeaderComponent from '@/components/layout/PageHeader'; // Renamed to avoid conflict with PageHeader type
import FunnelChart from '@/components/Dashboard/FunnelChart';
import PieChartWidget from '@/components/Dashboard/PieChartWidget';
import LineChartWidget from '@/components/Dashboard/LineChartWidget';
import StatOverviewCards from '@/components/Dashboard/StatOverviewCards';
import { StatCardProps } from '@/components/Dashboard/StatCard';
import { HelpCircle } from 'lucide-react';

interface PageHeaderTab {
  value: string;
  label: string;
}

const IndexPage: React.FC = () => {
  const pageHeaderTabs: PageHeaderTab[] = [
    { value: 'sales', label: 'Sales' },
    { value: 'leads', label: 'Leads' },
  ] as const;

  const reasonsLostData: StatCardProps[] = [
    {
      value: '40%',
      description: 'The proposal is unclear',
      valueClassName: "text-3xl font-bold",
    },
    {
      value: '20%',
      description: 'However venture pursuit',
      valueClassName: "text-3xl font-bold",
    },
    {
      value: '10%',
      description: 'Other',
      valueClassName: "text-3xl font-bold",
    },
    {
      value: '30%',
      description: 'The proposal is unclear',
      valueClassName: "text-3xl font-bold",
    },
  ];

  const otherDataStats: StatCardProps[] = [
    {
      value: '900',
      description: 'total leads count',
      valueClassName: "text-3xl font-bold",
    },
    {
      value: '12',
      description: 'days in average to convert lead',
      valueClassName: "text-3xl font-bold",
    },
    {
      value: '30',
      description: 'inactive leads',
      icon: <HelpCircle className="h-4 w-4 text-muted-foreground" />,
      valueClassName: "text-3xl font-bold",
    },
  ];

  return (
    <MainAppLayout pageTitle="Dashboard" initialSidebarPath="/dashboard">
      <PageHeaderComponent tabs={pageHeaderTabs} defaultTab="leads" />
      
      <div className="space-y-6">
        {/* Top row: FunnelChart and PieChartWidget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunnelChart />
          <PieChartWidget />
        </div>

        {/* Middle row: LineChartWidget */}
        {/* LineChartWidget has col-span-2 internally, suitable for a 2-col grid parent or taking full width in a flex flow */}
        <LineChartWidget />
        
        {/* Bottom row: StatOverviewCards for Reasons and Other Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatOverviewCards
            title="Reasons of leads lost"
            items={reasonsLostData}
            gridCols="2" 
          />
          <StatOverviewCards
            title="Other data"
            items={otherDataStats}
            gridCols="3"
          />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
