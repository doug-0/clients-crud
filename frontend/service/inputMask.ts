export const maskPhone = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2');
};

export const maskCEP = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 9;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
};

export const maskCPF = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskCardNumber = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 19;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '') 
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d{1,2})/, '$1 $2')
    .replace(/(\d{4})(\d{1,3})/, '$1 $2')
    .replace(/(\d{4})(\d{1,3})/, '$1 $2')
};

export const maskCVV = (event: React.FormEvent<HTMLInputElement>) => {
  const { value } = event.currentTarget;

  return value.replace(/\D/g, '').slice(0, 3);
};

export type MaskTypes = 'phone' | 'cep' | 'cpf' | 'card' | 'cvv';

type Masks = Record<
  MaskTypes,
  (event: React.FormEvent<HTMLInputElement>) => string
>;

const masks: Masks = {
  phone: maskPhone,
  cep: maskCEP,
  cpf: maskCPF,
  card: maskCardNumber,
  cvv: maskCVV
};

export default masks;