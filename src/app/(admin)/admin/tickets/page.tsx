'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  Ticket,
  Search,
  Plus,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddTicketForm } from '@/components/demo-forms';

export default function TicketsPage() {
  const { state } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTickets = state.supportTickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    open: { icon: AlertCircle, color: 'bg-red-100 text-red-700', label: 'Open' },
    in_progress: { icon: Clock, color: 'bg-amber-100 text-amber-700', label: 'In Progress' },
    resolved: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700', label: 'Resolved' },
  };

  const priorityConfig = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-red-100 text-red-700',
  };

  const openCount = state.supportTickets.filter((t) => t.status === 'open').length;
  const inProgressCount = state.supportTickets.filter((t) => t.status === 'in_progress').length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-500">
            Manage customer inquiries and support requests.
          </p>
        </div>
<AddTicketForm />
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Tickets</p>
                <p className="text-xl font-bold">{state.supportTickets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Open</p>
                <p className="text-xl font-bold">{openCount}</p>
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
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-xl font-bold">{inProgressCount}</p>
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
                <p className="text-sm text-gray-500">Resolved</p>
                <p className="text-xl font-bold">
                  {state.supportTickets.filter((t) => t.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => {
          const status = statusConfig[ticket.status];
          const StatusIcon = status.icon;
          const investor = state.investors.find((i) => i.id === ticket.userId);

          return (
            <Card key={ticket.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status.color}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <Badge className={priorityConfig[ticket.priority]}>
                          {ticket.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>From: {investor?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>Created: {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={status.color}>{status.label}</Badge>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredTickets.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No tickets found</h3>
              <p className="text-gray-500">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'All support requests will appear here.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
