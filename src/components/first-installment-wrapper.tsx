import { Stack, useTheme } from "@mui/material";

interface FirstInstallmentWrapperProps {
  selectedInstallment: number;
  installment: { numInstallments: number; amount: number };
  children: React.ReactNode;
  onClick: () => void;
}
export function FirstInstallmentWrapper({
  selectedInstallment,
  installment,
  children,
  onClick,
}: FirstInstallmentWrapperProps) {
  const theme = useTheme();
  return (
    <Stack
      onClick={onClick}
      sx={{
        gap: "0.5rem",
        cursor: "pointer",
        position: "relative",
        border: 2,
        borderRadius: 2,
        borderColor: theme.palette.text.disabled,
        backgroundColor: theme.palette.common.white,
        width: "100%",
        p: "1.75rem 1.25rem 1.5rem 1.25rem",
        mb: "2.25rem",
        ...(selectedInstallment === installment.numInstallments && {
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
        }),
      }}
    >
      {children}
    </Stack>
  );
}
