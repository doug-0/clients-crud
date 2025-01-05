'use client'

import Principal from '@/layouts/Principal'
import { getAllClients } from '@/service/clientservice';
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { DataTable } from './data-table';
import { columns } from './columns';
import TableLoading from './table-loading';

export default function Clients() {
  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getAllClients
  });

  return (
    <Principal page='Clients'>
      {isLoading ? (
        <TableLoading columnCount={6} lineCount={10} />
      ) : (
        <DataTable columns={columns} data={data.data} />
      )}
    </Principal>
  )
}
