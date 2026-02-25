'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDemoState } from '@/contexts/DemoStateContext';
import { toast } from 'sonner';
import { Plus, UserPlus } from 'lucide-react';

interface AddInvestorFormProps {
  trigger?: React.ReactNode;
}

export function AddInvestorForm({ trigger }: AddInvestorFormProps) {
  const { addInvestor } = useDemoState();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '' as 'NRB' | 'Local' | '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.type) newErrors.type = 'Investor type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addInvestor({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      type: formData.type as 'NRB' | 'Local',
    });

    toast.success('Investor Added', {
      description: `${formData.name} has been registered as a ${formData.type} investor`,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      type: '',
    });
    setErrors({});
    setOpen(false);
  };

  const defaultTrigger = (
    <Button className="bg-emerald-600 hover:bg-emerald-700">
      <Plus className="w-4 h-4 mr-2" />
      Add Investor
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            Add New Investor
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Register a new investor in the demo. Data is stored locally.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Mohammad Rahman"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., investor@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="e.g., +880 1700 123456"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-slate-700">
              Investor Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'NRB' | 'Local') => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select investor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Local">Local Investor</SelectItem>
                <SelectItem value="NRB">NRB (Non-Resident Bangladeshi)</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-slate-700"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Add Investor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
