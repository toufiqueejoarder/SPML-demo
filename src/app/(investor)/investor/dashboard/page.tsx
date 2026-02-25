'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDemoState, useCurrentInvestor } from '@/contexts/DemoStateContext';
import {
  TrendingUp,
  CreditCard,
  FileText,
  Bell,
  Calendar,
  Building2,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function InvestorDashboard() {
  const { state } = useDemoState();
  const investor = useCurrentInvestor();

  if (!investor) {
    return (
      <div className="p-8 text-center">
        <p>No investor selected. Please select an investor from the sidebar.</p>
      </div>
    );
  }

  const allInstallments = investor.properties.flatMap(p => 
    p.installments.map(i => ({ ...i, projectId: p.projectId, unitNumber: p.unitNumber }))
  );
  const paidCount = allInstallments.filter(i => i.status === 'paid').length;
  const overdueCount = allInstallments.filter(i => i.status === 'overdue').length;
  const upcomingInstallments = allInstallments.filter(i => i.status === 'upcoming' || i.status === 'overdue');
  
  const totalPaid = allInstallments.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalDue = allInstallments.reduce((sum, i) => sum + i.amount, 0);
  const paymentProgress = (totalPaid / totalDue) * 100;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {investor.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-500">
            Here&apos;s an overview of your property investments.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/investor/documents">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </Button>
          </Link>
          <Link href="/investor/payments">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="w-4 h-4 mr-2" />
              Make Payment
            </Button>
          </Link>
        </div>
      </div>

      {/* Alert for overdue payments */}
      {overdueCount > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div className="flex-1">
              <p className="font-medium text-red-800">
                You have {overdueCount} overdue installment{overdueCount > 1 ? 's' : ''}
              </p>
              <p className="text-sm text-red-600">
                Please make payment to avoid late fees and penalties.
              </p>
            </div>
            <Link href="/investor/payments">
              <Button variant="destructive" size="sm">
                Pay Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <Badge variant="secondary">{investor.type}</Badge>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Investment</p>
            <p className="text-2xl font-bold text-gray-900">
              ৳{(investor.totalInvestment / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {investor.properties.length} properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-emerald-600 text-sm font-medium flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                +{((investor.totalAppreciation / investor.totalInvestment) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Appreciation</p>
            <p className="text-2xl font-bold text-gray-900">
              ৳{(investor.totalAppreciation / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Current portfolio value: ৳{((investor.totalInvestment + investor.totalAppreciation) / 100000).toFixed(1)}L
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">Payment Progress</p>
            <p className="text-2xl font-bold text-gray-900">
              {paymentProgress.toFixed(0)}%
            </p>
            <Progress value={paymentProgress} className="mt-2 h-2" />
            <p className="text-xs text-gray-400 mt-2">
              {paidCount} of {allInstallments.length} installments paid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <Badge className={investor.kycStatus === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                {investor.kycStatus === 'verified' ? 'Verified' : 'Pending'}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mb-1">Documents</p>
            <p className="text-2xl font-bold text-gray-900">
              {investor.properties.flatMap(p => p.documents).length}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Available in vault
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Properties */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Properties</CardTitle>
              <CardDescription>Overview of your property investments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {investor.properties.map((property) => {
                const project = state.projects.find(p => p.id === property.projectId);
                const propertyProgress = project?.milestones.filter(m => m.status === 'completed').length || 0;
                const totalMilestones = project?.milestones.length || 5;
                
                return (
                  <div key={property.unitNumber} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {project?.name || property.projectId}
                        </h3>
                        <p className="text-sm text-gray-500">Unit: {property.unitNumber}</p>
                      </div>
                      <Badge variant="outline">
                        {propertyProgress}/{totalMilestones} Milestones
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Purchase Price</p>
                        <p className="font-medium">৳{(property.purchasePrice / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current Value</p>
                        <p className="font-medium text-emerald-600">৳{(property.currentValue / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Appreciation</p>
                        <p className="font-medium text-emerald-600">
                          +{(((property.currentValue - property.purchasePrice) / property.purchasePrice) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <Progress value={(propertyProgress / totalMilestones) * 100} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Payments */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingInstallments.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No upcoming payments
                </p>
              ) : (
                upcomingInstallments.slice(0, 5).map((inst) => (
                  <div
                    key={inst.id}
                    className={`p-3 rounded-lg border ${
                      inst.status === 'overdue' ? 'border-red-200 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        {inst.unitNumber}
                      </span>
                      {inst.status === 'overdue' ? (
                        <Badge variant="destructive" className="text-xs">Overdue</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Upcoming
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg font-bold">৳{inst.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">
                      Due: {format(new Date(inst.dueDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                ))
              )}
              {upcomingInstallments.length > 0 && (
                <Link href="/investor/payments">
                  <Button variant="outline" className="w-full">
                    View All Payments
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/investor/documents" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-3" />
                  Download Documents
                </Button>
              </Link>
              <Link href="/investor/resale" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-3" />
                  List for Resale
                </Button>
              </Link>
              <Link href="/investor/rental" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <Building2 className="w-4 h-4 mr-3" />
                  Manage Rentals
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
