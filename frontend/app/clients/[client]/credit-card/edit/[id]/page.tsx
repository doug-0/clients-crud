'use client'

import { NewCreditCardForm } from '@/components/add-new-credit-card-form'
import LoadingSpinner from '@/components/loading-spinner'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useAuth } from '@/hooks/useAuth'
import Principal from '@/layouts/Principal'
import { getCreditCard } from '@/service/creditCardservice'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default function Page({ params }: { params: { client: number, id: number }}) {
  const { loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [`creditCard-${params.id}`],
    queryFn: () => getCreditCard(params.id)
  })

    if (loading) {
      return <LoadingSpinner />;
    }

  return (
    <Principal page='Adicionar cartão ao cliente'>
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
              <Link href={`/clients/${!isLoading && data.client.id}`}>{!isLoading && data.client.name}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Adicionar Cartão de Crédito ao cliente - {!isLoading && data.client.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isLoading ? (<h1>carregando...</h1>) : (<NewCreditCardForm credit_card={data} client_id={data.client.id} />)}
    </Principal>
  )
}
