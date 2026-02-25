'use client';

import { useState, useRef } from 'react';
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
import { toast } from 'sonner';
import { Upload, FileUp, File, X, CheckCircle } from 'lucide-react';

interface DocumentUploaderProps {
  trigger?: React.ReactNode;
}

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

export function DocumentUploader({ trigger }: DocumentUploaderProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [documentType, setDocumentType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    const demoFiles: UploadedFile[] = [
      { name: 'nid_front.jpg', size: '1.2 MB', type: 'image/jpeg' },
      { name: 'nid_back.jpg', size: '1.1 MB', type: 'image/jpeg' },
    ];
    setFiles(demoFiles);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error('No files selected', {
        description: 'Please select at least one file to upload',
      });
      return;
    }

    if (!documentType) {
      toast.error('Document type required', {
        description: 'Please select a document type',
      });
      return;
    }

    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Documents Uploaded', {
        description: `${files.length} file(s) uploaded successfully as ${documentType}`,
      });
      setFiles([]);
      setDocumentType('');
      setOpen(false);
    }, 1500);
  };

  const defaultTrigger = (
    <Button variant="outline" className="w-full">
      <Upload className="w-4 h-4 mr-2" />
      Upload Documents
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <FileUp className="w-5 h-5 text-emerald-600" />
            Upload Documents
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Upload your KYC documents. This is a simulated upload for demo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-700">Document Type</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="National ID">National ID (NID)</SelectItem>
                <SelectItem value="Passport">Passport</SelectItem>
                <SelectItem value="Tax Certificate">Tax Certificate</SelectItem>
                <SelectItem value="Bank Statement">Bank Statement</SelectItem>
                <SelectItem value="Proof of Address">Proof of Address</SelectItem>
                <SelectItem value="Other">Other Document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div 
            className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer"
            onClick={handleFileSelect}
          >
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept="image/*,.pdf"
            />
            <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <p className="text-sm text-slate-700 font-medium">
              Click to select files
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports: JPG, PNG, PDF (Max 10MB each)
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label className="text-slate-700">Selected Files</Label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">{file.name}</p>
                        <p className="text-xs text-slate-500">{file.size}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isUploading && (
            <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 rounded-lg">
              <div className="animate-spin w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full" />
              <span className="text-emerald-700 font-medium">Uploading documents...</span>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-slate-700"
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={isUploading}
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Upload Files
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
