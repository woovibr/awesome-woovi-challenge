import { ErrorOutline } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <Stack
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">Oops!</Typography>
      <Typography
        variant="h3"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <ErrorOutline sx={{ fontSize: 20 }} /> Página não encontrada
      </Typography>
    </Stack>
  );
}
