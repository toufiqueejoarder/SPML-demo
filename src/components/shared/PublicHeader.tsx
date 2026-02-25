'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Building2, Phone, MapPin, User, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useDemoState } from '@/contexts/DemoStateContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { state, setRole } = useDemoState();

  const handlePortalClick = (role: 'investor' | 'admin') => {
    setRole(role);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-emerald-600" />
            <div>
              <span className="font-bold text-xl text-gray-900">SPML</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2">
                Secure Property Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/investor/dashboard">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePortalClick('investor')}
              >
                <User className="w-4 h-4 mr-2" />
                Investor Portal
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => handlePortalClick('admin')}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-gray-700 hover:text-emerald-600"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t pt-4 flex flex-col gap-3">
                  <Link href="/investor/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full" onClick={() => handlePortalClick('investor')}>
                      <User className="w-4 h-4 mr-2" />
                      Investor Portal
                    </Button>
                  </Link>
                  <Link href="/admin/dashboard" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => handlePortalClick('admin')}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                </div>
                <div className="border-t pt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>+880 171 326 7356</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
