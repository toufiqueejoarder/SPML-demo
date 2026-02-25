'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { pageViews, monthlyCollections } from '@/lib/demo-data';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  MousePointer,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
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
  AreaChart,
  Area,
} from 'recharts';

export default function AnalyticsPage() {
  const { computed } = useDemoState();

  const trafficData = [
    { date: 'Feb 19', visitors: 820, pageViews: 2100, leads: 12 },
    { date: 'Feb 20', visitors: 940, pageViews: 2400, leads: 18 },
    { date: 'Feb 21', visitors: 1100, pageViews: 2900, leads: 24 },
    { date: 'Feb 22', visitors: 890, pageViews: 2200, leads: 15 },
    { date: 'Feb 23', visitors: 1250, pageViews: 3200, leads: 28 },
    { date: 'Feb 24', visitors: 1400, pageViews: 3600, leads: 32 },
    { date: 'Feb 25', visitors: 980, pageViews: 2500, leads: 20 },
  ];

  const trafficSources = [
    { source: 'Google Organic', visitors: 4200, percentage: 35 },
    { source: 'Facebook Ads', visitors: 2880, percentage: 24 },
    { source: 'Direct', visitors: 2160, percentage: 18 },
    { source: 'Google Ads', visitors: 1440, percentage: 12 },
    { source: 'Referral', visitors: 1320, percentage: 11 },
  ];

  const conversionFunnel = [
    { stage: 'Website Visitors', count: 12000, percentage: 100 },
    { stage: 'Property Viewed', count: 4800, percentage: 40 },
    { stage: 'Calculator Used', count: 2400, percentage: 20 },
    { stage: 'Contact Form', count: 360, percentage: 3 },
    { stage: 'Lead Created', count: 180, percentage: 1.5 },
    { stage: 'Qualified Lead', count: 54, percentage: 0.45 },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketing Analytics</h1>
        <p className="text-gray-500">
          Track website performance, traffic sources, and conversion metrics.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +12%
              </Badge>
            </div>
            <p className="text-2xl font-bold">34,580</p>
            <p className="text-sm text-gray-500">Page Views (This Month)</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +8%
              </Badge>
            </div>
            <p className="text-2xl font-bold">8,420</p>
            <p className="text-sm text-gray-500">Unique Visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MousePointer className="w-5 h-5 text-amber-600" />
              <Badge className="bg-amber-100 text-amber-700 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" />
                -2%
              </Badge>
            </div>
            <p className="text-2xl font-bold">3.2%</p>
            <p className="text-sm text-gray-500">Conversion Rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +24%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{computed.hotLeads}</p>
            <p className="text-sm text-gray-500">HOT Leads Generated</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>Daily visitors and page views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#10b981"
                    fill="#10b98120"
                    name="Page Views"
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#6366f1"
                    fill="#6366f120"
                    name="Visitors"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{source.visitors.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 ml-2">({source.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={source.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>Visitor journey from landing to qualified lead</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 overflow-x-auto py-4">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="flex items-center">
                <div
                  className="flex flex-col items-center"
                  style={{
                    width: `${Math.max(80, stage.percentage * 2)}px`,
                  }}
                >
                  <div
                    className="bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{
                      width: `${Math.max(60, stage.percentage * 1.5)}px`,
                      height: `${Math.max(40, stage.percentage * 0.8)}px`,
                    }}
                  >
                    {stage.count}
                  </div>
                  <p className="text-xs text-center mt-2 text-gray-600">{stage.stage}</p>
                  <p className="text-xs text-gray-400">{stage.percentage}%</p>
                </div>
                {index < conversionFunnel.length - 1 && (
                  <div className="text-gray-300 mx-2">→</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pageViews.map((page, index) => (
              <div key={page.page} className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-400 w-8">{index + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{page.page}</span>
                    <span className="text-sm text-gray-500">
                      {page.views.toLocaleString()} views
                    </span>
                  </div>
                  <Progress value={(page.views / pageViews[0].views) * 100} className="h-2" />
                </div>
                <div className="text-right text-sm text-gray-500 w-32">
                  <p>{page.uniqueVisitors.toLocaleString()} unique</p>
                  <p>Avg: {page.avgDuration}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
