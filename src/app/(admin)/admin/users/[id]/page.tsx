import { InvestorDetailClient } from '@/components/admin/InvestorDetailClient';

export function generateStaticParams() {
  return [
    { id: 'inv-001' },
    { id: 'inv-002' },
    { id: 'inv-003' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvestorDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <InvestorDetailClient id={id} />;
}
