'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useCurrentInvestor } from '@/contexts/DemoStateContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  CheckCircle2,
  Clock,
  XCircle,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const investor = useCurrentInvestor();

  if (!investor) {
    return <div className="p-8">No investor selected</div>;
  }

  const kycConfig = {
    verified: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Verified' },
    pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', label: 'Pending Verification' },
    rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' },
  };

  const kyc = kycConfig[investor.kycStatus];
  const KycIcon = kyc.icon;

  const handleSave = () => {
    toast.success('Profile updated', {
      description: 'Your changes have been saved successfully.',
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile & KYC</h1>
        <p className="text-gray-500">
          Manage your profile information and KYC verification.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={investor.profileImage} />
                  <AvatarFallback className="text-xl">
                    {investor.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={investor.name} />
                </div>
                <div className="space-y-2">
                  <Label>Investor Type</Label>
                  <Input value={investor.type === 'NRB' ? 'Non-Resident Bangladeshi' : 'Local'} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue={investor.email} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" defaultValue={investor.phone} />
                </div>
              </div>

              <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-gray-500">Receive payment reminders via SMS</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Monthly statements and invoices</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Project updates and milestones</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">WhatsApp Updates</p>
                  <p className="text-sm text-gray-500">Instant alerts via WhatsApp</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KYC Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                KYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${kyc.bg} mb-4`}>
                <div className="flex items-center gap-3">
                  <KycIcon className={`w-8 h-8 ${kyc.color}`} />
                  <div>
                    <p className={`font-semibold ${kyc.color}`}>{kyc.label}</p>
                    <p className="text-sm text-gray-600">
                      {investor.kycStatus === 'verified'
                        ? 'Your identity has been verified'
                        : investor.kycStatus === 'pending'
                        ? 'We are reviewing your documents'
                        : 'Please resubmit your documents'}
                    </p>
                  </div>
                </div>
              </div>

              {investor.kycStatus !== 'verified' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Required Documents:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      National ID / Passport
                    </li>
                    <li className="flex items-center gap-2">
                      {investor.kycStatus === 'pending' ? (
                        <Clock className="w-4 h-4 text-amber-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      Address Proof
                    </li>
                    <li className="flex items-center gap-2">
                      {investor.kycStatus === 'pending' ? (
                        <Clock className="w-4 h-4 text-amber-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      Recent Photo
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              )}

              {investor.kycStatus === 'verified' && (
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ National ID verified</p>
                  <p>✓ Address proof verified</p>
                  <p>✓ Photo verified</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium">March 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Properties</span>
                <span className="font-medium">{investor.properties.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Investment</span>
                <span className="font-medium">৳{(investor.totalInvestment / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Investor Type</span>
                <Badge variant="outline">{investor.type}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
