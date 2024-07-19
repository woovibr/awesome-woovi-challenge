import { Stack, Box, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StorageService } from "../helper/local-storage";
import { formatCurrency } from "../helper/format-currency";
import { useTranslation } from "react-i18next";

export function PaymentMadeModalPix() {
  const theme = useTheme();
  const { t } = useTranslation();
  const totalAmountPaymedPix = StorageService.getItem("selectedAmount")
    ? StorageService.getItem("selectedAmount")
    : StorageService.getItem("totalAmount");

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
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <CheckCircleIcon
          sx={{ fontSize: "10rem", color: theme.palette.primary.main }}
        />
        <Typography
          variant="h1"
          sx={{ color: theme.palette.text.primary, textAlign: "center" }}
        >
          {t("payment_made_modal_text", {
            amount: formatCurrency(Number(totalAmountPaymedPix)),
          })}
        </Typography>
      </Box>
    </Stack>
  );
}
