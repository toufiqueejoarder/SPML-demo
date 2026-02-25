'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  LayoutDashboard,
  Package,
  Users,
  Map,
  BarChart3,
  TrendingUp,
  Mail,
  Ticket,
  Home,
  Building2,
  LogOut,
  Settings,
  PieChart,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Marketing Analytics', icon: BarChart3 },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/gap-analysis', label: 'Gap Analysis', icon: PieChart },
  { href: '/admin/leads', label: 'Lead Management', icon: Users },
  { href: '/admin/drip-campaigns', label: 'Drip Campaigns', icon: Mail },
  { href: '/admin/heatmap', label: 'Demand Heatmap', icon: Map },
  { href: '/admin/users', label: 'User Management', icon: Settings },
  { href: '/admin/tickets', label: 'Support Tickets', icon: Ticket },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { setRole } = useDemoState();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-emerald-400" />
          <div>
            <span className="font-bold text-lg">SPML</span>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Admin Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-emerald-600">
            <AvatarFallback className="bg-emerald-600 text-white">SA</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Super Admin</p>
            <p className="text-xs text-slate-400">admin@spml.com.bd</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Main Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Link
          href="/"
          onClick={() => setRole('public')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Website
        </Link>
        <Link
          href="/"
          onClick={() => setRole('public')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
