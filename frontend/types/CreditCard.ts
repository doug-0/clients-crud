export type CreditCard = {
  cardholder_name: string,
  card_number: string,
  cardholder_document: string,
  expiration_date: string | undefined,
  cvv: string,
  client_id: number
}

export type EditCreditCard = {
  cardholder_name: string,
  card_number: string,
  cardholder_document: string,
  expiration_date: string | undefined,
  cvv: string,
  client_id: number,
  id: number
}