'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCurrentInvestor, useDemoState } from '@/contexts/DemoStateContext';
import {
  TrendingUp,
  Plus,
  Eye,
  MessageSquare,
  DollarSign,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ResalePage() {
  const investor = useCurrentInvestor();
  const { state } = useDemoState();

  if (!investor) {
    return <div className="p-8">No investor selected</div>;
  }

  const myListings = state.resaleListings.filter((r) => r.ownerId === investor.id);
  const allListings = state.resaleListings.filter((r) => r.status === 'available');

  const handleListProperty = () => {
    toast.success('Request submitted', {
      description: 'Our team will contact you to list your property.',
    });
  };

  const statusConfig = {
    available: { color: 'bg-emerald-100 text-emerald-700', label: 'Available' },
    negotiation: { color: 'bg-amber-100 text-amber-700', label: 'Under Negotiation' },
    sold: { color: 'bg-gray-100 text-gray-700', label: 'Sold' },
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resale & Secondary Market</h1>
          <p className="text-gray-500">
            List your property for resale or browse available listings.
          </p>
        </div>
        <Button onClick={handleListProperty} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          List Property for Resale
        </Button>
      </div>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Browse Listings</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings ({myListings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allListings.map((listing) => {
              const project = state.projects.find((p) => p.id === listing.projectId);
              const profit = listing.askingPrice - listing.originalPrice;
              const profitPercent = ((profit / listing.originalPrice) * 100).toFixed(0);

              return (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-white/50" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{project?.name}</h3>
                        <p className="text-sm text-gray-500">Unit: {listing.unitNumber}</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">
                        Ready Property
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Asking Price</span>
                        <span className="font-bold text-emerald-600">
                          ৳{(listing.askingPrice / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Original Price</span>
                        <span>৳{(listing.originalPrice / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Appreciation</span>
                        <span className="text-emerald-600 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          +{profitPercent}%
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Inquire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {allListings.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No listings available</h3>
                <p className="text-gray-500">Check back later for new resale opportunities.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="my-listings" className="mt-6">
          {myListings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No active listings</h3>
                <p className="text-gray-500 mb-4">
                  List your property to access the secondary market.
                </p>
                <Button onClick={handleListProperty}>List Property</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {myListings.map((listing) => {
                const project = state.projects.find((p) => p.id === listing.projectId);
                const config = statusConfig[listing.status];

                return (
                  <Card key={listing.id}>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{project?.name}</h3>
                          <p className="text-sm text-gray-500">Unit: {listing.unitNumber}</p>
                          <p className="text-sm text-gray-500">Listed: {listing.listedDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-emerald-600">
                          ৳{(listing.askingPrice / 100000).toFixed(1)}L
                        </p>
                        <Badge className={config.color}>{config.label}</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Commission: {(listing.commission * 100).toFixed(1)}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Agency-Managed Resale</h3>
              <p className="text-sm text-blue-700">
                SPML manages the entire resale process for you. We handle buyer verification, 
                negotiations, and documentation. Standard commission is 2.5-3% of sale price.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
