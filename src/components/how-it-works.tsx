import { ChevronLeftRounded, CircleRounded } from "@mui/icons-material";
import {
  Box,
  Typography,
  Collapse,
  Stack,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function HowItWorks() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expandedSessionHowWorkds, setExpandedSessionHowWorkds] =
    useState(false);

  function expandHowWorkds() {
    setExpandedSessionHowWorkds((prevState) => !prevState);
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">{t("how_it_works")}</Typography>
        <ChevronLeftRounded
          sx={{
            fontSize: 28,
            rotate: expandedSessionHowWorkds ? "270deg" : "90deg",
          }}
          onClick={expandHowWorkds}
        />
      </Box>

      <Collapse in={expandedSessionHowWorkds}>
        {expandedSessionHowWorkds && (
          <Stack sx={{ mt: "1.25rem" }}>
            <Typography variant="h3" sx={{ mb: "0.625rem" }}>
              {t("simple_pix_payment_description")}
            </Typography>
            <Stack sx={{ gap: 1, alignItems: "flex-start" }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <CircleRounded
                    sx={{
                      fontSize: "0.375rem",
                      fill: theme.palette.common.black,
                    }}
                  />
                </ListItemIcon>
                <Typography variant="h4">
                  {t("copy_qr_code_instruction")}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <CircleRounded
                    sx={{
                      fontSize: "0.375rem",
                      fill: theme.palette.common.black,
                    }}
                  />
                </ListItemIcon>
                <Typography variant="h4">
                  {t("open_bank_app_instruction")}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <CircleRounded
                    sx={{
                      fontSize: "0.375rem",
                      fill: theme.palette.common.black,
                    }}
                  />
                </ListItemIcon>
                <Typography variant="h4">
                  {t("paste_link_instruction")}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <CircleRounded
                    sx={{
                      fontSize: "0.375rem",
                      fill: theme.palette.common.black,
                    }}
                  />
                </ListItemIcon>
                <Typography variant="h4">
                  {t("confirm_payment_instruction")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Collapse>
    </>
  );
}
