'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { useDemoState } from '@/contexts/DemoStateContext';
import {
  Building2,
  MapPin,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Phone,
  ArrowRight,
  CheckCircle2,
  Play,
  Star,
} from 'lucide-react';

export default function HomePage() {
  const { state, computed } = useDemoState();

  const stats = [
    { label: 'Total Units', value: computed.totalUnits.toLocaleString(), icon: Building2 },
    { label: 'Units Sold', value: computed.totalSold.toLocaleString(), icon: CheckCircle2 },
    { label: 'Happy Investors', value: '500+', icon: Users },
    { label: 'Years Experience', value: '15+', icon: Star },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Investment',
      description: 'All transactions are transparent with real-time financial ledger access.',
    },
    {
      icon: TrendingUp,
      title: 'High ROI',
      description: 'Strategic locations ensuring 100%+ appreciation over 4 years.',
    },
    {
      icon: BarChart3,
      title: 'Live Tracking',
      description: 'Monitor construction progress with live surveillance and drone updates.',
    },
    {
      icon: MapPin,
      title: 'Prime Locations',
      description: 'Projects in Bashundhara, Purbachal, and other premium areas.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-3xl">
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-500/30 mb-4">
              Next-Gen Real Estate Ecosystem
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Invest in Your Future with{' '}
              <span className="text-emerald-400">Confidence</span>
            </h1>
            <p className="text-lg lg:text-xl text-emerald-100 mb-8 leading-relaxed">
              Secure Property Management Limited offers transparent, intelligent, and high-conversion 
              property investment opportunities in Bangladesh&apos;s most promising locations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/properties">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                  Explore Properties
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 w-5 h-5" />
                  Request Callback
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                  <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-emerald-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Why Choose SPML</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              A Complete Investment Ecosystem
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From purchase to rental management, we provide end-to-end solutions for your property investment journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Badge className="mb-4">Featured Projects</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Premium Investment Opportunities
              </h2>
            </div>
            <Link href="/properties">
              <Button variant="outline">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.projects.map((project) => (
              <Link key={project.id} href={`/properties/${project.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
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
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {project.location}
                        </p>
                      </div>
                    </div>
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
                        <p className="text-xs text-gray-500">Available</p>
                        <p className="font-semibold text-gray-900">
                          {project.availableUnits} / {project.totalUnits}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-lg text-emerald-200 mb-8 max-w-2xl mx-auto">
            Join over 500 satisfied investors who trust SPML for their property investments. 
            Our team is ready to help you find the perfect opportunity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/investor/dashboard">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Access Investor Portal
              </Button>
            </Link>
          </div>
          <p className="text-sm text-emerald-300 mt-6">
            Call us: +880 171 326 7356 | Email: info@spml.com.bd
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What Our Investors Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Rafiq Islam',
                role: 'NRB Investor, USA',
                text: 'SPML made investing from abroad seamless. The live surveillance feature lets me track my property progress from New York. Highly recommended!',
              },
              {
                name: 'Mrs. Nasreen Akter',
                role: 'Local Investor',
                text: 'The transparent payment system and document vault give me complete peace of mind. I can access all my papers anytime, anywhere.',
              },
              {
                name: 'Mr. Kamal Hossain',
                role: 'Business Owner',
                text: 'Invested in Purbachal 2 years ago and already seeing 40% appreciation. The ROI calculator was spot on with projections.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
