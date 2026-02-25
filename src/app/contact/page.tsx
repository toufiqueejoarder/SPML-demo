'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { toast } from 'sonner';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent!', {
      description: 'Our team will contact you within 24 hours.',
    });
    setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      {/* Hero */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-emerald-200 text-lg max-w-2xl">
            Have questions about our properties? Our expert team is ready to help
            you find the perfect investment opportunity.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+880 1XXX XXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interest">Interested In</Label>
                        <Select
                          value={formData.interest}
                          onValueChange={(value) => setFormData({ ...formData, interest: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bashundhara">Bashundhara Residences</SelectItem>
                            <SelectItem value="purbachal">Purbachal Model Town</SelectItem>
                            <SelectItem value="secure-green">Secure Green City</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Head Office</p>
                      <p className="text-sm text-gray-500">
                        House 42, Road 12, Block E<br />
                        Bashundhara R/A, Dhaka 1229
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-500">+880 171 326 7356</p>
                      <p className="text-sm text-gray-500">+880 2 841 2345</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-500">info@spml.com.bd</p>
                      <p className="text-sm text-gray-500">sales@spml.com.bd</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-sm text-gray-500">Sat - Thu: 10:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-500">Friday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h3 className="font-semibold text-emerald-900 mb-1">
                        Schedule a Site Visit
                      </h3>
                      <p className="text-sm text-emerald-700 mb-3">
                        Book a free guided tour of our projects with our expert team.
                      </p>
                      <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        WhatsApp Support
                      </h3>
                      <p className="text-sm text-blue-700 mb-3">
                        Get instant responses via WhatsApp for quick queries.
                      </p>
                      <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                        Chat Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-0">
              <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Interactive Map</p>
                  <p className="text-sm">Bashundhara R/A, Dhaka</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
