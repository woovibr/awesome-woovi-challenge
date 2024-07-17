import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentContex } from "../../contexts/payment";
import { generateInstallments } from "../../helpers/generate-iInstallments";
import { Cards } from "./cards";

export const PaymentMethodPage = () => {
  const { user, setUser, setInstallments, installments } = usePaymentContex();
  const navigate = useNavigate();

  useEffect(() => {
    setInstallments(generateInstallments(user.payment.value))
  }, []);

  const navigateToPaymentPage = () => {
    navigate('/pix+credit-card')
  };

  const handleChecked = (index: number) => {
    setInstallments((prevInstallments) => 
      prevInstallments.map((installment, i) => i === index
        ? { ...installment, isChecked: true }
        : { ...installment, isChecked: false }
      )
    );

    setUser((prevUser) => {
      const prevPayment = prevUser.payment;

      return {
        ...prevUser,
        payment: {
          ...prevPayment,
          installment: installments[index]
        }
      }
    })
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center flex-col gap-2 w-full xs:w-[464px]">

        <span className="text-xl font-extrabold text-[#4D4D4D] mb-4">{user.name}, como você quer pagar?</span>
          
        <Cards
          handleChecked={handleChecked}
          navigateToPaymentPage={navigateToPaymentPage}
        />

      </div>
    </div>
  )
}