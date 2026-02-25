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
import { Edit, Building2 } from 'lucide-react';
import type { Project } from '@/lib/demo-data';

interface EditProjectModalProps {
  project: Project;
  trigger?: React.ReactNode;
}

export function EditProjectModal({ project, trigger }: EditProjectModalProps) {
  const { dispatch } = useDemoState();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    location: project.location,
    pricePerKatha: project.pricePerKatha.toString(),
    description: project.description,
    soldUnits: project.soldUnits.toString(),
    bookedUnits: project.bookedUnits.toString(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.pricePerKatha || parseInt(formData.pricePerKatha) <= 0) {
      newErrors.pricePerKatha = 'Price must be greater than 0';
    }
    const sold = parseInt(formData.soldUnits) || 0;
    const booked = parseInt(formData.bookedUnits) || 0;
    if (sold + booked > project.totalUnits) {
      newErrors.soldUnits = 'Sold + Booked cannot exceed total units';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const sold = parseInt(formData.soldUnits) || 0;
    const booked = parseInt(formData.bookedUnits) || 0;

    const updatedProject: Project = {
      ...project,
      name: formData.name.trim(),
      location: formData.location.trim(),
      pricePerKatha: parseInt(formData.pricePerKatha),
      description: formData.description.trim(),
      soldUnits: sold,
      bookedUnits: booked,
      availableUnits: project.totalUnits - sold - booked,
    };

    dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });

    toast.success('Project Updated', {
      description: `${formData.name} has been updated successfully`,
    });

    setErrors({});
    setOpen(false);
  };

  const defaultTrigger = (
    <Button variant="ghost" size="sm" title="Edit Project">
      <Edit className="w-4 h-4" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Edit Project
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Update project details. Changes are stored locally.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
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
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerKatha" className="text-slate-700">
              Price per Katha (৳) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="pricePerKatha"
              type="number"
              value={formData.pricePerKatha}
              onChange={(e) => setFormData({ ...formData, pricePerKatha: e.target.value })}
              className={errors.pricePerKatha ? 'border-red-500' : ''}
            />
            {errors.pricePerKatha && <p className="text-sm text-red-600">{errors.pricePerKatha}</p>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-slate-700 text-sm">Total Units</Label>
              <Input
                value={project.totalUnits}
                disabled
                className="bg-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="soldUnits" className="text-slate-700 text-sm">Sold</Label>
              <Input
                id="soldUnits"
                type="number"
                min="0"
                max={project.totalUnits}
                value={formData.soldUnits}
                onChange={(e) => setFormData({ ...formData, soldUnits: e.target.value })}
                className={errors.soldUnits ? 'border-red-500' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookedUnits" className="text-slate-700 text-sm">Booked</Label>
              <Input
                id="bookedUnits"
                type="number"
                min="0"
                max={project.totalUnits}
                value={formData.bookedUnits}
                onChange={(e) => setFormData({ ...formData, bookedUnits: e.target.value })}
              />
            </div>
          </div>
          {errors.soldUnits && <p className="text-sm text-red-600">{errors.soldUnits}</p>}

          <div className="bg-slate-50 p-3 rounded-lg text-sm">
            <p className="text-slate-600">
              Available Units: <span className="font-semibold text-emerald-600">
                {project.totalUnits - (parseInt(formData.soldUnits) || 0) - (parseInt(formData.bookedUnits) || 0)}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">Description</Label>
            <Textarea
              id="description"
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
