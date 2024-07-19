import { useTranslation } from "react-i18next";
import { z } from "zod";

export function useInputAmountSchema() {
  const { t } = useTranslation();

  return z.object({
    amount: z
      .string()
      .min(1, { message: t("validation_amount_root_page") })
      .max(13),
  });
}
