import { useContext } from "react";
import { PaymentContex } from "./context"

export const usePaymentContex = () => {
  const context = useContext(PaymentContex);

  if (!context) {
    throw new Error(
      'usePaymentContex must be used in a PaymentProvider'
    );
  };

  return context;
};