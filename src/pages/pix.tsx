import Stack from "@mui/material/Stack";
import { Header } from "../components/header";
import { useContext, useEffect } from "react";
import { AmountContext } from "../context/amount-provider";
import { formatCurrency } from "../helper/format-currency";
import { ButtonCopyPixKey } from "../components/button-copy-pix-key";
import { ImageQRCode } from "../components/image-qrcode";

import { Divider } from "@mui/material";

import { PaymentTermTime } from "../components/payment-term-time";
import { TimeLinePayment } from "../components/timeline-payment";
import { TotalAmount } from "../components/total-amount";
import { HowItWorks } from "../components/how-it-works";
import { IdentifierMessage } from "../components/identifier-message";
import { StorageService } from "../helper/local-storage";

export default function Pix() {
  const { selectedAmount, updateAmount, updateInstallment } =
    useContext(AmountContext);

  useEffect(() => {
    const storedSelectedAmount =
      StorageService.getItem<number>("selectedAmount");
    const storedSelectedInstallment = StorageService.getItem<number>(
      "selectedInstallment"
    );

    if (storedSelectedAmount !== null) {
      updateAmount(storedSelectedAmount);
    }

    if (storedSelectedInstallment !== null) {
      updateInstallment(storedSelectedInstallment);
    }
  }, [updateAmount, updateInstallment]);

  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Header
        title={{
          key: "header_pix_page",
          options: {
            amount: formatCurrency(selectedAmount),
          },
        }}
      />

      <ImageQRCode />

      <ButtonCopyPixKey />

      <PaymentTermTime />

      <TimeLinePayment />

      <Divider sx={{ my: "1.25rem", width: "100%" }} />

      <TotalAmount />

      <Divider sx={{ my: "1.25rem", width: "100%" }} />

      <HowItWorks />

      <Divider sx={{ my: "1.25rem", width: "100%" }} />

      <IdentifierMessage />
    </Stack>
  );
}
