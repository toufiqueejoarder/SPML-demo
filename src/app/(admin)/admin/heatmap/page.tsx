'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { demandHeatmapData } from '@/lib/demo-data';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  Map,
  TrendingUp,
  Building2,
  MapPin,
} from 'lucide-react';

export default function HeatmapPage() {
  const { state } = useDemoState();

  const sortedRegions = [...demandHeatmapData].sort((a, b) => b.demand - a.demand);

  const getDemandColor = (demand: number) => {
    if (demand >= 80) return 'bg-red-500';
    if (demand >= 60) return 'bg-orange-500';
    if (demand >= 40) return 'bg-amber-500';
    return 'bg-blue-500';
  };

  const getDemandLabel = (demand: number) => {
    if (demand >= 80) return 'Very High';
    if (demand >= 60) return 'High';
    if (demand >= 40) return 'Medium';
    return 'Low';
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Demand Heatmap</h1>
        <p className="text-gray-500">
          Visualize property demand across different regions of Dhaka.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                Regional Demand Map
              </CardTitle>
              <CardDescription>
                Heat intensity indicates demand level based on inquiries, page views, and lead quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Map Placeholder */}
              <div className="relative h-[500px] bg-gray-100 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Map className="w-16 h-16 mx-auto mb-4" />
                    <p className="font-medium">Interactive Heatmap</p>
                    <p className="text-sm">Powered by Leaflet + OpenStreetMap</p>
                  </div>
                </div>
                
                {/* Overlay markers */}
                {demandHeatmapData.map((region, index) => (
                  <div
                    key={region.region}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${20 + Math.floor(index / 4) * 25}%`,
                    }}
                  >
                    <div
                      className={`w-12 h-12 ${getDemandColor(region.demand)} rounded-full opacity-70 animate-pulse flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {region.demand}
                    </div>
                    <div className="absolute -bottom-6 whitespace-nowrap text-xs font-medium">
                      {region.region}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full" />
                  <span className="text-sm">Very High (80+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full" />
                  <span className="text-sm">High (60-79)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full" />
                  <span className="text-sm">Medium (40-59)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  <span className="text-sm">Low (&lt;40)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Rankings</CardTitle>
              <CardDescription>
                Demand score based on multiple factors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedRegions.map((region, index) => (
                <div key={region.region} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 w-6">
                        #{index + 1}
                      </span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{region.region}</span>
                    </div>
                    <Badge className={`${getDemandColor(region.demand)} text-white`}>
                      {region.demand}%
                    </Badge>
                  </div>
                  <Progress value={region.demand} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">Bashundhara R/A</span>
                </div>
                <p className="text-sm text-red-700">
                  Highest demand zone. Only 10 units remaining.
                  Consider priority marketing.
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Purbachal</span>
                </div>
                <p className="text-sm text-orange-700">
                  Metro rail connectivity driving demand.
                  25 units available - strong momentum.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-amber-800">Uttara</span>
                </div>
                <p className="text-sm text-amber-700">
                  Emerging interest from NRB investors.
                  Consider new project launch.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
