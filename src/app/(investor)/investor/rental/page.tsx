'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useCurrentInvestor, useDemoState } from '@/contexts/DemoStateContext';
import {
  Key,
  Users,
  Wrench,
  Plus,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Phone,
  Mail,
  Calendar,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function RentalPage() {
  const investor = useCurrentInvestor();
  const { state } = useDemoState();

  if (!investor) {
    return <div className="p-8">No investor selected</div>;
  }

  const myRentals = state.rentalUnits.filter((r) => r.ownerId === investor.id);
  const occupiedUnits = myRentals.filter((r) => r.status === 'occupied');
  const totalRentIncome = occupiedUnits.reduce((sum, u) => sum + u.monthlyRent, 0);
  const openTickets = myRentals.flatMap((u) => u.maintenanceTickets).filter((t) => t.status !== 'resolved').length;

  const statusConfig = {
    occupied: { color: 'bg-emerald-100 text-emerald-700', label: 'Occupied' },
    vacant: { color: 'bg-gray-100 text-gray-700', label: 'Vacant' },
    listed: { color: 'bg-blue-100 text-blue-700', label: 'Listed' },
  };

  const ticketStatusConfig = {
    open: { color: 'bg-red-100 text-red-700', icon: AlertTriangle },
    in_progress: { color: 'bg-amber-100 text-amber-700', icon: Clock },
    resolved: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  };

  const handleListForRent = () => {
    toast.success('Request submitted', {
      description: 'Our team will contact you about listing your property for rent.',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rental Management</h1>
          <p className="text-gray-500">
            Manage your rental properties, tenants, and maintenance.
          </p>
        </div>
        <Button onClick={handleListForRent} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          List for Rent
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">My Rentals</p>
                <p className="text-xl font-bold">{myRentals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Tenants</p>
                <p className="text-xl font-bold">{occupiedUnits.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="text-xl font-bold">৳{totalRentIncome.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Open Tickets</p>
                <p className="text-xl font-bold">{openTickets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {myRentals.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Key className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No rental properties</h3>
            <p className="text-gray-500 mb-4">
              Start earning passive income by listing your property for rent.
            </p>
            <Button onClick={handleListForRent}>List Property for Rent</Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="units">
          <TabsList>
            <TabsTrigger value="units">My Units ({myRentals.length})</TabsTrigger>
            <TabsTrigger value="tenants">Tenants ({occupiedUnits.length})</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance ({openTickets})</TabsTrigger>
          </TabsList>

          <TabsContent value="units" className="mt-6 space-y-4">
            {myRentals.map((unit) => {
              const project = state.projects.find((p) => p.id === unit.projectId);
              const config = statusConfig[unit.status];

              return (
                <Card key={unit.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{project?.name}</h3>
                          <p className="text-sm text-gray-500">Unit: {unit.unitNumber}</p>
                          <Badge className={`mt-2 ${config.color}`}>{config.label}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">
                          ৳{unit.monthlyRent.toLocaleString()}/month
                        </p>
                        {unit.tenant && (
                          <p className="text-sm text-gray-500 mt-1">
                            Tenant: {unit.tenant.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {unit.status === 'occupied' && unit.rentHistory.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium mb-2">Recent Rent Status</p>
                        <div className="flex gap-2">
                          {unit.rentHistory.slice(0, 3).map((rent) => (
                            <Badge
                              key={rent.month}
                              variant={rent.status === 'paid' ? 'default' : 'destructive'}
                              className={rent.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : ''}
                            >
                              {rent.month}: {rent.status === 'paid' ? 'Paid' : 'Pending'}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="tenants" className="mt-6 space-y-4">
            {occupiedUnits.map((unit) => {
              const project = state.projects.find((p) => p.id === unit.projectId);
              const tenant = unit.tenant!;

              return (
                <Card key={unit.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{tenant.name}</h3>
                          <p className="text-sm text-gray-500">
                            {project?.name} - Unit {unit.unitNumber}
                          </p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {tenant.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {tenant.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-emerald-100 text-emerald-700">Active Lease</Badge>
                        <p className="text-sm text-gray-500 mt-2 flex items-center justify-end gap-1">
                          <Calendar className="w-4 h-4" />
                          {tenant.leaseStart} to {tenant.leaseEnd}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {occupiedUnits.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No active tenants</h3>
                  <p className="text-gray-500">
                    Your occupied units will show tenant information here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6 space-y-4">
            {myRentals.flatMap((unit) =>
              unit.maintenanceTickets.map((ticket) => {
                const project = state.projects.find((p) => p.id === unit.projectId);
                const config = ticketStatusConfig[ticket.status];
                const Icon = config.icon;

                return (
                  <Card key={ticket.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{ticket.issue}</h3>
                            <p className="text-sm text-gray-500">
                              {project?.name} - Unit {unit.unitNumber}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Reported: {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        <Badge className={config.color}>
                          {ticket.status === 'open' ? 'Open' : ticket.status === 'in_progress' ? 'In Progress' : 'Resolved'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}

            {myRentals.flatMap((u) => u.maintenanceTickets).length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No maintenance tickets</h3>
                  <p className="text-gray-500">
                    All your properties are in good condition.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Key className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Full-Service Rental Management</h3>
              <p className="text-sm text-blue-700">
                SPML handles tenant screening, lease agreements, rent collection, and maintenance 
                coordination. Focus on earning passive income while we manage the day-to-day operations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
