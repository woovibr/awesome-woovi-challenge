import { useTranslation } from "react-i18next";
import { z } from "zod";

export function useCreditCardPaymentSchema() {
  const { t } = useTranslation();

  return z.object({
    fullName: z.string().min(2, { message: t("validation_fullName") }),
    cpf: z.string().min(14, { message: t("validation_cpf") }),
    cardNumber: z.string().min(19, { message: t("validation_card_number") }),
    expirationDate: z
      .string()
      .min(7, { message: t("validation_expiration_date") }),
    cvv: z.string().min(3, { message: t("validation_cvv") }),
    installment: z.number(),
  });
}
