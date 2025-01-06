"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Settings } from "lucide-react"
import { ArrowUpDown } from "lucide-react" 

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { DialogConfirmDeleteButton } from '@/components/confirm-delete'
import { deletClient } from '@/service/clientservice'
import { Badge } from '@/components/ui/badge'


export type ClientTable = {
  id: number
  name: number
  email: string
  phone: string
  state: string
}

export const columns: ColumnDef<ClientTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className='text-center'>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className='text-center'>
          Nome
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return (
        <div className='text-center'>
          Email
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: () => {
      return (
        <div className='text-center'>
          Telefone
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("phone")}</div>;
    },
  },
  {
    accessorKey: "state",
    header: () => {
      return (
        <div className='text-center'>
          Estado
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("state")}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const client = row.original
 
      return (
        <div className='flex align-middle'>
            <Badge>
              <Link href={`clients/${client.id}`}>
                <Settings size={15} />
              </Link>
            </Badge>
          <DialogConfirmDeleteButton 
            id={client.id} 
            func={deletClient} 
            type='client' 
            client_id={client.id}
          />
        </div>
      )
    },
  },
]
