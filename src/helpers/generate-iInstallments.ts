import { Installment } from "../contexts/payment/context";

export const generateInstallments = (baseAmount: number): Installment[] => {

  const interests = [0, 0.33, 0.39, 1.31, 3.28, 3.94, 4.26];
  
  const installments: Installment[] = interests.map((interests, index) => {
    const times = index + 1;
    const total = baseAmount * (1 + interests / 100);
    const amount = total / times;

    const installment: Installment = {
      times,
      amount: parseFloat(amount.toFixed(2)),
      isChecked: false,
      total: parseFloat(total.toFixed(2)),
    };

    if (times === 1) {
      installment.cashBack = {
        discount: '3%',
        message: `🤑 R$ ${(baseAmount * 0.03).toFixed(2)} de volta no seu Pix na hora`,
      };
    }

    if (times === 4) {
      installment.lowerInterest = {
        discount: '-3%',
        message: 'Melhor opção de parcelamento',
      };
    }

    return installment;
  });

  return installments;
};
