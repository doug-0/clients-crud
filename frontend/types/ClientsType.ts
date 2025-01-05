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