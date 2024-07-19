import { Box, Button, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useNavigate } from "react-router-dom";
import { AmountContext } from "../context/amount-provider";
import { PaymentMadeModalPix } from "./payment-made-modal-pix";
import { useTranslation } from "react-i18next";

export function ButtonCopyPixKey() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [modalConfirmPayment, setModalConfirmPayment] = useState(false);
  const { selectedInstallment } = useContext(AmountContext);

  function handleCopy() {
    const valueCopy = "Me contrata 💕";
    navigator.clipboard.writeText(valueCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
      setModalConfirmPayment(true);

      setTimeout(() => {
        selectedInstallment > 1
          ? navigate("/credit")
          : navigate("/payment-made");
      }, 1500);
    }, 1000);
  }

  return (
    <Box sx={{ mt: "1.25rem" }}>
      <Button
        variant="contained"
        onClick={handleCopy}
        sx={{
          backgroundColor: `${theme.palette.secondary.main} !important`,
          color: theme.palette.common.white,
          fontSize: "1rem",
          gap: "0.625rem",
          textTransform: "none",
          width: "18rem",
          display: "flex",
          justifyContent: "center",
          ...(copied && {
            backgroundColor: theme.palette.primary.main,
          }),
        }}
      >
        {copied ? (
          t("feedback_text_copied")
        ) : (
          <>
            {t("click_copy_qrcode")}
            <FileCopyIcon
              sx={{ color: theme.palette.common.white, fontSize: 20 }}
            />
          </>
        )}
      </Button>

      {modalConfirmPayment && <PaymentMadeModalPix />}
    </Box>
  );
}
