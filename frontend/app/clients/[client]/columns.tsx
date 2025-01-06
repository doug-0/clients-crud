"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Settings } from "lucide-react"
import { ArrowUpDown } from "lucide-react" 

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { DialogConfirmDeleteButton } from '@/components/confirm-delete'
import { deleteCreditCard } from '@/service/creditCardservice'


export type ClientCreditCardTable = {
  id: number
  card_type: string
  cardholder_name: string
  card_number: string
  cvv: string
  expiration_date: string,
  client_id: number
}

export const columns: ColumnDef<ClientCreditCardTable>[] = [
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
    accessorKey: "card_type",
    header: () => {
      return (
        <div className='text-center'>
          Bandeira
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("card_type")}</div>;
    },
  },
  {
    accessorKey: "cardholder_name",
    header: () => {
      return (
        <div className='text-center'>
          Nome títular
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("cardholder_name")}</div>;
    },
  },
  {
    accessorKey: "card_number",
    header: () => {
      return <div className='text-center'>Número do Cartão</div>
    },
    cell: ({ row }) => {
      const cardNumber: string = row.getValue("card_number");
      const formattedCardNumber = cardNumber
        .replace(/\s+/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ');
      
      return <div className="text-center font-medium">{formattedCardNumber}</div>;
    },
  },
  {
    accessorKey: "cvv",
    header: "CVV",
  },
  {
    accessorKey: "expiration_date",
    header: () => {
      return (
        <div className='text-center'>
          Validade
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("expiration_date")}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const card = row.original
 
      return (
        <div className='flex align-middle'>
          <Badge>
            <Link href={`/clients/${card.client_id}/credit-card/edit/${card.id}`}>
              <Settings size={15} />
            </Link>
          </Badge>
          <DialogConfirmDeleteButton 
            id={card.id} 
            func={deleteCreditCard} 
            type={'card'} 
            client_id={card.client_id}
          />
        </div>
      )
    },
  },
]
