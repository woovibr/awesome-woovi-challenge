import { createContext } from "react";

type Discount = {
  discount: string;
  message: string;
}

export type Installment = {
  times: number;
  amount: number;
  isChecked: boolean;
  cashBack?: Discount;
  total?: number;
  lowerInterest?: Discount;
}

type Payment = {
  source: string;
  value: number;
  installment?: Installment;
};

export type UserPayment = {
  name: string;
  payment: Payment;
};

export type CurrentPaymentStep = number;

export type PaymentContex = {
  user: UserPayment;
  setUser: React.Dispatch<React.SetStateAction<UserPayment>>;
  installments: Installment[];
  setInstallments: React.Dispatch<React.SetStateAction<Installment[]>>;
  currentPaymentStep: CurrentPaymentStep;
  setCurrentPaymentStep: React.Dispatch<React.SetStateAction<CurrentPaymentStep>>
  handleCurrentPaymentStep: (step: 0 | 1) => void;
};

export const initialPayment: UserPayment = {
  name: '',
  payment: {
    source: '',
    value: 0,
    installment: {
      amount: 0,
      isChecked: false,
      times: 1,
    }
  },
}

export const DefaultPaymentValues: PaymentContex = {
  user: initialPayment,
  setUser: () => {},
  installments: [],
  setInstallments: () => {},
  currentPaymentStep: 0,
  setCurrentPaymentStep: () => {},
  handleCurrentPaymentStep: () => {},
};

export const PaymentContex = createContext<PaymentContex>(DefaultPaymentValues);
