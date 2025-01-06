'use client'

import { NewCreditCardForm } from '@/components/add-new-credit-card-form'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Principal from '@/layouts/Principal'
import { getClient } from '@/service/clientservice'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default function Page({ params }: { params: { client: number }}) {
  const { data, isLoading } = useQuery({
    queryKey: ['client'],
    queryFn: () => getClient(params.client),
    staleTime: 1000 * 60 * 60 * 24,
  })

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
              <Link href={`/clients/${!isLoading && data.data.id}`}>{!isLoading && data.data.name}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Adicionar Cartão de Crédito ao cliente - {!isLoading && data.data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isLoading ? (<h1>carregando...</h1>) : (<NewCreditCardForm credit_card={undefined} client_id={data.data.id} />)}
    </Principal>
  )
}
