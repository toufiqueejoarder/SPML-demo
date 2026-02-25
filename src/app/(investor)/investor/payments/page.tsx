'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useCurrentInvestor, useDemoState } from '@/contexts/DemoStateContext';
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Wallet,
  Smartphone,
  Building,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function PaymentsPage() {
  const investor = useCurrentInvestor();
  const { state, simulatePayment } = useDemoState();

  if (!investor) {
    return <div className="p-8">No investor selected</div>;
  }

  const allInstallments = investor.properties.flatMap((prop) => {
    const project = state.projects.find((p) => p.id === prop.projectId);
    return prop.installments.map((inst) => ({
      ...inst,
      projectName: project?.name || prop.projectId,
      unitNumber: prop.unitNumber,
      propertyId: prop.projectId,
    }));
  });

  const paidInstallments = allInstallments.filter((i) => i.status === 'paid');
  const upcomingInstallments = allInstallments.filter((i) => i.status === 'upcoming');
  const overdueInstallments = allInstallments.filter((i) => i.status === 'overdue');

  const totalPaid = paidInstallments.reduce((sum, i) => sum + i.amount, 0);
  const totalDue = allInstallments.reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = overdueInstallments.reduce((sum, i) => sum + i.amount, 0);
  const paymentProgress = (totalPaid / totalDue) * 100;

  const handlePayment = (installmentId: string) => {
    simulatePayment(investor.id, installmentId);
    toast.success('Payment successful!', {
      description: 'Your payment has been processed. Receipt sent to your email.',
    });
  };

  const statusConfig = {
    paid: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Paid' },
    upcoming: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Upcoming' },
    overdue: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100', label: 'Overdue' },
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments & Financial Ledger</h1>
          <p className="text-gray-500">
            Track your payment history and upcoming installments.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="text-xl font-bold">৳{(totalPaid / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-xl font-bold">{upcomingInstallments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-xl font-bold text-red-600">৳{(totalOverdue / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-2">Payment Progress</p>
            <Progress value={paymentProgress} className="h-2 mb-2" />
            <p className="text-sm font-medium">{paymentProgress.toFixed(0)}% Complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {overdueInstallments.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <p className="font-medium text-red-800">
                  {overdueInstallments.length} overdue installment{overdueInstallments.length > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-red-600">
                  Total: ৳{totalOverdue.toLocaleString()}
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Pay Now</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make Payment</DialogTitle>
                  <DialogDescription>
                    Choose your preferred payment method
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-16"
                    onClick={() => handlePayment(overdueInstallments[0].id)}
                  >
                    <Smartphone className="w-6 h-6 mr-4 text-pink-500" />
                    <div className="text-left">
                      <p className="font-medium">bKash / Nagad / Rocket</p>
                      <p className="text-sm text-gray-500">Mobile banking</p>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-16"
                    onClick={() => handlePayment(overdueInstallments[0].id)}
                  >
                    <CreditCard className="w-6 h-6 mr-4 text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, AMEX</p>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-16"
                    onClick={() => handlePayment(overdueInstallments[0].id)}
                  >
                    <Building className="w-6 h-6 mr-4 text-emerald-500" />
                    <div className="text-left">
                      <p className="font-medium">Bank Transfer (EFT)</p>
                      <p className="text-sm text-gray-500">Via SSLCommerz</p>
                    </div>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* Payment History Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule & History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({allInstallments.length})</TabsTrigger>
              <TabsTrigger value="paid">Paid ({paidInstallments.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming ({upcomingInstallments.length})</TabsTrigger>
              <TabsTrigger value="overdue">Overdue ({overdueInstallments.length})</TabsTrigger>
            </TabsList>

            {['all', 'paid', 'upcoming', 'overdue'].map((tab) => {
              const installments =
                tab === 'all'
                  ? allInstallments
                  : tab === 'paid'
                  ? paidInstallments
                  : tab === 'upcoming'
                  ? upcomingInstallments
                  : overdueInstallments;

              return (
                <TabsContent key={tab} value={tab} className="mt-4">
                  {installments.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      No {tab === 'all' ? '' : tab} installments
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {installments.map((inst) => {
                        const config = statusConfig[inst.status];
                        const Icon = config.icon;
                        return (
                          <div
                            key={inst.id}
                            className={`flex items-center justify-between p-4 border rounded-lg ${
                              inst.status === 'overdue' ? 'border-red-200 bg-red-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 ${config.color}`} />
                              </div>
                              <div>
                                <p className="font-medium">{inst.projectName}</p>
                                <p className="text-sm text-gray-500">
                                  Unit {inst.unitNumber} • Due: {format(new Date(inst.dueDate), 'MMM dd, yyyy')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-bold">৳{inst.amount.toLocaleString()}</p>
                                {inst.paidDate && (
                                  <p className="text-xs text-gray-500">
                                    Paid: {format(new Date(inst.paidDate), 'MMM dd, yyyy')}
                                  </p>
                                )}
                              </div>
                              <Badge className={config.bg + ' ' + config.color}>
                                {config.label}
                              </Badge>
                              {inst.status === 'paid' && (
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              )}
                              {(inst.status === 'upcoming' || inst.status === 'overdue') && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant={inst.status === 'overdue' ? 'destructive' : 'default'}>
                                      Pay
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Pay ৳{inst.amount.toLocaleString()}</DialogTitle>
                                      <DialogDescription>
                                        {inst.projectName} - Unit {inst.unitNumber}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-3 mt-4">
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handlePayment(inst.id)}
                                      >
                                        <Smartphone className="w-5 h-5 mr-3 text-pink-500" />
                                        bKash / Nagad / Rocket
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handlePayment(inst.id)}
                                      >
                                        <CreditCard className="w-5 h-5 mr-3 text-blue-500" />
                                        Credit / Debit Card
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handlePayment(inst.id)}
                                      >
                                        <Building className="w-5 h-5 mr-3 text-emerald-500" />
                                        Bank Transfer
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
