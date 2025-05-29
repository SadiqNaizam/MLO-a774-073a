import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  Printer,
  Archive,
  Mail,
  Inbox,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu,
  Box
} from 'lucide-react';

// Define LucideIcon type for dynamic icon rendering
type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>;

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: (path: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, isActive, onClick }) => {
  return (
    <li>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault(); // Prevent page reload for example
          if (onClick) onClick(href);
        }}
        className={cn(
          'flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium',
          'hover:bg-primary/10 hover:text-primary transition-colors duration-150',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-foreground/70 hover:text-foreground'
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </a>
    </li>
  );
};

interface SidebarNavProps {
  initialActivePath?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ initialActivePath = '/dashboard' }) => {
  const [activePath, setActivePath] = React.useState<string>(initialActivePath);

  const handleNavClick = (path: string) => {
    setActivePath(path);
    // In a real app, you would navigate using react-router-dom or similar
    // e.g., navigate(path);
  };

  const mainNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/customers', label: 'Customers', icon: UserCircle2 },
    { href: '/proposals', label: 'Proposals', icon: FileText },
    { href: '/invoices', label: 'Invoices', icon: Printer },
    { href: '/items', label: 'Items', icon: Archive },
    { href: '/mail', label: 'Mail', icon: Mail },
    { href: '/shoebox', label: 'Shoebox', icon: Inbox },
    { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  ];

  const footerNavItems = [
    { href: '/help', label: 'Help', icon: HelpCircle },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed top-0 left-0 z-20 flex h-screen w-64 flex-col border-r border-border bg-secondary">
      <div className="flex h-[60px] items-center justify-between border-b border-border px-4">
        <a href="/" className="flex items-center space-x-2" onClick={(e) => { e.preventDefault(); handleNavClick('/');}}>
          <Box className="h-7 w-7 text-primary" /> 
          <span className="text-lg font-semibold text-foreground">Brand</span>
        </a>
        <button className="text-foreground/70 hover:text-foreground">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={activePath === item.href}
              onClick={handleNavClick}
            />
          ))}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <ul className="space-y-1">
          {footerNavItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={activePath === item.href}
              onClick={handleNavClick}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarNav;
