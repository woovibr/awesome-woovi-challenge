import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AmountContext } from "../context/amount-provider";
import { formatCurrency } from "../helper/format-currency";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CpfMask } from "../helper/cpf-mask";
import { DateMask } from "../helper/date-mask";
import { CardNumberMask } from "../helper/card-mask";
import { StorageService } from "../helper/local-storage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCreditCardPaymentSchema } from "../functions/useCreditCardPaymentSchema";

export function CreditCardPaymentForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedAmount, selectedInstallment, cetFee } =
    useContext(AmountContext);
  const [cpfMask, setCpfMask] = useState("");
  const [dateMask, setDateMask] = useState("");
  const [cardNumberMask, setCardNumberMask] = useState("");

  const [newInstallmentCardPayment, setNewInstallmentCardPayment] = useState(
    () => {
      const hasNewInstallmentCardPayment = StorageService.getItem<number>(
        "newInstallmentCardPayment"
      );
      return hasNewInstallmentCardPayment ? hasNewInstallmentCardPayment : 1;
    }
  );

  const creditCardPaymentSchema = useCreditCardPaymentSchema();

  type FormCreditCardPaymentForm = z.infer<typeof creditCardPaymentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreditCardPaymentForm>({
    resolver: zodResolver(creditCardPaymentSchema),
  });

  useEffect(() => {
    StorageService.setItem(
      "newInstallmentCardPayment",
      newInstallmentCardPayment
    );
  }, [newInstallmentCardPayment]);

  function onSubmit() {
    navigate("/payment-made");
  }

  function handleCpfChange(e: ChangeEvent<HTMLInputElement>) {
    setCpfMask(CpfMask(e.target.value));
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setDateMask(DateMask(e.target.value));
  }

  function handleCardNumberChange(e: ChangeEvent<HTMLInputElement>) {
    setCardNumberMask(CardNumberMask(e.target.value));
  }

  function handleChangeNewInstallment(e: SelectChangeEvent<number>) {
    setNewInstallmentCardPayment(Number(e.target.value));
    StorageService.setItem("newInstallmentCardPayment", Number(e.target.value));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <FormControl
      sx={{ width: "100%", gap: "1.75rem", maxWidth: "26.5rem" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("fullName")}
        label={t("label_form_complete_name")}
        variant="outlined"
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <TextField
        {...register("cpf")}
        label="CPF"
        variant="outlined"
        onChange={handleCpfChange}
        value={cpfMask}
        inputProps={{ maxLength: 14 }}
        error={!!errors.cpf}
        helperText={errors.cpf?.message}
      />

      <TextField
        {...register("cardNumber")}
        label={t("label_form_card_number")}
        variant="outlined"
        onChange={handleCardNumberChange}
        value={cardNumberMask}
        inputProps={{ maxLength: 19 }}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber?.message}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1.375rem",
        }}
      >
        <TextField
          {...register("expirationDate")}
          label={t("label_form_expiration_date")}
          variant="outlined"
          onChange={handleDateChange}
          value={dateMask}
          error={!!errors.expirationDate}
          helperText={errors.expirationDate?.message}
        />

        <TextField
          {...register("cvv")}
          label="CVV"
          variant="outlined"
          inputProps={{ maxLength: 3 }}
          error={!!errors.cvv}
          helperText={errors.cvv?.message}
        />
      </Box>

      <FormControl>
        <InputLabel id="installment">{t("label_form_installments")}</InputLabel>

        <Select
          {...register("installment")}
          id="installment"
          label={t("label_form_installments")}
          value={newInstallmentCardPayment}
          error={!!errors.installment}
          onChange={handleChangeNewInstallment}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <MenuItem key={index} value={index + 1}>
              {t("label_form_select_installment", {
                installment: index + 1,
                amount: formatCurrency(
                  (((selectedInstallment * selectedAmount) / 1 -
                    (selectedInstallment * selectedAmount) /
                      selectedInstallment) /
                    (index + 1)) *
                    (1 + cetFee)
                ),
              })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.common.white,
          fontSize: "0.875rem",
          borderRadius: "8px",
        }}
      >
        {t("button_form_submit")}
      </Button>
    </FormControl>
  );
}
