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
import { Plus, UserSearch } from 'lucide-react';

interface AddLeadFormProps {
  trigger?: React.ReactNode;
}

export function AddLeadForm({ trigger }: AddLeadFormProps) {
  const { addLead, state } = useDemoState();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    score: '' as 'hot' | 'warm' | 'cold' | '',
    interestedProject: '',
    budget: '',
    source: '',
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
    if (!formData.score) newErrors.score = 'Lead score is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addLead({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      score: formData.score as 'hot' | 'warm' | 'cold',
      interestedProject: formData.interestedProject || undefined,
      budget: formData.budget || undefined,
      source: formData.source || 'Website',
    });

    toast.success('Lead Added', {
      description: `${formData.name} has been added as a ${formData.score.toUpperCase()} lead`,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      score: '',
      interestedProject: '',
      budget: '',
      source: '',
    });
    setErrors({});
    setOpen(false);
  };

  const defaultTrigger = (
    <Button className="bg-emerald-600 hover:bg-emerald-700">
      <Plus className="w-4 h-4 mr-2" />
      Add Lead
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <UserSearch className="w-5 h-5 text-emerald-600" />
            Add New Lead
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Add a new lead to the CRM. Data is stored locally.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Karim Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="+880 1700 123456"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="score" className="text-slate-700">
                Lead Score <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.score}
                onValueChange={(value: 'hot' | 'warm' | 'cold') => setFormData({ ...formData, score: value })}
              >
                <SelectTrigger className={errors.score ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">🔥 Hot</SelectItem>
                  <SelectItem value="warm">🌡️ Warm</SelectItem>
                  <SelectItem value="cold">❄️ Cold</SelectItem>
                </SelectContent>
              </Select>
              {errors.score && <p className="text-sm text-red-600">{errors.score}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestedProject" className="text-slate-700">
                Interested Project
              </Label>
              <Select
                value={formData.interestedProject}
                onValueChange={(value) => setFormData({ ...formData, interestedProject: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {state.projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-slate-700">Budget Range</Label>
              <Input
                id="budget"
                placeholder="e.g., ৳50L - ৳1Cr"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source" className="text-slate-700">Source</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => setFormData({ ...formData, source: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Walk-in">Walk-in</SelectItem>
                  <SelectItem value="Property Fair">Property Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              Add Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
