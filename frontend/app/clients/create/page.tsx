'use client'

import { NewClientForm } from '@/components/add-new-client-form'
import LoadingSpinner from '@/components/loading-spinner'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useAuth } from '@/hooks/useAuth'
import Principal from '@/layouts/Principal'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  const { loading } = useAuth();

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
              <BreadcrumbPage>Criar novo cliente</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <NewClientForm client={undefined} />
    </Principal>
  )
}
