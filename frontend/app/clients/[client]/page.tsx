'use client'

import Principal from '@/layouts/Principal'
import { Separator } from "@/components/ui/separator"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getClient } from '@/service/clientservice'

import Link from "next/link"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from '@/components/ui/button'
import { DataTable } from './data-table'
import { columns } from './columns'
import TableLoading from '../../../components/table-loading'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

export default function Page({ params }: { params: { client: number }}) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['client'],
    queryFn: () => getClient(params.client),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return (
    <Principal page='Client'>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between">
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
              <BreadcrumbPage>{!isLoading && data.data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-2 sm:mt-0">
          <Button 
            type="button"
            onClick={() => router.push(`/clients/${data.data.id}/edit`)}
          >
            Editar Informações
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-evenly gap-4">
        <div className="w-full lg:w-5/12 border p-4 rounded-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Informações do Cliente
          </h2>
          {isLoading ? (
            <div>
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="mb-3">
                  <Skeleton className="h-8 w-[150px]" />
                </div>
              ))}
              <Separator className="mb-4" />
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="mb-3">
                  <Skeleton className="h-8 w-[150px]" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Nome:</span> {data.data.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Sobrenome:</span> {data.data.second_name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Email:</span> {data.data.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Data de Nascimento:</span> {format(data.data.birth_day, 'yyyy/MM/dd')}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Telefone:</span> {data.data.phone}
                </p>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 mt-4">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Endereço:</span> {data.data.address}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Bairro:</span> {data.data.neighborhood}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Cidade:</span> {data.data.city}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Estado:</span> {data.data.state}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">CEP:</span> {data.data.cep}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="w-full lg:w-7/12 border p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Cartões de Crédito</h2>
            <Button type="button" variant="outline" size="sm">
              Adicionar novo cartão
            </Button>
          </div>
          {isLoading ? (
            <TableLoading columnCount={6} lineCount={10} />
          ) : (
            <DataTable columns={columns} data={data.data.credit_cards} />
          )}
        </div>
      </div>
    </Principal>
  )
}
