'use client';

import { useSettings } from '@/contexts/DemoStateContext';
import { Settings, X } from 'lucide-react';
import Link from 'next/link';

export function DemoIndicator() {
  const settings = useSettings();

  if (!settings.showDemoIndicator) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-amber-100 dark:bg-amber-900/80 border border-amber-300 dark:border-amber-700 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Demo Environment
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              All data is simulated
            </p>
          </div>
        </div>
        <Link
          href="/demo-controls"
          className="p-1.5 hover:bg-amber-200 dark:hover:bg-amber-800 rounded-md transition-colors"
          title="Open Demo Controls"
        >
          <Settings className="w-4 h-4 text-amber-700 dark:text-amber-300" />
        </Link>
      </div>
    </div>
  );
}
