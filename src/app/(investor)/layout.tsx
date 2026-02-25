import { InvestorSidebar } from '@/components/shared/InvestorSidebar';

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <InvestorSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
