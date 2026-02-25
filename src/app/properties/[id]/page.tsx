import { PropertyDetailClient } from '@/components/properties/PropertyDetailClient';

export function generateStaticParams() {
  return [
    { id: 'bashundhara' },
    { id: 'purbachal' },
    { id: 'secure-green' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />;
}
