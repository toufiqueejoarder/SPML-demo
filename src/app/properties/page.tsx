'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Navigation,
  Building2,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function PropertiesPage() {
  const { state } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredProjects = state.projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      project.pricePerKatha >= priceRange[0] && project.pricePerKatha <= priceRange[1];
    const matchesAvailable = !showAvailableOnly || project.availableUnits > 0;

    return matchesSearch && matchesPrice && matchesAvailable;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Explore Our Properties
          </h1>
          <p className="text-emerald-200 text-lg max-w-2xl">
            Discover premium investment opportunities in Bangladesh&apos;s most promising locations.
            Use our smart filters to find your perfect property.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Near Me Button */}
              <Button variant="outline" className="gap-2">
                <Navigation className="w-4 h-4" />
                Near Me
              </Button>

              {/* Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Properties</SheetTitle>
                    <SheetDescription>
                      Narrow down your search with these filters.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <Label>Price Range (BDT/Katha)</Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={50000}
                        min={0}
                        step={1000}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>৳{priceRange[0].toLocaleString()}</span>
                        <span>৳{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Show available only</Label>
                      <input
                        type="checkbox"
                        checked={showAvailableOnly}
                        onChange={(e) => setShowAvailableOnly(e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setPriceRange([0, 50000]);
                        setShowAvailableOnly(false);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredProjects.length}</span> properties
            </p>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/properties/${project.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.availableUnits === 0 && (
                        <Badge className="absolute top-4 right-4 bg-red-500">Sold Out</Badge>
                      )}
                      {project.availableUnits > 0 && project.availableUnits <= 10 && (
                        <Badge className="absolute top-4 right-4 bg-amber-500">
                          Only {project.availableUnits} Left
                        </Badge>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-semibold">{project.name}</p>
                        <p className="text-white/80 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {project.location}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Starting from</p>
                          <p className="font-bold text-emerald-600">
                            ৳{project.pricePerKatha.toLocaleString()}/Katha
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Projected ROI</p>
                          <p className="font-semibold text-emerald-600 flex items-center justify-end">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +{(((project.projectedPrice2030 - project.pricePerKatha) / project.pricePerKatha) * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/properties/${project.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                        {project.availableUnits === 0 && (
                          <Badge className="absolute top-4 right-4 bg-red-500">Sold Out</Badge>
                        )}
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-xl text-gray-900 mb-1">
                              {project.name}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {project.location}
                            </p>
                          </div>
                          <Badge variant="outline" className="ml-4">
                            {project.availableUnits} / {project.totalUnits} available
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.amenities.slice(0, 4).map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-xs text-gray-500">Starting from</p>
                            <p className="text-xl font-bold text-emerald-600">
                              ৳{project.pricePerKatha.toLocaleString()}/Katha
                            </p>
                          </div>
                          <Button className="bg-emerald-600 hover:bg-emerald-700">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search query.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 50000]);
                  setShowAvailableOnly(false);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
