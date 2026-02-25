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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Send, Edit } from 'lucide-react';

interface AddCampaignFormProps {
  trigger?: React.ReactNode;
  mode?: 'create' | 'edit';
  initialData?: {
    name: string;
    targetAudience: string;
    totalSteps: number;
  };
}

export function AddCampaignForm({ trigger, mode = 'create', initialData }: AddCampaignFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    targetAudience: initialData?.targetAudience || '',
    totalSteps: initialData?.totalSteps?.toString() || '5',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Campaign name is required';
    if (!formData.targetAudience) newErrors.targetAudience = 'Target audience is required';
    if (!formData.totalSteps || parseInt(formData.totalSteps) <= 0) {
      newErrors.totalSteps = 'Number of steps must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'create') {
      toast.success('Campaign Created', {
        description: `"${formData.name}" campaign has been created with ${formData.totalSteps} steps`,
      });
    } else {
      toast.success('Campaign Updated', {
        description: `"${formData.name}" campaign has been updated`,
      });
    }

    if (mode === 'create') {
      setFormData({
        name: '',
        targetAudience: '',
        totalSteps: '5',
        description: '',
      });
    }
    setErrors({});
    setOpen(false);
  };

  const defaultTrigger = mode === 'create' ? (
    <Button className="bg-emerald-600 hover:bg-emerald-700">
      <Plus className="w-4 h-4 mr-2" />
      Create Campaign
    </Button>
  ) : (
    <Button variant="outline" size="sm">
      <Edit className="w-4 h-4 mr-1" />
      Edit
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <Send className="w-5 h-5 text-emerald-600" />
            {mode === 'create' ? 'Create Drip Campaign' : 'Edit Campaign'}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {mode === 'create' 
              ? 'Set up a new automated email sequence. Data is stored locally.'
              : 'Modify campaign settings. Changes are stored locally.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Campaign Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., NRB Welcome Series"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAudience" className="text-slate-700">
                Target Audience <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.targetAudience}
                onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
              >
                <SelectTrigger className={errors.targetAudience ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_leads">All Leads</SelectItem>
                  <SelectItem value="hot_leads">Hot Leads</SelectItem>
                  <SelectItem value="warm_leads">Warm Leads</SelectItem>
                  <SelectItem value="cold_leads">Cold Leads</SelectItem>
                  <SelectItem value="nrb_investors">NRB Investors</SelectItem>
                  <SelectItem value="local_investors">Local Investors</SelectItem>
                  <SelectItem value="new_signups">New Sign-ups</SelectItem>
                </SelectContent>
              </Select>
              {errors.targetAudience && <p className="text-sm text-red-600">{errors.targetAudience}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalSteps" className="text-slate-700">
                Email Steps <span className="text-red-500">*</span>
              </Label>
              <Input
                id="totalSteps"
                type="number"
                min="1"
                max="20"
                placeholder="e.g., 5"
                value={formData.totalSteps}
                onChange={(e) => setFormData({ ...formData, totalSteps: e.target.value })}
                className={errors.totalSteps ? 'border-red-500' : ''}
              />
              {errors.totalSteps && <p className="text-sm text-red-600">{errors.totalSteps}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">Campaign Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the campaign objective and messaging strategy..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
            <p className="font-medium text-slate-700 mb-1">Campaign Preview</p>
            <p>• {formData.totalSteps || '5'} automated emails over {(parseInt(formData.totalSteps) || 5) * 3} days</p>
            <p>• Targeting: {formData.targetAudience?.replace('_', ' ') || 'Not selected'}</p>
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
              {mode === 'create' ? 'Create Campaign' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
