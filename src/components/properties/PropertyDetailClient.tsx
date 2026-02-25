'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  MapPin,
  Phone,
  Download,
  Play,
  CheckCircle2,
  Clock,
  Circle,
  TrendingUp,
  School,
  Hospital,
  Train,
  ShoppingBag,
  TreePine,
  Calculator,
  ArrowLeft,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  education: School,
  health: Hospital,
  transport: Train,
  shopping: ShoppingBag,
  leisure: TreePine,
};

interface PropertyDetailClientProps {
  id: string;
}

export function PropertyDetailClient({ id }: PropertyDetailClientProps) {
  const { state } = useDemoState();
  const [selectedImage, setSelectedImage] = useState(0);
  const [investmentKatha, setInvestmentKatha] = useState([5]);

  const project = state.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Link href="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = project.pricePerKatha * investmentKatha[0];
  const price2028 = project.projectedPrice2028 * investmentKatha[0];
  const price2030 = project.projectedPrice2030 * investmentKatha[0];
  const roi2028 = ((price2028 - currentPrice) / currentPrice) * 100;
  const roi2030 = ((price2030 - currentPrice) / currentPrice) * 100;

  const completedMilestones = project.milestones.filter((m) => m.status === 'completed').length;
  const progressPercent = (completedMilestones / project.milestones.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/properties" className="flex items-center text-sm text-gray-500 hover:text-emerald-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Hero Gallery */}
      <section className="bg-white pb-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-4 py-6">
            <div className="lg:col-span-2 relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src={project.images[selectedImage]}
                alt={project.name}
                fill
                className="object-cover"
              />
              {project.availableUnits === 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-lg px-4 py-2">
                  Sold Out
                </Badge>
              )}
            </div>
            <div className="space-y-4">
              {project.images.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-full h-[120px] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-emerald-500' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Location */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{project.nameBn}</Badge>
                  {project.availableUnits <= 10 && project.availableUnits > 0 && (
                    <Badge className="bg-amber-500">Only {project.availableUnits} Left</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                <p className="text-gray-500 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {project.location}
                </p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="surveillance">Live View</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">About This Project</h2>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Total Units</p>
                        <p className="text-2xl font-bold text-gray-900">{project.totalUnits}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Sold</p>
                        <p className="text-2xl font-bold text-emerald-600">{project.soldUnits}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Available</p>
                        <p className="text-2xl font-bold text-blue-600">{project.availableUnits}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="nearby" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Neighborhood Intelligence</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.nearbyPlaces.map((place) => {
                      const Icon = iconMap[place.type] || MapPin;
                      return (
                        <div key={place.name} className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium">{place.name}</p>
                            <p className="text-sm text-gray-500">{place.distance}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Map Placeholder */}
                  <div className="mt-6 h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive Map</p>
                      <p className="text-sm">Coordinates: {project.coordinates.join(', ')}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Visual Milestone Tracker</h2>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Overall Progress</span>
                      <span className="text-sm font-medium">{progressPercent.toFixed(0)}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                  </div>

                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              milestone.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-600'
                                : milestone.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {milestone.status === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : milestone.status === 'in_progress' ? (
                              <Clock className="w-5 h-5" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </div>
                          {index < project.milestones.length - 1 && (
                            <div className={`w-0.5 h-12 ${
                              milestone.status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{milestone.name}</h3>
                            <Badge
                              variant={
                                milestone.status === 'completed'
                                  ? 'default'
                                  : milestone.status === 'in_progress'
                                  ? 'secondary'
                                  : 'outline'
                              }
                              className={
                                milestone.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : ''
                              }
                            >
                              {milestone.status === 'completed'
                                ? 'Completed'
                                : milestone.status === 'in_progress'
                                ? 'In Progress'
                                : 'Planned'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {milestone.completedDate
                              ? `Completed: ${milestone.completedDate}`
                              : `Target: ${milestone.targetDate}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="surveillance" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Live Construction View</h2>
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src={project.surveillanceImage}
                      alt="Live surveillance"
                      width={800}
                      height={450}
                      className="w-full"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Button className="bg-white/90 text-gray-900 hover:bg-white">
                        <Play className="w-4 h-4 mr-2" />
                        View Drone Footage
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    * Live feed available for registered property owners only
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Pricing & Actions */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-emerald-600">
                    ৳{project.pricePerKatha.toLocaleString()}/Katha
                  </CardTitle>
                  <CardDescription>Starting price</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* ROI Calculator */}
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-semibold">ROI Calculator</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Investment Size</span>
                          <span className="font-medium">{investmentKatha[0]} Katha</span>
                        </div>
                        <Slider
                          value={investmentKatha}
                          onValueChange={setInvestmentKatha}
                          max={20}
                          min={1}
                          step={1}
                        />
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Today (2026)</span>
                          <span className="font-medium">৳{currentPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">2028 (Projected)</span>
                          <span className="font-medium text-emerald-600">
                            ৳{price2028.toLocaleString()}
                            <span className="text-xs ml-1">(+{roi2028.toFixed(0)}%)</span>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">2030 (Projected)</span>
                          <span className="font-medium text-emerald-600">
                            ৳{price2030.toLocaleString()}
                            <span className="text-xs ml-1">(+{roi2030.toFixed(0)}%)</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm">
                          Potential gain: <strong className="text-emerald-600">৳{(price2030 - currentPrice).toLocaleString()}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link href="/contact" className="block">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Request Quote
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
                    </Button>
                  </div>

                  {/* Contact */}
                  <div className="text-center text-sm text-gray-500 pt-4 border-t">
                    <p>Have questions? Call us</p>
                    <p className="font-semibold text-gray-900">+880 171 326 7356</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
