'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  Users,
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Target,
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LeadsPage() {
  const { state, computed, addLead } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterScore, setFilterScore] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLeads = state.leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = filterScore === 'all' || lead.score === filterScore;
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesScore && matchesStatus;
  });

  const scoreConfig = {
    hot: { bg: 'bg-red-100 text-red-700', label: 'HOT', icon: '🔥' },
    warm: { bg: 'bg-amber-100 text-amber-700', label: 'WARM', icon: '☀️' },
    cold: { bg: 'bg-gray-100 text-gray-700', label: 'COLD', icon: '❄️' },
  };

  const statusConfig = {
    new: { bg: 'bg-blue-100 text-blue-700', label: 'New' },
    contacted: { bg: 'bg-purple-100 text-purple-700', label: 'Contacted' },
    qualified: { bg: 'bg-amber-100 text-amber-700', label: 'Qualified' },
    negotiation: { bg: 'bg-emerald-100 text-emerald-700', label: 'Negotiation' },
    closed: { bg: 'bg-green-100 text-green-700', label: 'Closed' },
    lost: { bg: 'bg-red-100 text-red-700', label: 'Lost' },
  };

  const handleAddLead = () => {
    addLead({
      name: 'New Lead',
      score: 'warm',
      interestedProject: 'purbachal',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-500">
            Track and manage your sales leads with AI-powered scoring.
          </p>
        </div>
        <Button onClick={handleAddLead} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
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
                <p className="text-sm text-gray-500">Total Leads</p>
                <p className="text-xl font-bold">{state.leads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">HOT Leads</p>
                <p className="text-xl font-bold">{computed.hotLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">☀️</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">WARM Leads</p>
                <p className="text-xl font-bold">{computed.warmLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Negotiation</p>
                <p className="text-xl font-bold">
                  {state.leads.filter((l) => l.status === 'negotiation').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterScore} onValueChange={setFilterScore}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scores</SelectItem>
            <SelectItem value="hot">🔥 HOT</SelectItem>
            <SelectItem value="warm">☀️ WARM</SelectItem>
            <SelectItem value="cold">❄️ COLD</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Interested In</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Drip Stage</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.slice(0, 20).map((lead) => {
                const score = scoreConfig[lead.score];
                const status = statusConfig[lead.status];
                const project = state.projects.find((p) => p.id === lead.interestedProject);

                return (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <div className="text-sm text-gray-500 flex gap-3">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={score.bg}>
                        {score.icon} {score.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{project?.name || lead.interestedProject}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{lead.budget}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{lead.source}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={status.bg}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < lead.dripStage ? 'bg-emerald-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {format(new Date(lead.createdAt), 'MMM dd')}
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
