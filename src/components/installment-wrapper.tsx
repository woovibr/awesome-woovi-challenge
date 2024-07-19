import { Stack, useTheme } from "@mui/material";
import React from "react";

interface InstallmentWrapperProps {
  index: number;
  selectedInstallment: number;
  installmentLength: number;
  children: React.ReactNode;
  onClick: () => void;
}
export function InstallmentWrapper({
  index,
  selectedInstallment,
  installmentLength,
  children,
  onClick,
}: InstallmentWrapperProps) {
  const theme = useTheme();

  return (
    <Stack
      onClick={onClick}
      sx={{
        position: "relative",
        cursor: "pointer",
        alignItems: "start",
        gap: "0.5rem",
        zIndex: 1,
        border: 2,
        borderColor: theme.palette.text.disabled,
        backgroundColor: theme.palette.common.white,
        width: "100%",
        p: "1.75rem 1.25rem 1.5rem 1.25rem",
        height: "100%",
        mb: "-2px",
        ...(selectedInstallment === index + 1 && {
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.primary.main,
          zIndex: 2,
        }),
        ...(index === 1 && {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }),
        ...(index === installmentLength - 1 && {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          mb: 0,
        }),
      }}
    >
      {children}
    </Stack>
  );
}
