import { NewClientForm } from '@/components/add-new-client-form'
import Principal from '@/layouts/Principal'
import React from 'react'

export default function Page() {
  return (
    <Principal page='Adicionar novo cliente'>
      <NewClientForm />
    </Principal>
  )
}
