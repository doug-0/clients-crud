"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Separator } from "@/components/ui/separator"
import React from 'react'

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { maskCEP, maskPhone } from '@/service/inputMask'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { createClient, updateClient } from '@/service/clientservice'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Client } from '@/types/ClientsType'

const formSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }).min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  second_name: z.string({
    required_error: "Sobrenome é obrigatório",
  }).min(2, {
    message: "O sobrenome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().nonempty({ message: "O email é obrigatório." 
  }).email({ message: "Endereço de email inválido." }),
  birth_day: z.date({
    required_error: "A data de nascimento é obrigatória",
    invalid_type_error: "Data inválida!",
  }).nullable(),
  address: z.string({
    required_error: "O endereço é obrigatório",
  }).min(2, {
    message: "O endereço deve ter pelo menos 2 caracteres.",
  }),
  address_number: z.string({
    required_error: "O número do endereço é obrigatório",
  }).min(1, {
    message: "O número do endereço deve ter pelo menos 2 caracteres.",
  }),
  neighborhood: z.string({
    required_error: "O bairro é obrigatório",
  }).min(2, {
    message: "O bairro deve ter pelo menos 2 caracteres.",
  }),
  cep: z.string({
    required_error: "O CEP é obrigatório",
  }).min(9, {
    message: "O CEP deve ter pelo menos 8 caracteres.",
  }),
  state: z.string({
    required_error: "O estado é obrigatório",
  }).min(2),
  city: z.string({
    required_error: "A cidade é obrigatória",
  }).min(3, {
    message: "A cidade deve ter pelo menos 2 caracteres.",
  }),
  phone: z.string({
    required_error: "O telefone é obrigatório",
  }).min(15, {
    message: "O telefone deve ter pelo menos 2 caracteres.",
  }),
  address_complement: z.string().optional(),
});

type editClient = {
  second_name: string,
  birth_day: Date | undefined,
  id: number
} & Client

export function NewClientForm({ client }: { client: editClient | undefined }) {
  const [date, setDate] = React.useState<Date | undefined>(client?.birth_day ? new Date(client.birth_day) : undefined);
  const [controller, setController] = React.useState<AbortController | null>(null);
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client?.name ?? '',
      second_name: client?.second_name ?? '',
      email: client?.email ?? '',
      birth_day: client?.birth_day ?? undefined,
      address: client?.address ?? '',
      address_complement: client?.address_complement ?? '',
      address_number: client?.address_number ?? '',
      neighborhood: client?.neighborhood ?? '',
      cep: client?.cep ?? '',
      state: client?.state ?? '',
      city: client?.city ?? '',
      phone: client?.phone ?? '',
    },
  });

  const { setValue, setError } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.birth_day) {
      setError("birth_day", {
        type: "manual",
        message: `A data de nascimento é obrigatória`,
      });
      return;
    }

    try {
      if (client?.id) {
        await updateClient({ ...values, id: client.id});
      } else {
        await createClient(values);
      }

      toast({
        title: `Cliente adicionado com sucesso!`,
        variant: 'default',
      })

      router.push('/clients')
    } catch (error) {
      console.error(error)

      toast({
        title: 'Algo deu errado!',
        description: 'Entre em contato com o suporte e tente novamente mais tarde.',
        variant: 'destructive',
      })
    }
  }

  const handleCep = debounce(async (cep: string) => {
    if (controller) {
      controller.abort();
    }

    const newController = new AbortController();
    setController(newController);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
        signal: newController.signal,
      });

      setValue("address", response.data.logradouro);
      setValue("neighborhood", response.data.bairro);
      setValue("city", response.data.localidade);
      setValue("state", response.data.uf);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Requisição cancelada");
      } else {
        console.error("Erro ao buscar CEP: ", error);
      }
    }
  }, 2000);

  return (
    <Card className="mt-5">
      <CardContent>
        <Form {...form}>
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{client ? 'Editar Cliente' : 'Adicionar Novo Cliente'}</h1>
                <small className="text-balance text-muted-foreground">
                  Campos marcados com * são obrigatórios.
                </small>
              </div>

              {/* Informações pessoais */}
              <div className="gap-5 mb-5">
                <div className="mb-3">
                  <h6 className="font-bold">Informações pessoais</h6>
                </div>
                <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="second_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome *</FormLabel>
                        <FormControl>
                          <Input placeholder="Sobrenome do cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="cliente@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="83 98787-5808"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(maskPhone(e));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='pt-2'>
                    <FormLabel className="mb-[14px] pt-[4px]">
                      Data de nascimento *
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            setValue("birth_day", selectedDate ?? null);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <small className="text-red-500 mt-2">
                      {!form.getValues("birth_day") &&
                        form.formState.errors.birth_day &&
                        "A data de nascimento é obrigatória."}
                    </small>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Informações de Endereço */}
              <div className="flex flex-col mb-8">
                <div className="mb-3">
                  <h6 className="font-bold">Informações de Endereço</h6>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Campos de endereço */}
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="58433-795"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                              handleCep(e.target.value);
                              field.onChange(maskCEP(e));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço *</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua dos bobos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número *</FormLabel>
                        <FormControl>
                          <Input placeholder="56" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address_complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt. 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input placeholder="São Paulo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro *</FormLabel>
                        <FormControl>
                          <Input placeholder="Portal dos bosques" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <FormControl>
                          <Input placeholder="SP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Salvar Cliente
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
