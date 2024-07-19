import { Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export function IdentifierMessage() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Stack sx={{ mt: "1.25rem", mb: "1.25rem", alignItems: "center" }}>
      <Typography
        variant="h3"
        color={theme.palette.info.main}
        sx={{ fontWeight: 500 }}
      >
        {t("identifier")}
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: 800 }}
        color={theme.palette.text.primary}
      >
        2c1b951f356c4680b13ba1c9fc889c47
      </Typography>
    </Stack>
  );
}
