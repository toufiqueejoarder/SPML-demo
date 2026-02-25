'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDemoState } from '@/contexts/DemoStateContext';
import { toast } from 'sonner';
import {
  Mail,
  Play,
  Pause,
  Users,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { AddCampaignForm } from '@/components/demo-forms';

export default function DripCampaignsPage() {
  const { state, computed } = useDemoState();

  const campaigns = [
    {
      id: 'welcome',
      name: 'Welcome Series',
      status: 'active',
      type: 'email',
      stages: 5,
      enrolled: 156,
      completed: 89,
      openRate: 68,
      clickRate: 24,
    },
    {
      id: 'hot-leads',
      name: 'HOT Lead Nurture',
      status: 'active',
      type: 'email',
      stages: 3,
      enrolled: computed.hotLeads,
      completed: 2,
      openRate: 82,
      clickRate: 45,
    },
    {
      id: 'warm-leads',
      name: 'WARM Lead Engagement',
      status: 'active',
      type: 'email',
      stages: 4,
      enrolled: computed.warmLeads,
      completed: 3,
      openRate: 54,
      clickRate: 18,
    },
    {
      id: 'nrb',
      name: 'NRB Investor Special',
      status: 'active',
      type: 'whatsapp',
      stages: 6,
      enrolled: 45,
      completed: 12,
      openRate: 92,
      clickRate: 38,
    },
    {
      id: 'reactivation',
      name: 'Cold Lead Reactivation',
      status: 'paused',
      type: 'email',
      stages: 3,
      enrolled: 78,
      completed: 0,
      openRate: 22,
      clickRate: 5,
    },
  ];

  const dripStages = [
    { stage: 1, name: 'Welcome Email', delay: 'Immediate', action: 'email' },
    { stage: 2, name: 'Property Showcase', delay: '2 days', action: 'email' },
    { stage: 3, name: 'ROI Calculator Link', delay: '4 days', action: 'sms' },
    { stage: 4, name: 'Video Tour', delay: '7 days', action: 'whatsapp' },
    { stage: 5, name: 'Callback Offer', delay: '10 days', action: 'email' },
  ];

  const leadsInPipeline = state.leads.reduce((acc, lead) => {
    const stage = lead.dripStage;
    acc[stage] = (acc[stage] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drip Campaigns</h1>
          <p className="text-gray-500">
            Automated lead nurturing workflows and engagement sequences.
          </p>
        </div>
<AddCampaignForm />
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Campaigns</p>
                <p className="text-xl font-bold">
                  {campaigns.filter((c) => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Leads in Pipeline</p>
                <p className="text-xl font-bold">{state.leads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Emails Sent (Month)</p>
                <p className="text-xl font-bold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Open Rate</p>
                <p className="text-xl font-bold">64%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold text-lg">All Campaigns</h2>
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      campaign.type === 'email' ? 'bg-blue-100' : 'bg-emerald-100'
                    }`}>
                      {campaign.type === 'email' ? (
                        <Mail className={`w-5 h-5 ${campaign.type === 'email' ? 'text-blue-600' : 'text-emerald-600'}`} />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">
                        {campaign.stages} stages • {campaign.type.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        campaign.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {campaign.status === 'active' ? (
                        <><CheckCircle2 className="w-3 h-3 mr-1" /> Active</>
                      ) : (
                        <><Pause className="w-3 h-3 mr-1" /> Paused</>
                      )}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Enrolled</p>
                    <p className="font-semibold">{campaign.enrolled}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="font-semibold">{campaign.completed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Open Rate</p>
                    <p className="font-semibold">{campaign.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Click Rate</p>
                    <p className="font-semibold">{campaign.clickRate}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <AddCampaignForm
                    mode="edit"
                    initialData={{
                      name: campaign.name,
                      targetAudience: campaign.name.toLowerCase().includes('hot') ? 'hot_leads' : 
                                     campaign.name.toLowerCase().includes('warm') ? 'warm_leads' :
                                     campaign.name.toLowerCase().includes('nrb') ? 'nrb_investors' : 'all_leads',
                      totalSteps: campaign.stages,
                    }}
                  />
                  {campaign.status === 'active' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.success('Campaign Paused', { description: `${campaign.name} has been paused` })}
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.success('Campaign Resumed', { description: `${campaign.name} is now active` })}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Drip Pipeline */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Overview</CardTitle>
              <CardDescription>
                Leads at each drip stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dripStages.map((stage) => {
                  const count = leadsInPipeline[stage.stage] || 0;
                  const maxCount = Math.max(...Object.values(leadsInPipeline), 1);
                  return (
                    <div key={stage.stage} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {stage.stage}
                          </span>
                          <span>{stage.name}</span>
                        </div>
                        <span className="font-medium">{count}</span>
                      </div>
                      <Progress value={(count / maxCount) * 100} className="h-2" />
                      <p className="text-xs text-gray-500">{stage.delay} after previous</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sequence Preview</CardTitle>
              <CardDescription>Welcome Series flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dripStages.map((stage, index) => (
                  <div key={stage.stage} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {stage.stage}
                      </div>
                      {index < dripStages.length - 1 && (
                        <div className="w-0.5 h-8 bg-emerald-200" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-medium text-sm">{stage.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {stage.delay}
                        <Badge variant="outline" className="text-xs">
                          {stage.action}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
