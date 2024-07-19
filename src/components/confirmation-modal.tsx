import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { formatCurrency } from "../helper/format-currency";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AmountContext } from "../context/amount-provider";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  setIsConfirmationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ConfirmationModal({
  setIsConfirmationModalOpen,
}: ConfirmationModalProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    selectedAmount,
    selectedInstallment,
    updateTotalDebit,
    addNewPaymentAmount,
  } = useContext(AmountContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  function handleCancel() {
    document.body.style.overflow = "auto";
    setIsConfirmationModalOpen(false);
  }

  function handleConfirm() {
    document.body.style.overflow = "hidden";
    updateTotalDebit(selectedAmount * selectedInstallment);
    addNewPaymentAmount("pix", selectedAmount, 1);
    setIsConfirmationModalOpen(false);
    navigate("/pix");
  }

  return (
    <Stack
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundopacity: "0.6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "modal",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "26.5rem",
          backgroundColor: theme.palette.common.white,
          padding: "1.25rem",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 0.6,
          }}
        >
          <Typography
            variant="h2"
            color="text.primary"
            sx={{ display: "inline-flex" }}
          >
            {t("modal_confirmation_text", {
              installment: selectedInstallment,
              amount: formatCurrency(selectedAmount),
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              fontSize: "0.875rem",
            }}
            onClick={handleCancel}
          >
            {t("modal_cancel_button")}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.common.white,
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
          >
            {t("modal_confirm_button")}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
