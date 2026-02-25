'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDemoState } from '@/contexts/DemoStateContext';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  CreditCard,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Download,
  Mail,
  Phone,
  Shield,
  Calendar,
  DollarSign,
  Wallet,
  Send,
  Key,
  UserCheck,
  MoreVertical,
} from 'lucide-react';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InvestorDetailClientProps {
  id: string;
}

export function InvestorDetailClient({ id }: InvestorDetailClientProps) {
  const { state, simulatePayment, markOverdue } = useDemoState();

  const investor = state.investors.find((inv) => inv.id === id);

  if (!investor) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Investor not found</h1>
          <Link href="/admin/users">
            <Button>Back to Users</Button>
          </Link>
        </div>
      </div>
    );
  }

  const kycConfig = {
    verified: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700', label: 'KYC Verified' },
    pending: { icon: Clock, color: 'bg-amber-100 text-amber-700', label: 'KYC Pending' },
    rejected: { icon: XCircle, color: 'bg-red-100 text-red-700', label: 'KYC Rejected' },
  };

  const kyc = kycConfig[investor.kycStatus];
  const KycIcon = kyc.icon;

  const allInstallments = investor.properties.flatMap((prop) =>
    prop.installments.map((inst) => ({
      ...inst,
      projectId: prop.projectId,
      unitNumber: prop.unitNumber,
    }))
  );

  const paidInstallments = allInstallments.filter((i) => i.status === 'paid');
  const upcomingInstallments = allInstallments.filter((i) => i.status === 'upcoming');
  const overdueInstallments = allInstallments.filter((i) => i.status === 'overdue');

  const totalPaid = paidInstallments.reduce((sum, i) => sum + i.amount, 0);
  const totalPending = [...upcomingInstallments, ...overdueInstallments].reduce((sum, i) => sum + i.amount, 0);
  const totalDue = allInstallments.reduce((sum, i) => sum + i.amount, 0);
  const paymentProgress = totalDue > 0 ? (totalPaid / totalDue) * 100 : 0;

  const allDocuments = investor.properties.flatMap((prop) =>
    prop.documents.map((doc) => ({
      ...doc,
      projectId: prop.projectId,
      unitNumber: prop.unitNumber,
    }))
  );

  const getProjectName = (projectId: string) => {
    const project = state.projects.find((p) => p.id === projectId);
    return project?.name || projectId;
  };

  const handleSimulatePayment = (installmentId: string) => {
    simulatePayment(investor.id, installmentId);
    toast.success('Payment marked as received', {
      description: 'Installment status updated to paid',
    });
  };

  const handleMarkOverdue = (installmentId: string) => {
    markOverdue(investor.id, installmentId);
    toast.warning('Installment marked as overdue');
  };

  const handleSendReminder = () => {
    toast.success('Payment reminder sent', {
      description: `Email sent to ${investor.email}`,
    });
  };

  const handleApproveKyc = () => {
    toast.success('KYC approved', {
      description: `${investor.name}'s KYC status updated to verified`,
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </Link>
      </div>

      {/* Investor Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={investor.profileImage} />
                <AvatarFallback className="text-2xl">
                  {investor.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{investor.name}</h1>
                  <Badge variant="outline">{investor.type}</Badge>
                  <Badge className={kyc.color}>
                    <KycIcon className="w-3 h-3 mr-1" />
                    {kyc.label}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {investor.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {investor.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {investor.kycStatus === 'pending' && (
                <Button onClick={handleApproveKyc} className="bg-emerald-600 hover:bg-emerald-700">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Approve KYC
                </Button>
              )}
              <Button variant="outline" onClick={handleSendReminder}>
                <Send className="w-4 h-4 mr-2" />
                Send Reminder
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Key className="w-4 h-4 mr-2" />
                    Reset Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Suspend Account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Investment</p>
                <p className="text-xl font-bold">৳{(investor.totalInvestment / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Appreciation</p>
                <p className="text-xl font-bold text-emerald-600">
                  +৳{(investor.totalAppreciation / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Properties Owned</p>
                <p className="text-xl font-bold">{investor.properties.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                overdueInstallments.length > 0 ? 'bg-red-100' : 'bg-emerald-100'
              }`}>
                <CreditCard className={`w-6 h-6 ${
                  overdueInstallments.length > 0 ? 'text-red-600' : 'text-emerald-600'
                }`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p className={`text-xl font-bold ${
                  overdueInstallments.length > 0 ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {overdueInstallments.length > 0 
                    ? `${overdueInstallments.length} Overdue`
                    : 'On Track'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Overall Payment Progress</h3>
              <p className="text-sm text-gray-500">
                ৳{(totalPaid / 100000).toFixed(1)}L paid of ৳{(totalDue / 100000).toFixed(1)}L total
              </p>
            </div>
            <span className="text-2xl font-bold text-emerald-600">{paymentProgress.toFixed(0)}%</span>
          </div>
          <Progress value={paymentProgress} className="h-3" />
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="font-semibold text-emerald-600">{paidInstallments.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming</p>
              <p className="font-semibold text-blue-600">{upcomingInstallments.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="font-semibold text-red-600">{overdueInstallments.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Details */}
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="payments">Payment Ledger</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="mt-6">
          <div className="grid gap-4">
            {investor.properties.map((property) => {
              const project = state.projects.find((p) => p.id === property.projectId);
              const appreciation = property.currentValue - property.purchasePrice;
              const roiPercent = (appreciation / property.purchasePrice) * 100;
              const propPaid = property.installments.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
              const propTotal = property.installments.reduce((s, i) => s + i.amount, 0);
              const propProgress = propTotal > 0 ? (propPaid / propTotal) * 100 : 0;

              return (
                <Card key={property.unitNumber}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{project?.name || property.projectId}</h3>
                          <Badge variant="outline">Unit {property.unitNumber}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Purchase Date</p>
                            <p className="font-medium">{property.purchaseDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Purchase Price</p>
                            <p className="font-medium">৳{(property.purchasePrice / 100000).toFixed(1)}L</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Current Value</p>
                            <p className="font-medium text-emerald-600">৳{(property.currentValue / 100000).toFixed(1)}L</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">ROI</p>
                            <p className="font-medium text-emerald-600">+{roiPercent.toFixed(1)}%</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">Payment Progress</span>
                            <span className="text-sm font-medium">{propProgress.toFixed(0)}%</span>
                          </div>
                          <Progress value={propProgress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/properties/${property.projectId}`}>
                          <Button variant="outline" size="sm">
                            View Property
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Ledger</CardTitle>
              <CardDescription>Complete payment history for all properties</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allInstallments
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .map((installment) => (
                      <TableRow key={installment.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{getProjectName(installment.projectId)}</p>
                            <p className="text-sm text-gray-500">Unit {installment.unitNumber}</p>
                          </div>
                        </TableCell>
                        <TableCell>{installment.dueDate}</TableCell>
                        <TableCell>৳{installment.amount.toLocaleString()}</TableCell>
                        <TableCell>{installment.paidDate || '-'}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              installment.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-700'
                                : installment.status === 'overdue'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }
                          >
                            {installment.status === 'paid' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {installment.status === 'overdue' && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {installment.status === 'upcoming' && <Clock className="w-3 h-3 mr-1" />}
                            {installment.status.charAt(0).toUpperCase() + installment.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {installment.status !== 'paid' && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleSimulatePayment(installment.id)}>
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Mark as Paid
                                </DropdownMenuItem>
                                {installment.status === 'upcoming' && (
                                  <DropdownMenuItem onClick={() => handleMarkOverdue(installment.id)}>
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    Mark as Overdue
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Reminder
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>All documents across investor properties</CardDescription>
            </CardHeader>
            <CardContent>
              {allDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No documents uploaded yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{getProjectName(doc.projectId)}</p>
                            <p className="text-sm text-gray-500">Unit {doc.unitNumber}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>{doc.uploadedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
