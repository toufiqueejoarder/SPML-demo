'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useDemoState, useCurrentInvestor } from '@/contexts/DemoStateContext';
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  User,
  Home,
  Building2,
  TrendingUp,
  Key,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { href: '/investor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/investor/documents', label: 'Document Vault', icon: FileText },
  { href: '/investor/payments', label: 'Payments & Ledger', icon: CreditCard },
  { href: '/investor/profile', label: 'Profile & KYC', icon: User },
  { href: '/investor/resale', label: 'Resale Market', icon: TrendingUp },
  { href: '/investor/rental', label: 'Rental Management', icon: Key },
];

export function InvestorSidebar() {
  const pathname = usePathname();
  const investor = useCurrentInvestor();
  const { state, setInvestor, setRole } = useDemoState();

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-emerald-600" />
          <div>
            <span className="font-bold text-lg text-gray-900">SPML</span>
            <p className="text-xs text-gray-500">Investor Portal</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src={investor?.profileImage} />
                <AvatarFallback>
                  {investor?.name?.split(' ').map(n => n[0]).join('') || 'IN'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {investor?.name || 'Select Investor'}
                </p>
                <div className="flex items-center gap-1">
                  <Badge
                    variant={investor?.kycStatus === 'verified' ? 'default' : 'secondary'}
                    className={cn(
                      'text-xs',
                      investor?.kycStatus === 'verified' && 'bg-emerald-100 text-emerald-700'
                    )}
                  >
                    {investor?.kycStatus === 'verified' ? 'Verified' : 'KYC ' + investor?.kycStatus}
                  </Badge>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {state.investors.map((inv) => (
              <DropdownMenuItem
                key={inv.id}
                onClick={() => setInvestor(inv.id)}
                className={cn(inv.id === investor?.id && 'bg-gray-100')}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={inv.profileImage} />
                  <AvatarFallback>{inv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span>{inv.name}</span>
                {inv.kycStatus === 'pending' && (
                  <Badge variant="secondary" className="ml-auto text-xs">Pending</Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
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
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
      <div className="p-4 border-t space-y-2">
        <Link
          href="/"
          onClick={() => setRole('public')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Website
        </Link>
        <Link
          href="/"
          onClick={() => setRole('public')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
