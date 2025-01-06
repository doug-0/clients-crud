'use client'

import { ChartDashboard } from '@/components/chart-dashboard';
import LoadingSpinner from '@/components/loading-spinner';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import Principal from '@/layouts/Principal'
import { getDashboardData } from '@/service/dashboardservice';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function Page() {
  const { loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Principal page='Home Page'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
          <BreadcrumbPage><Link href="/">Home</Link></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isLoading ? <Skeleton className='h-[500px] w-auto'/> : <ChartDashboard chartData={data}/>}
    </Principal>
  )
}
