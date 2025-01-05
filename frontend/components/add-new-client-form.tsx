"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { DatePicker } from './ui/date-picker'

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
  }).min(2, {
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
  }).min(16, {
    message: "O telefone deve ter pelo menos 2 caracteres.",
  }),
  address_complement: z.string().optional(),
});


export function NewClientForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      second_name: "",
      email: "",
      birth_day: null,
      address: "",
      address_complement: "",
      address_number: "",
      neighborhood: "",
      cep: "",
      state: "",
      city: "",
      phone: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form 
            className="p-6 md:p-8" 
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Adicionar Novo Cliente</h1>
                <small className="text-balance text-muted-foreground">
                  Campos marcados com * são obrigatórios.
                </small>
              </div>

              <div className='gap-5'>
                <div className='flex gap-3 mb-5'>
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do cliente" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="second_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobrenome</FormLabel>
                          <FormControl>
                            <Input placeholder="Sobrenome do cliente" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="cliente@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className='flex'>
                  <div>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="83 98787-5808" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="birth_day"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Nascimento</FormLabel>
                          <FormControl>
                            {/* <Input placeholder="Sobrenome do cliente" {...field} /> */}
                            <DatePicker />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap'>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua dos bobos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="address_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input placeholder="56" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
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
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input placeholder="Portal dos Bosques" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="58433-795" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="PB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Campina Grande" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>  
      </CardContent>
    </Card>
  )
}
