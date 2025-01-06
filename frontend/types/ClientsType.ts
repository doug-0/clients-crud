export type Client =  {
  address: string | null,
  address_complement: string | null,
  address_number: string | null,
  cep: string | null,
  city: string | null,
  email: string | null,
  id: number,
  name: string | null,
  neighborhood: string | null,
  state: string | null,
  phone: string | null,
  user_id: number | null,
  create_at: string | null,
  updated_at: string | null,
}

export type LoggedUser =  {
  name: string,
  email: string
}

export type newClient = {
  name: string,
  second_name: string,
  email: string,
  birth_day: Date | null,
  address: string,
  address_number: string,
  neighborhood: string,
  cep: string,
  state: string,
  city: string,
  phone: string,
  address_complement?: string | undefined
}