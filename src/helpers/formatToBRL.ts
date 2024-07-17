export const formatToBRL = (amount: number): string => {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
