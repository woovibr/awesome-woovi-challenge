import { Stack, Typography } from "@mui/material";
import WooviLogo from "../assets/woovi.svg";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  title: {
    key: string;
    options?: Record<string, unknown> | undefined;
  };
}

export function Header({ title }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        alignItems: "center",
      }}
    >
      <img
        src={WooviLogo}
        style={{ width: "8rem", height: "2.375rem", flexShrink: 0 }}
        alt="Woovi Logo"
      />
      <Typography
        variant="h1"
        color="text.primary"
        sx={{
          mt: 5,
          mb: 4,
          textAlign: "center",
          lineHeight: "normal",
        }}
      >
        {t(title.key, title.options)}
      </Typography>
    </Stack>
  );
}
