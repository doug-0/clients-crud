"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import React from 'react'

// import { format } from "date-fns"
// import { CalendarIcon } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createCreditCard, updateCreditCard } from '@/service/creditCardservice'
import { EditCreditCard } from '@/types/CreditCard'
import { maskCardNumber, maskCPF, maskCVV } from '@/service/inputMask'

const formSchema = z.object({
  cardholder_name: z.string()
    .min(2, { message: "O nome do titular deve ter pelo menos 2 caracteres." })
    .max(100, { message: "O nome do titular deve ter no máximo 100 caracteres." }),

  card_number: z.string()
    .refine(val => /\d{4} \d{4} \d{4} \d{4}/.test(val), { message: "O número do cartão deve seguir o formato 'xxxx xxxx xxxx xxxx'." }),
    // .min(19, { message: "O número do cartão deve ter 16 caracteres (com espaços)." }),
  cardholder_document: z.string()
    .refine(val => /(\d{3}\.\d{3}\.\d{3}-\d{2})/.test(val), { message: "O CPF deve ser válido e no formato XXX.XXX.XXX-XX." }),

  expiration_date: z.string({
    required_error: "A data de validade é obrigatória",
    invalid_type_error: "Data inválida!",
  }).optional(),

  cvv: z.string()
    .refine(val => /^\d{3}$/.test(val), { message: "O CVV deve ter 3 dígitos." }),
});

const convertToISOFormat = (date: string): string => {
  const [month, year] = date.split("/");
  return `20${year}-${month.padStart(2, "0")}`;
};

export function NewCreditCardForm({ credit_card, client_id }: { credit_card: EditCreditCard | undefined, client_id: number }) {
  const { toast } = useToast()
  const router = useRouter()

  const expirationDate = credit_card?.expiration_date 
  ? convertToISOFormat(credit_card.expiration_date) 
  : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardholder_name: credit_card?.cardholder_name ?? '',
      card_number: credit_card?.card_number ?? '',
      cardholder_document: credit_card?.cardholder_document ?? '',
      expiration_date: expirationDate,
      cvv: credit_card?.cvv ?? '',
    },
  });

  const { setValue, setError } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.expiration_date) {
      setError("expiration_date", {
        type: "manual",
        message: `A data de nascimento é obrigatória`,
      });
      return;
    }

    try {
      if (credit_card?.id) {
        await updateCreditCard({ ...values, id: credit_card?.id, client_id: client_id, expiration_date: values.expiration_date! });
      } else {
        await createCreditCard({...values, expiration_date: values.expiration_date ?? undefined, client_id: client_id});
      }

      toast({
        title: `Cartão de crédito adicionado com sucesso!`,
        variant: 'default',
      })

      router.push(`/clients/${client_id}`)
    } catch (error) {
      console.error(error)

      toast({
        title: 'Algo deu errado!',
        description: 'Entre em contato com o suporte e tente novamente mais tarde.',
        variant: 'destructive',
      })
    }
  }

  const currentDate = new Date();
  const minDate = currentDate.toISOString().slice(0, 7);

  return (
    <Card className="mt-5">
      <CardContent>
        <Form {...form}>
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{credit_card?.id ? 'Editar Cartão de crédito' : 'Adicionar Novo Cartão de crédito'}</h1>
                <small className="text-balance text-muted-foreground">
                  Campos marcados com * são obrigatórios.
                </small>
              </div>
              <div className="gap-5 mb-5">
                <div className="mb-3">
                  <h6 className="font-bold">Informações do cartão de crédito</h6>
                </div>
                <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="cardholder_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do títular *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do títular" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="card_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do Cartão *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="9999 9999 9999 9999" 
                            {...field} 
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(maskCardNumber(e))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardholder_document"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF do títular *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="999.999.999-99" 
                            {...field} 
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(maskCPF(e))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="expiration_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de validade *</FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              value={field.value || ''}
                              onChange={(e) => {
                                setValue("expiration_date", e.target.value);
                              }}
                              min={minDate}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <small className="text-red-500 mt-2">
                      {!form.getValues("expiration_date") &&
                        form.formState.errors.expiration_date &&
                        "A data de válidade é obrigatória."}
                    </small>
                  </div>
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="999" 
                            {...field} 
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(maskCVV(e))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Salvar Cartão de Crédito
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
