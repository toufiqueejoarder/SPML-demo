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
import { useDemoState } from '@/contexts/DemoStateContext';
import { toast } from 'sonner';
import { Plus, TicketPlus } from 'lucide-react';

interface AddTicketFormProps {
  trigger?: React.ReactNode;
}

export function AddTicketForm({ trigger }: AddTicketFormProps) {
  const { addTicket } = useDemoState();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: '' as 'low' | 'medium' | 'high' | '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addTicket({
      subject: formData.subject.trim(),
      description: formData.description.trim(),
      priority: formData.priority as 'low' | 'medium' | 'high',
    });

    toast.success('Ticket Created', {
      description: `Support ticket "${formData.subject}" has been created`,
    });

    setFormData({
      subject: '',
      description: '',
      priority: '',
    });
    setErrors({});
    setOpen(false);
  };

  const defaultTrigger = (
    <Button className="bg-emerald-600 hover:bg-emerald-700">
      <Plus className="w-4 h-4 mr-2" />
      Create Ticket
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <TicketPlus className="w-5 h-5 text-emerald-600" />
            Create Support Ticket
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Submit a new support request. Data is stored locally.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-slate-700">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              placeholder="e.g., Payment receipt not received"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={errors.subject ? 'border-red-500' : ''}
            />
            {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-slate-700">
              Priority <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && <p className="text-sm text-red-600">{errors.priority}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please describe your issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
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
              Create Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
