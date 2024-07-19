import React, { createContext, useEffect, useState } from "react";
import { StorageService } from "../helper/local-storage";

interface AmountContextType {
  totalAmount: number;
  selectedAmount: number;
  totalDebits: number;
  setTotalAmount: (totalAmount: number) => void;
  updateAmount: (newAmountSelected: number) => void;
  selectedInstallment: number;
  updateInstallment: (newInstallmentSelected: number) => void;
  addNewPaymentAmount: (
    type: string,
    amount: number,
    installment: number
  ) => void;
  updateTotalDebit: (newTotal: number) => void;
  paymentInfo: PaymentInfoProps;
  installments: {
    numInstallments: number;
    amount: number;
  }[];
  interestRate: number;
  cetFee: number;
}

interface PaymentInfoProps {
  totalDebit: number;
  paymentMethods: { type: string; amount: number; installment: number }[];
}

const AmountContext = createContext<AmountContextType>({} as AmountContextType);

const AmountProvider = ({ children }: { children: React.ReactNode }) => {
  const installmentsQty = 7;
  const interestRate = 0.03;
  const cetFee = 0.005;

  const [totalAmount, setTotalAmount] = useState<number>(() => {
    const storedAmount = StorageService.getItem<number>("totalAmount");
    return storedAmount ? storedAmount : 0;
  });

  useEffect(() => {
    StorageService.setItem("totalAmount", totalAmount);
  }, [totalAmount]);

  const installments = Array.from({ length: installmentsQty }, (_, index) => {
    const numInstallments = index + 1;
    const installmentAmount = calculateInstallmentRate(
      totalAmount,
      numInstallments
    );

    return { numInstallments, amount: installmentAmount };
  });

  const [selectedInstallment, setSelectedInstallment] = useState(() => {
    const savedValue = StorageService.getItem<number>("selectedInstallment");
    return savedValue ? savedValue : 1;
  });

  const [selectedAmount, setSelectedAmount] = useState(() => {
    const savedValue = StorageService.getItem<number>("selectedAmount");
    return savedValue ? savedValue : totalAmount;
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoProps>({
    totalDebit: totalAmount,
    paymentMethods: [],
  });

  const [totalDebits, setTotalDebits] = useState<number>(() => {
    const savedNewDebit = StorageService.getItem<number>("newTotalDebits");
    return savedNewDebit ? savedNewDebit : 0;
  });

  function calculateInstallmentRate(
    totalAmount: number,
    installments: number
  ): number {
    if (installments === 1) {
      return totalAmount;
    } else if (installments === 4) {
      const totalWithInterest = totalAmount * (1 + interestRate * installments);
      const installmentAmount = totalWithInterest / installments;
      const installmentWithDiscount =
        installmentAmount - installmentAmount * interestRate;
      return Number(installmentWithDiscount.toFixed(2));
    } else {
      const totalWithInterest = totalAmount * (1 + interestRate * installments);
      const installmentAmount = totalWithInterest / installments;
      return Number(installmentAmount.toFixed(2));
    }
  }

  function updateAmount(newAmountSelected: number) {
    StorageService.setItem("selectedAmount", newAmountSelected);
    setSelectedAmount(newAmountSelected);
  }

  function updateInstallment(newInstallmentSelected: number) {
    StorageService.setItem("selectedInstallment", newInstallmentSelected);
    setSelectedInstallment(newInstallmentSelected);
  }

  function updateTotalDebit(newTotalDebit: number) {
    StorageService.setItem("newTotalDebits", newTotalDebit);
    setTotalDebits(newTotalDebit);
    setPaymentInfo((prevPaymentInfo) => ({
      ...prevPaymentInfo,
      totalDebit: newTotalDebit,
    }));
  }

  function addNewPaymentAmount(
    type: string,
    amount: number,
    installment: number
  ) {
    const newPaymentMethod = {
      type,
      amount,
      installment,
    };

    const updatedPaymentMethods = [
      ...paymentInfo.paymentMethods,
      newPaymentMethod,
    ];

    const restAmount = selectedAmount - amount;

    if (restAmount > 0) {
      const cardPaymentMethod = {
        type: "credit",
        amount: restAmount,
        installment: selectedInstallment - 1,
      };
      updatedPaymentMethods.push(cardPaymentMethod);
    }

    setPaymentInfo((prevPaymentInfo) => ({
      ...prevPaymentInfo,
      paymentMethods: updatedPaymentMethods,
    }));
  }

  return (
    <AmountContext.Provider
      value={{
        setTotalAmount,
        selectedAmount,
        updateAmount,
        totalDebits,
        selectedInstallment,
        updateInstallment,
        totalAmount,
        addNewPaymentAmount,
        updateTotalDebit,
        paymentInfo,
        installments,
        interestRate,
        cetFee,
      }}
    >
      {children}
    </AmountContext.Provider>
  );
};

export { AmountContext, AmountProvider };
