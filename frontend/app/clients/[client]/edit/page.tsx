'use client'

import { NewClientForm } from '@/components/add-new-client-form'
import LoadingSpinner from '@/components/loading-spinner'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useAuth } from '@/hooks/useAuth'
import Principal from '@/layouts/Principal'
import { getClient } from '@/service/clientservice'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default function Page({ params }: { params: { client: number }}) {
  const { loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [`client-${params.client}`],
    queryFn: () => getClient(params.client),
    staleTime: 1000 * 60 * 60 * 24,
  })
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Principal page='Adicionar novo cliente'>
      <div className="mb-4 flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/clients">Clientes</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Editar Cliente - {!isLoading && data.data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isLoading ? (<h1>carregando...</h1>) : (<NewClientForm client={data.data} />)}
    </Principal>
  )
}
