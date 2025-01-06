import { Loader2, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DialogConfirmDeleteButton({ id, func, type, client_id }: { 
  id: number, func: (id: number) => Promise<void>, type: string , client_id: number
}) {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [onOpen, setOnOpen] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: (id: number) => func(id),
    onError: (error) => {
      toast({
        title: 'Algo deu errado!',
        description: 'Contate o suporte e tente novamente mais tarde.',
        variant: 'destructive',
      })

      console.error(error)
    },
    onSuccess: async (success) => {
      if (type == 'card') {
        queryClient.setQueryData([`delete-credit-card-${id}`], success);

        queryClient.resetQueries({ queryKey: [`client-${client_id}`] })
  
        toast({
          title: 'Cartão removido com sucesso!',
          variant: 'default',
        })

        setOnOpen(false)

        router.push(`/clients/${client_id}`)
      } 

      if (type == 'client') {
        queryClient.setQueryData([`delete-client-${id}`], success);

        queryClient.resetQueries({ queryKey: ['clients'] })
  
        toast({
          title: 'Cliente removido com sucesso!',
          variant: 'default',
        })

        setOnOpen(false)

        router.push('/clients')
      } 
    }
  })

  return (
    <Dialog
      open={onOpen}
    >
      <DialogTrigger>
        <Button 
          size={'sm'} 
          variant="outline"
          className='bg-red-600 h-[25px] text-gray-50 ml-5'
          onClick={() => setOnOpen(true)}
        ><Trash /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja remover?</DialogTitle>
          <DialogDescription>
            As ações não serão reversiveis, clique em confirmar para prosseguir.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {
            isPending ? (
              <Button
                type="button"
                className='bg-red-600'
                disabled
              >
                <Loader2 />
                {' '}
                Carregando...
              </Button>) : (
              <Button 
                type="button"
                className='bg-red-600'
                onClick={() => mutate(id)}
              >
                Confirmar
              </Button>
            )
          }
          <Button
            type='button'
            onClick={() => setOnOpen(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
