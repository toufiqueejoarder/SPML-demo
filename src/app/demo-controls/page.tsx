'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useDemoState, UserRole, PaymentStatus, DemandLevel, LeadDistribution } from '@/contexts/DemoStateContext';
import { toast } from 'sonner';
import {
  Settings,
  Users,
  CreditCard,
  TrendingUp,
  Target,
  RotateCcw,
  Play,
  AlertTriangle,
  Building2,
  UserPlus,
  CheckCircle2,
  Home,
  User,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function DemoControlsPage() {
  const {
    state,
    computed,
    setRole,
    setInvestor,
    setPaymentStatus,
    setDemandLevel,
    setLeadDistribution,
    toggleDemoIndicator,
    simulatePayment,
    markOverdue,
    addLead,
    advanceMilestone,
    resetAll,
  } = useDemoState();

  const handleSimulatePayment = () => {
    const investor = computed.currentInvestor;
    if (!investor) {
      toast.error('No investor selected');
      return;
    }
    const upcomingInst = investor.properties
      .flatMap(p => p.installments)
      .find(i => i.status === 'upcoming' || i.status === 'overdue');
    
    if (upcomingInst) {
      simulatePayment(investor.id, upcomingInst.id);
      toast.success('Payment simulated successfully!', {
        description: `৳${upcomingInst.amount.toLocaleString()} marked as paid`,
      });
    } else {
      toast.info('No pending installments found');
    }
  };

  const handleMarkOverdue = () => {
    const investor = computed.currentInvestor;
    if (!investor) {
      toast.error('No investor selected');
      return;
    }
    const upcomingInst = investor.properties
      .flatMap(p => p.installments)
      .find(i => i.status === 'upcoming');
    
    if (upcomingInst) {
      markOverdue(investor.id, upcomingInst.id);
      toast.warning('Installment marked as overdue', {
        description: `৳${upcomingInst.amount.toLocaleString()} is now overdue`,
      });
    } else {
      toast.info('No upcoming installments to mark overdue');
    }
  };

  const handleAddLead = () => {
    const names = ['Anika Rahman', 'Tariq Ahmed', 'Sadia Khan', 'Rafiq Hasan', 'Nadia Begum'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const scores: Array<'hot' | 'warm' | 'cold'> = ['hot', 'warm', 'cold'];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];
    
    addLead({
      name: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@email.com`,
      score: randomScore,
      interestedProject: state.projects[Math.floor(Math.random() * state.projects.length)].id,
      source: 'Demo Event',
    });
    
    toast.success('New lead added!', {
      description: `${randomName} (${randomScore.toUpperCase()}) added to the system`,
    });
  };

  const handleAdvanceMilestone = () => {
    const projectWithProgress = state.projects.find(p => 
      p.milestones.some(m => m.status === 'in_progress')
    );
    
    if (projectWithProgress) {
      advanceMilestone(projectWithProgress.id);
      toast.success('Milestone advanced!', {
        description: `${projectWithProgress.name} milestone completed`,
      });
    } else {
      toast.info('No milestones to advance');
    }
  };

  const handleReset = () => {
    resetAll();
    toast.success('Demo data reset', {
      description: 'All data has been restored to initial state',
    });
  };

  const roleIcons = {
    public: Home,
    investor: User,
    admin: Shield,
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="font-bold text-lg">Demo Control Panel</h1>
              <p className="text-xs text-slate-400">Internal use only • Ctrl+Shift+D</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-emerald-600">
              Role: {state.settings.currentRole.toUpperCase()}
            </Badge>
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700">
                <Home className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Role & Settings */}
          <div className="space-y-6">
            {/* Role Switching */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Role Switching
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Change the active user role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={state.settings.currentRole}
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="space-y-3"
                >
                  {(['public', 'investor', 'admin'] as UserRole[]).map((role) => {
                    const Icon = roleIcons[role];
                    return (
                      <div key={role} className="flex items-center space-x-3">
                        <RadioGroupItem value={role} id={role} className="border-slate-500" />
                        <Label htmlFor={role} className="flex items-center gap-2 cursor-pointer">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="capitalize">{role}</span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>

                <Separator className="bg-slate-700" />

                <div className="space-y-2">
                  <Label className="text-slate-300">Active Investor</Label>
                  <RadioGroup
                    value={state.settings.currentInvestorId}
                    onValueChange={setInvestor}
                    className="space-y-2"
                  >
                    {state.investors.map((inv) => (
                      <div key={inv.id} className="flex items-center space-x-3">
                        <RadioGroupItem value={inv.id} id={inv.id} className="border-slate-500" />
                        <Label htmlFor={inv.id} className="cursor-pointer text-sm">
                          {inv.name}
                          {inv.kycStatus !== 'verified' && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              KYC {inv.kycStatus}
                            </Badge>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Display Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Show Demo Indicator</Label>
                  <Switch
                    checked={state.settings.showDemoIndicator}
                    onCheckedChange={toggleDemoIndicator}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 2: State Toggles */}
          <div className="space-y-6">
            {/* Payment Status */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Status
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Control payment states for demo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={state.settings.paymentStatus}
                  onValueChange={(value) => setPaymentStatus(value as PaymentStatus)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="all_paid" id="all_paid" className="border-slate-500" />
                    <Label htmlFor="all_paid" className="cursor-pointer flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      All Paid
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="upcoming" id="upcoming" className="border-slate-500" />
                    <Label htmlFor="upcoming" className="cursor-pointer flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      Normal (with upcoming)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="overdue" id="overdue" className="border-slate-500" />
                    <Label htmlFor="overdue" className="cursor-pointer flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Has Overdue
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Demand Level */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Inventory Demand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={state.settings.demandLevel}
                  onValueChange={(value) => setDemandLevel(value as DemandLevel)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="normal" id="normal" className="border-slate-500" />
                    <Label htmlFor="normal" className="cursor-pointer">Normal Demand</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="high" id="high" className="border-slate-500" />
                    <Label htmlFor="high" className="cursor-pointer flex items-center gap-2">
                      High Demand
                      <Badge className="bg-red-600 text-xs">URGENT</Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Lead Distribution */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Lead Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={state.settings.leadDistribution}
                  onValueChange={(value) => setLeadDistribution(value as LeadDistribution)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="balanced" id="balanced" className="border-slate-500" />
                    <Label htmlFor="balanced" className="cursor-pointer">Balanced</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="hot_heavy" id="hot_heavy" className="border-slate-500" />
                    <Label htmlFor="hot_heavy" className="cursor-pointer flex items-center gap-2">
                      Hot Heavy
                      <Badge className="bg-red-600 text-xs">{computed.hotLeads} HOT</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cold_heavy" id="cold_heavy" className="border-slate-500" />
                    <Label htmlFor="cold_heavy" className="cursor-pointer">Cold Heavy</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Column 3: Event Triggers */}
          <div className="space-y-6">
            {/* Trigger Events */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Trigger Events
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Simulate actions during the demo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleSimulatePayment}
                  className="w-full justify-start bg-emerald-600 hover:bg-emerald-700"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Simulate Payment
                </Button>
                <Button
                  onClick={handleMarkOverdue}
                  variant="outline"
                  className="w-full justify-start border-amber-600 text-amber-400 hover:bg-amber-900/30"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Mark Installment Overdue
                </Button>
                <Button
                  onClick={handleAddLead}
                  variant="outline"
                  className="w-full justify-start border-blue-600 text-blue-400 hover:bg-blue-900/30"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Lead
                </Button>
                <Button
                  onClick={handleAdvanceMilestone}
                  variant="outline"
                  className="w-full justify-start border-purple-600 text-purple-400 hover:bg-purple-900/30"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Advance Milestone
                </Button>
              </CardContent>
            </Card>

            {/* Current State */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Current State Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Units</span>
                  <span>{computed.totalUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Available</span>
                  <span>{computed.totalAvailable}</span>
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex justify-between">
                  <span className="text-slate-400">HOT Leads</span>
                  <Badge className="bg-red-600">{computed.hotLeads}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">WARM Leads</span>
                  <Badge className="bg-amber-600">{computed.warmLeads}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">COLD Leads</span>
                  <Badge variant="secondary">{computed.coldLeads}</Badge>
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex justify-between">
                  <span className="text-slate-400">Overdue Amount</span>
                  <span className="text-red-400">৳{(computed.totalOverdue / 100000).toFixed(1)}L</span>
                </div>
              </CardContent>
            </Card>

            {/* Reset */}
            <Card className="bg-slate-800 border-red-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Reset Demo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">
                  Reset all data to the initial state. This cannot be undone.
                </p>
                <Button
                  onClick={handleReset}
                  variant="destructive"
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
