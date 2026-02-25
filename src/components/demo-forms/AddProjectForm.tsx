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
import { useDemoState } from '@/contexts/DemoStateContext';
import { toast } from 'sonner';
import { Plus, Building2 } from 'lucide-react';

interface AddProjectFormProps {
  trigger?: React.ReactNode;
}

export function AddProjectForm({ trigger }: AddProjectFormProps) {
  const { addProject } = useDemoState();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    totalUnits: '',
    pricePerKatha: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.totalUnits || parseInt(formData.totalUnits) <= 0) {
      newErrors.totalUnits = 'Total units must be greater than 0';
    }
    if (!formData.pricePerKatha || parseInt(formData.pricePerKatha) <= 0) {
      newErrors.pricePerKatha = 'Price per katha must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addProject({
      name: formData.name.trim(),
      location: formData.location.trim() || 'Dhaka, Bangladesh',
      totalUnits: parseInt(formData.totalUnits),
      pricePerKatha: parseInt(formData.pricePerKatha),
      description: formData.description.trim() || undefined,
    });

    toast.success('Project Created', {
      description: `${formData.name} has been added with ${formData.totalUnits} units`,
    });

    setFormData({
      name: '',
      location: '',
      totalUnits: '',
      pricePerKatha: '',
      description: '',
    });
    setErrors({});
    setOpen(false);
  };

  const defaultTrigger = (
    <Button className="bg-emerald-600 hover:bg-emerald-700">
      <Plus className="w-4 h-4 mr-2" />
      Add Project
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Add New Project
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Create a new project in the demo. Data is stored locally.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., SPML Gulshan Heights"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-700">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Gulshan, Dhaka"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalUnits" className="text-slate-700">
                Total Units <span className="text-red-500">*</span>
              </Label>
              <Input
                id="totalUnits"
                type="number"
                placeholder="e.g., 500"
                value={formData.totalUnits}
                onChange={(e) => setFormData({ ...formData, totalUnits: e.target.value })}
                className={errors.totalUnits ? 'border-red-500' : ''}
              />
              {errors.totalUnits && <p className="text-sm text-red-600">{errors.totalUnits}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerKatha" className="text-slate-700">
                Price per Katha (৳) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pricePerKatha"
                type="number"
                placeholder="e.g., 1500000"
                value={formData.pricePerKatha}
                onChange={(e) => setFormData({ ...formData, pricePerKatha: e.target.value })}
                className={errors.pricePerKatha ? 'border-red-500' : ''}
              />
              {errors.pricePerKatha && <p className="text-sm text-red-600">{errors.pricePerKatha}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
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
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
