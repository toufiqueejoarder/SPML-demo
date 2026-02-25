'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import {
  AlertTriangle,
  TrendingUp,
  Building2,
  Target,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function GapAnalysisPage() {
  const { state, computed } = useDemoState();

  const inventoryData = [
    { name: 'Sold', value: computed.totalSold, color: '#10b981' },
    { name: 'Booked', value: computed.totalBooked, color: '#f59e0b' },
    { name: 'Available', value: computed.totalAvailable, color: '#6366f1' },
  ];

  const demandVsSupply = [
    {
      project: 'Bashundhara',
      demand: 95,
      supply: 10,
      gap: 'Critical Shortage',
      status: 'critical',
    },
    {
      project: 'Purbachal',
      demand: 88,
      supply: 25,
      gap: 'High Demand',
      status: 'high',
    },
    {
      project: 'Secure Green',
      demand: 55,
      supply: 0,
      gap: 'Sold Out',
      status: 'soldout',
    },
  ];

  const priceGaps = [
    {
      segment: 'Budget (৳20-30L)',
      demand: 45,
      inventory: 20,
      gap: 25,
      recommendation: 'Consider more Keraniganj developments',
    },
    {
      segment: 'Mid-range (৳30-45L)',
      demand: 35,
      inventory: 55,
      gap: -20,
      recommendation: 'Oversupply - focus marketing here',
    },
    {
      segment: 'Premium (৳45-60L)',
      demand: 15,
      inventory: 20,
      gap: -5,
      recommendation: 'Balanced - maintain current levels',
    },
    {
      segment: 'Luxury (৳60L+)',
      demand: 5,
      inventory: 5,
      gap: 0,
      recommendation: 'Well matched to demand',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-amber-100 text-amber-700';
      case 'soldout':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-emerald-100 text-emerald-700';
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Availability Gap Analysis</h1>
        <p className="text-gray-500">
          Identify mismatches between inventory supply and market demand.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inventory Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Distribution</CardTitle>
            <CardDescription>Current status of all units</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {inventoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demand vs Supply */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Demand vs Supply Gap
            </CardTitle>
            <CardDescription>By project location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {demandVsSupply.map((item) => (
                <div key={item.project} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{item.project}</span>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.gap}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Demand Score</span>
                        <span className="font-medium">{item.demand}%</span>
                      </div>
                      <Progress value={item.demand} className="h-2 bg-red-100 [&>div]:bg-red-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Available Units</span>
                        <span className="font-medium">{item.supply}</span>
                      </div>
                      <Progress value={item.supply} max={50} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Segment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Price Segment Gap Analysis</CardTitle>
          <CardDescription>
            Compare demand distribution with inventory allocation by price segment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {priceGaps.map((segment) => (
              <div key={segment.segment} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{segment.segment}</h3>
                    <p className="text-sm text-gray-500">{segment.recommendation}</p>
                  </div>
                  <Badge
                    className={
                      segment.gap > 10
                        ? 'bg-red-100 text-red-700'
                        : segment.gap < -10
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }
                  >
                    {segment.gap > 0 ? `+${segment.gap}% shortage` : segment.gap < 0 ? `${Math.abs(segment.gap)}% oversupply` : 'Balanced'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Market Demand</span>
                      <span className="font-medium">{segment.demand}%</span>
                    </div>
                    <Progress value={segment.demand} className="h-3 bg-red-100 [&>div]:bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Inventory Allocation</span>
                      <span className="font-medium">{segment.inventory}%</span>
                    </div>
                    <Progress value={segment.inventory} className="h-3 bg-blue-100 [&>div]:bg-blue-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Strategic Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="font-medium">Immediate Action</span>
              </div>
              <p className="text-sm text-gray-600">
                Bashundhara project needs urgent restocking. Consider acquiring adjacent plots or launching phase 2.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="font-medium">Short-term</span>
              </div>
              <p className="text-sm text-gray-600">
                Focus marketing efforts on mid-range segment to balance oversupply with increased demand.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">Long-term</span>
              </div>
              <p className="text-sm text-gray-600">
                Expand budget segment offerings in emerging areas like Keraniganj to capture untapped demand.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
