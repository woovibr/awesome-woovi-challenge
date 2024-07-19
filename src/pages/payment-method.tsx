import Stack from "@mui/material/Stack";

import { Header } from "../components/header";
import { SelectInstallments } from "../components/select-installments";

export default function PaymentMethod() {
  return (
    <Stack
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Header
        title={{
          key: "header_payment_method_page",
          options: {
            amount: null,
          },
        }}
      />

      <SelectInstallments />
    </Stack>
  );
}
