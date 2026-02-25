'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCurrentInvestor, useDemoState } from '@/contexts/DemoStateContext';
import {
  FileText,
  Download,
  Search,
  File,
  FileCheck,
  FileClock,
  Shield,
  Eye,
} from 'lucide-react';
import { useState } from 'react';

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  allotment: FileText,
  deed: FileCheck,
  receipt: File,
  mutation: FileClock,
};

const typeLabels: Record<string, string> = {
  allotment: 'Allotment Letter',
  deed: 'Sale Deed',
  receipt: 'Payment Receipt',
  mutation: 'Mutation Papers',
};

export default function DocumentsPage() {
  const investor = useCurrentInvestor();
  const { state } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');

  if (!investor) {
    return <div className="p-8">No investor selected</div>;
  }

  const allDocuments = investor.properties.flatMap((prop) => {
    const project = state.projects.find((p) => p.id === prop.projectId);
    return prop.documents.map((doc) => ({
      ...doc,
      projectName: project?.name || prop.projectId,
      unitNumber: prop.unitNumber,
    }));
  });

  const filteredDocs = allDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
          <p className="text-gray-500">
            Access and download your property documents securely.
          </p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-2 w-fit">
          <Shield className="w-4 h-4" />
          Encrypted Storage
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Documents by Property */}
      {investor.properties.map((property) => {
        const project = state.projects.find((p) => p.id === property.projectId);
        const propertyDocs = property.documents.filter(
          (doc) =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (propertyDocs.length === 0 && searchQuery) return null;

        return (
          <Card key={property.unitNumber}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{project?.name || property.projectId}</span>
                <Badge variant="outline">Unit: {property.unitNumber}</Badge>
              </CardTitle>
              <CardDescription>
                {propertyDocs.length} documents available
              </CardDescription>
            </CardHeader>
            <CardContent>
              {propertyDocs.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No documents uploaded yet for this property.
                </p>
              ) : (
                <div className="space-y-3">
                  {propertyDocs.map((doc) => {
                    const Icon = typeIcons[doc.type] || FileText;
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {typeLabels[doc.type]} • Uploaded {doc.uploadedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Compliance Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Document Security & Compliance
              </h3>
              <p className="text-sm text-blue-700">
                All documents are stored in an encrypted cloud vault. Access logs are 
                automatically maintained for compliance. You can download copies 
                anytime, anywhere, 24/7.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
