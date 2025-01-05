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

export default function Page({ params }: { params: { client: number }}) {
  const { data, isLoading } = useQuery({
    queryKey: ['client'],
    queryFn: () => getClient(params.client),
    staleTime: 1000 * 60 * 60 * 24,
  })
  
  console.log({data, isLoading})
  return (
    <Principal page='Client'>
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
              <BreadcrumbPage>Nome do cliente</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <Button
            type='button'
          >
            Editar Informações
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        <div className="w-5/10 border mb-3 p-4 rounded-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Informações do Cliente
          </h2>
          {
            isLoading ? (
              <div>
                <div className='mb-3'>
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>

                <Separator className='mb-4' />

                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
                <div className='mb-3'> 
                  <Skeleton className='h-8 w-[150]'/>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Nome:</span> {data.data.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Sobrenome:</span> {data.data.second_name ?? 'falta' }
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Email:</span> {data.data.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Data de Nascimento:</span> {data.data.birth_day ?? 'falta'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Telefone:</span> {data.data.phone}
                  </p>
                </div>
      
                <Separator className='mb-4' />
                
                <div className="space-y-2 mt-4">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Endereço:</span> {data.data.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Bairro:</span> 
                    {data.data.neighborhood}
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
            )
          }
        </div>
        <div className="w-8/12 border mb-3 p-4 rounded-md">
          <div className='flex justify-between'>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Cartões de Crédito
            </h2>
            <Button type='button' variant="outline" size={'sm'}>Adicionar novo cartão</Button>
          </div>
          {isLoading ? (
            <TableLoading columnCount={6} lineCount={10}/>
          ): (
            <DataTable columns={columns} data={data.data.credit_cards} />
          )}
        </div>
      </div>
    </Principal>
  )
}
