import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export function TagPix({ text }: { text: string }) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "absolute",
        px: "1.125rem",
        py: "0.25rem",
        display: "inline-block",
        transform: "translateY(-2.75rem)",
        borderRadius: 10,
        backgroundColor: theme.palette.text.disabled,
      }}
    >
      <Typography variant="h2" color="text.primary">
        {t(text)}
      </Typography>
    </Box>
  );
}
