import { getCamperById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CamperDetailsClient from './CamperDetails.client';

interface CamperDetailsProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

const CamperDetails = async ({ params }: CamperDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['camper', id],
    queryFn: () => getCamperById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient />
    </HydrationBoundary>
  );
};

export default CamperDetails;
