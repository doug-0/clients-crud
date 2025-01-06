'use client'

import Principal from '@/layouts/Principal'
import { getAllClients } from '@/service/clientservice';
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { DataTable } from './data-table';
import { columns } from './columns';
import TableLoading from '../../components/table-loading';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/loading-spinner';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default function Clients() {
  const { loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getAllClients
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Principal page='Clients'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
          <BreadcrumbPage><Link href="/clients">Clientes</Link></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isLoading ? (
        <TableLoading columnCount={6} lineCount={10} />
      ) : (
        <DataTable columns={columns} data={data.data} />
      )}
    </Principal>
  )
}
