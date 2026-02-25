'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  Users,
  Search,
  Plus,
  Edit,
  MoreHorizontal,
  Shield,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UsersPage() {
  const { state } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredInvestors = state.investors.filter((inv) =>
    inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const kycConfig = {
    verified: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700', label: 'Verified' },
    pending: { icon: Clock, color: 'bg-amber-100 text-amber-700', label: 'Pending' },
    rejected: { icon: XCircle, color: 'bg-red-100 text-red-700', label: 'Rejected' },
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">
            Manage investor accounts and KYC verification.
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Investor
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Investors</p>
                <p className="text-xl font-bold">{state.investors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">KYC Verified</p>
                <p className="text-xl font-bold">
                  {state.investors.filter((i) => i.kycStatus === 'verified').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">KYC Pending</p>
                <p className="text-xl font-bold">
                  {state.investors.filter((i) => i.kycStatus === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">NRB Investors</p>
                <p className="text-xl font-bold">
                  {state.investors.filter((i) => i.type === 'NRB').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search investors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Investors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead>Total Investment</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.map((investor) => {
                const kyc = kycConfig[investor.kycStatus];
                const KycIcon = kyc.icon;

                const hasOverdue = investor.properties.some((p) =>
                  p.installments.some((i) => i.status === 'overdue')
                );

                return (
                  <TableRow 
                    key={investor.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => router.push(`/admin/users/${investor.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={investor.profileImage} />
                          <AvatarFallback>
                            {investor.name.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{investor.name}</p>
                          <p className="text-sm text-gray-500">{investor.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{investor.type}</Badge>
                    </TableCell>
                    <TableCell>{investor.properties.length}</TableCell>
                    <TableCell>
                      ৳{(investor.totalInvestment / 100000).toFixed(1)}L
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={kyc.color}>
                          <KycIcon className="w-3 h-3 mr-1" />
                          {kyc.label}
                        </Badge>
                        {hasOverdue && (
                          <Badge className="bg-red-100 text-red-700">Overdue</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${investor.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Full Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${investor.id}?tab=payments`}>
                              <FileText className="w-4 h-4 mr-2" />
                              View Payments
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${investor.id}?tab=documents`}>
                              <FileText className="w-4 h-4 mr-2" />
                              View Documents
                            </Link>
                          </DropdownMenuItem>
                          {investor.kycStatus === 'pending' && (
                            <DropdownMenuItem>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Verify KYC
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
