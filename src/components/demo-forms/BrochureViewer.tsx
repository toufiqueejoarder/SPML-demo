'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface BrochureViewerProps {
  projectName: string;
  trigger?: React.ReactNode;
}

export function BrochureViewer({ projectName, trigger }: BrochureViewerProps) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const pages = [
    { title: 'Cover', content: `${projectName} - Premium Land Investment` },
    { title: 'Project Overview', content: 'Location benefits, total area, development timeline' },
    { title: 'Unit Details', content: 'Plot sizes, pricing, payment plans' },
    { title: 'Amenities', content: 'Security, roads, utilities, community features' },
    { title: 'Investment Returns', content: 'Projected appreciation, ROI analysis, market trends' },
  ];

  const handleDownload = () => {
    toast.success('Download Started', {
      description: `${projectName} brochure is being prepared for download`,
    });
  };

  const defaultTrigger = (
    <Button variant="outline" className="w-full">
      <Download className="w-4 h-4 mr-2" />
      Download Brochure
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <FileText className="w-5 h-5 text-emerald-600" />
            {projectName} Brochure
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Digital brochure preview. This is simulated content.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-br from-emerald-50 to-white border rounded-lg p-6 min-h-[300px] flex flex-col justify-between">
          <div>
            <div className="text-xs text-emerald-600 font-medium mb-2">
              Page {currentPage} of {totalPages}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {pages[currentPage - 1].title}
            </h3>
            <p className="text-slate-600">
              {pages[currentPage - 1].content}
            </p>
            
            {currentPage === 1 && (
              <div className="mt-6 p-4 bg-emerald-600 text-white rounded-lg text-center">
                <p className="text-lg font-semibold">{projectName}</p>
                <p className="text-sm opacity-90">SPML Properties Ltd.</p>
              </div>
            )}

            {currentPage === 3 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border text-center">
                  <p className="text-2xl font-bold text-emerald-600">3-5</p>
                  <p className="text-xs text-slate-600">Katha Options</p>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <p className="text-2xl font-bold text-emerald-600">12</p>
                  <p className="text-xs text-slate-600">Month Installments</p>
                </div>
              </div>
            )}

            {currentPage === 5 && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-semibold text-amber-800">Projected Returns</p>
                <p className="text-amber-700 text-sm">15-20% annual appreciation based on market analysis</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-slate-700"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPage === i + 1 ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-slate-700"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
