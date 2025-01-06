'use client'

import LoadingSpinner from '@/components/loading-spinner';
import { useAuth } from '@/hooks/useAuth';
import Principal from '@/layouts/Principal'

export default function Page() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Principal page='Home Page'>
      Menu inicial
    </Principal>
  )
}
