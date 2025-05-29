import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PlusCircle, ClipboardList, CalendarPlus } from 'lucide-react';

interface TopHeaderProps {
  pageTitle: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ pageTitle }) => {
  return (
    <header className={cn(
      'fixed top-0 left-64 right-0 z-10 flex h-[60px] items-center justify-between',
      'border-b border-border bg-card px-6 shadow-sm'
    )}>
      <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Lead</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>New Task</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalendarPlus className="mr-2 h-4 w-4" />
            <span>New Event</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>More options...</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default TopHeader;
