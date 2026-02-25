'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useDemoState } from '@/contexts/DemoStateContext';
import Link from 'next/link';
import {
  Building2,
  Search,
  Edit,
  Eye,
  TrendingUp,
  Package,
} from 'lucide-react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddProjectForm } from '@/components/demo-forms';
import { EditProjectModal } from '@/components/demo-forms/EditProjectModal';

export default function InventoryPage() {
  const { state, computed } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = state.projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500">
            Real-time view of property inventory across all projects.
          </p>
        </div>
<AddProjectForm />
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Units</p>
                <p className="text-xl font-bold">{computed.totalUnits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sold</p>
                <p className="text-xl font-bold">{computed.totalSold}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Booked</p>
                <p className="text-xl font-bold">{computed.totalBooked}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-xl font-bold">{computed.totalAvailable}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Inventory</CardTitle>
          <CardDescription>Live inventory status by project</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Sold</TableHead>
                <TableHead className="text-center">Booked</TableHead>
                <TableHead className="text-center">Available</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Price/Katha</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => {
                const soldPercent = (project.soldUnits / project.totalUnits) * 100;
                return (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-500">{project.location}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {project.totalUnits}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-emerald-100 text-emerald-700">
                        {project.soldUnits}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-amber-100 text-amber-700">
                        {project.bookedUnits}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={project.availableUnits === 0 ? 'destructive' : 'secondary'}>
                        {project.availableUnits}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <Progress value={soldPercent} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{soldPercent.toFixed(0)}% sold</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ৳{project.pricePerKatha.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/properties/${project.id}`}>
                          <Button variant="ghost" size="sm" title="View Property">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <EditProjectModal project={project} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Visual Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        {state.projects.map((project) => {
          const soldPercent = (project.soldUnits / project.totalUnits) * 100;
          const bookedPercent = (project.bookedUnits / project.totalUnits) * 100;
          const availablePercent = (project.availableUnits / project.totalUnits) * 100;

          return (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Sold</span>
                      <span className="font-medium">{project.soldUnits} ({soldPercent.toFixed(0)}%)</span>
                    </div>
                    <Progress value={soldPercent} className="h-2 bg-gray-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Booked</span>
                      <span className="font-medium">{project.bookedUnits} ({bookedPercent.toFixed(0)}%)</span>
                    </div>
                    <Progress value={bookedPercent} className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Available</span>
                      <span className="font-medium">{project.availableUnits} ({availablePercent.toFixed(0)}%)</span>
                    </div>
                    <Progress value={availablePercent} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
