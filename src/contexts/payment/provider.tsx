import { ReactNode, useEffect, useState } from "react";
import { CurrentPaymentStep, initialPayment, Installment, PaymentContex, UserPayment } from "./context";
type Props = {
  children: ReactNode;
};


export const PaymentProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserPayment>(initialPayment);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [currentPaymentStep, setCurrentPaymentStep] = useState<CurrentPaymentStep>(0);  

  const handleCurrentPaymentStep = (step: 0 | 1) => {
    setCurrentPaymentStep(step)
  }

  useEffect(() => {
    handleCurrentPaymentStep(0)
  }, [user.payment.installment?.times]);

  const providerValues: PaymentContex = {
    user, setUser,
    installments, setInstallments,
    currentPaymentStep, setCurrentPaymentStep,
    handleCurrentPaymentStep,
  };

  return (
    <PaymentContex.Provider value={providerValues}>
      {children}
    </PaymentContex.Provider>
  );
};
