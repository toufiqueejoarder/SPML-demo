import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import {
  Building2,
  Users,
  Award,
  Target,
  Shield,
  TrendingUp,
  Heart,
  Globe,
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Transparency', description: 'Real-time tracking and complete visibility into your investment.' },
    { icon: Heart, title: 'Trust', description: 'Built on 15+ years of delivering on our promises to investors.' },
    { icon: TrendingUp, title: 'Growth', description: 'Strategic locations ensuring maximum ROI for our clients.' },
    { icon: Globe, title: 'Accessibility', description: 'NRB-friendly processes making global investment seamless.' },
  ];

  const milestones = [
    { year: '2010', event: 'SPML Founded', description: 'Started with a vision to transform real estate investment' },
    { year: '2015', event: 'First 100 Investors', description: 'Reached our first milestone of trusted investors' },
    { year: '2019', event: 'Digital Platform Launch', description: 'Introduced online investor portal for transparency' },
    { year: '2022', event: 'NRB Initiative', description: 'Expanded services for Non-Resident Bangladeshis' },
    { year: '2024', event: '500+ Properties Sold', description: 'Crossed half a thousand satisfied property owners' },
    { year: '2026', event: 'Next-Gen Ecosystem', description: 'Launched AI-powered investment platform' },
  ];

  const team = [
    { name: 'Md. Kamal Hossain', role: 'Founder & CEO', experience: '20+ years in Real Estate' },
    { name: 'Fatema Rahman', role: 'Chief Operating Officer', experience: '15+ years in Operations' },
    { name: 'Arif Khan', role: 'Head of Sales', experience: '12+ years in Sales & Marketing' },
    { name: 'Nusrat Jahan', role: 'Head of Technology', experience: '10+ years in PropTech' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-500/30 mb-4">
            About Us
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6">
            Building Trust, One Property at a Time
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Secure Property Management Limited (SPML) is Bangladesh&apos;s leading
            technology-driven real estate company, empowering investors with
            transparent, intelligent property solutions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Properties Sold' },
              { value: '210', label: 'Total Units' },
              { value: '98%', label: 'Customer Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-emerald-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To democratize real estate investment in Bangladesh by providing
                  transparent, accessible, and technology-powered solutions that
                  enable everyone to build wealth through property ownership.
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  To become Bangladesh&apos;s most trusted real estate ecosystem,
                  where every investor—local or abroad—can confidently grow their
                  wealth with complete transparency and support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at SPML.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-emerald-200 my-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-lg text-gray-900">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.experience}</p>
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
