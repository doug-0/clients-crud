import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export function DialogConfirmDeleteButton({ id, func, textBtn }: { 
  id: number, func: (id: number) => Promise<void>, textBtn: string 
}) {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

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
      queryClient.setQueryData([`delete-client-${id}`], success);

      toast({
        title: 'Cliente removido com sucesso!',
        variant: 'default',
      })

      router.push('/clients')
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          type="button" 
          className="w-full"
        >
          {textBtn}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          {isPending ? (
            <>
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait...
              </Button>
            </>

          ) : (
            <Button 
              type="button" 
              size="sm" 
              className="px-3 w-full"
              disabled={isPending}
              onClick={() => mutate(id)}
            >
              {textBtn}
            </Button>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
