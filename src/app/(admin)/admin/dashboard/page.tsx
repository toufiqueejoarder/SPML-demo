'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDemoState } from '@/contexts/DemoStateContext';
import { monthlyCollections, pageViews } from '@/lib/demo-data';
import {
  TrendingUp,
  Users,
  Building2,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Ticket,
  BarChart3,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#6b7280'];

export default function AdminDashboard() {
  const { state, computed } = useDemoState();

  const leadDistribution = [
    { name: 'HOT', value: computed.hotLeads, color: '#ef4444' },
    { name: 'WARM', value: computed.warmLeads, color: '#f59e0b' },
    { name: 'COLD', value: computed.coldLeads, color: '#6b7280' },
  ];

  const openTickets = state.supportTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = state.supportTickets.filter(t => t.status === 'in_progress').length;

  const currentMonth = monthlyCollections[monthlyCollections.length - 1];
  const collectionRate = (currentMonth.collected / currentMonth.target) * 100;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">
            Overview of SPML operations and key metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/leads">
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Manage Leads
            </Button>
          </Link>
          <Link href="/admin/inventory">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Building2 className="w-4 h-4 mr-2" />
              Inventory
            </Button>
          </Link>
        </div>
      </div>

      {/* Alert for overdue payments */}
      {computed.overdueInstallments.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <div className="flex-1">
              <p className="font-medium text-amber-800">
                {computed.overdueInstallments.length} overdue installments totaling ৳{(computed.totalOverdue / 100000).toFixed(1)}L
              </p>
              <p className="text-sm text-amber-600">
                Action required: Send reminders or follow up with investors.
              </p>
            </div>
<Link href="/admin/users">
              <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <span className={`text-sm font-medium flex items-center ${collectionRate >= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {collectionRate >= 100 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {collectionRate.toFixed(0)}%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">This Month Collection</p>
            <p className="text-2xl font-bold text-gray-900">
              ৳{(currentMonth.collected / 10000000).toFixed(1)}Cr
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Target: ৳{(currentMonth.target / 10000000).toFixed(1)}Cr
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <Badge variant="secondary">
                {((computed.totalSold / computed.totalUnits) * 100).toFixed(0)}% sold
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mb-1">Inventory Status</p>
            <p className="text-2xl font-bold text-gray-900">
              {computed.totalAvailable} Available
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {computed.totalSold} sold, {computed.totalBooked} booked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <Badge className="bg-red-100 text-red-700">
                {computed.hotLeads} HOT
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mb-1">Active Leads</p>
            <p className="text-2xl font-bold text-gray-900">
              {state.leads.length}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {computed.warmLeads} warm, {computed.coldLeads} cold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-purple-600" />
              </div>
              {openTickets > 0 && (
                <Badge variant="destructive">{openTickets} new</Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-1">Support Tickets</p>
            <p className="text-2xl font-bold text-gray-900">
              {openTickets + inProgressTickets}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {openTickets} open, {inProgressTickets} in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Collections Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Collections vs Target</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCollections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => `${(value / 10000000).toFixed(0)}Cr`}
                  />
                  <Tooltip 
                    formatter={(value) => [`৳${(Number(value) / 10000000).toFixed(2)}Cr`, '']}
                  />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="collected" fill="#10b981" name="Collected" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lead Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Distribution</CardTitle>
            <CardDescription>Current lead pipeline by score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {leadDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {leadDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Page Views */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Page Analytics
            </CardTitle>
            <CardDescription>Top performing pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pageViews.map((page, index) => (
                <div key={page.page} className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-6">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{page.page}</span>
                      <span className="text-sm text-gray-500">{page.views.toLocaleString()} views</span>
                    </div>
                    <Progress value={(page.views / pageViews[0].views) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Inventory by project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.projects.map((project) => {
              const soldPercent = (project.soldUnits / project.totalUnits) * 100;
              return (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{project.name}</span>
                    <Badge variant={project.availableUnits === 0 ? 'destructive' : 'secondary'}>
                      {project.availableUnits === 0 ? 'Sold Out' : `${project.availableUnits} left`}
                    </Badge>
                  </div>
                  <Progress value={soldPercent} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{project.soldUnits} sold</span>
                    <span>{project.bookedUnits} booked</span>
                    <span>{project.totalUnits} total</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
