import { Stack, useTheme } from "@mui/material";

export function ImageQRCode() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        border: 2,
        borderColor: theme.palette.primary.main,
        borderRadius: ".5rem",
        padding: ".375rem",
        width: "20.5rem",
        height: "20.5rem",
      }}
    >
      <img src="https://iili.io/dBaHd41.png" alt="qrcode" />
    </Stack>
  );
}
