import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  initialSidebarPath?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  pageTitle,
  initialSidebarPath = '/dashboard' // Default active path for sidebar
}) => {
  return (
    <div className={cn('min-h-screen bg-background')}> 
      <SidebarNav initialActivePath={initialSidebarPath} />
      <TopHeader pageTitle={pageTitle} />
      <main 
        className={cn(
          'ml-64 mt-[60px] p-6 min-h-[calc(100vh-60px)]',
          'overflow-y-auto min-w-0' // From layoutRequirements.mainContent.sizing
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
