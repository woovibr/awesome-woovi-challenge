import { Box, Card, CardContent, Typography } from "@mui/material";
import { formatCurrency } from "../helper/format-currency";
import { StorageService } from "../helper/local-storage";
import { HelpOutline } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AmountContext } from "../context/amount-provider";
import { useLocation } from "react-router-dom";
import { CalcCetFee } from "../helper/calc-cet-fee";
import { useTranslation } from "react-i18next";

export function TotalAmount() {
  const { getItem } = StorageService;
  const location = useLocation();
  const { t } = useTranslation();
  const { cetFee } = useContext(AmountContext);
  const newTotalDebits = getItem<number>("newTotalDebits");
  const selectedAmount = getItem<number>("selectedAmount");
  const [helpIsOpen, setHelpIsOpen] = useState(false);

  function mouseHoverHelp() {
    setHelpIsOpen(true);
  }

  function mouseLeaveHelp() {
    setHelpIsOpen(false);
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
      >
        CET: 0,5%
        <HelpOutline
          sx={{ fontSize: 16 }}
          onMouseOver={mouseHoverHelp}
          onMouseLeave={mouseLeaveHelp}
        />
      </Typography>
      {helpIsOpen && (
        <Card
          sx={{
            minWidth: 275,
            position: "absolute",
            top: "1.5rem",
            maxWidth: "10rem",
          }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Typography variant="h4" component="div">
              {t("about_cet")}
            </Typography>
            <Typography variant="h4">{t("why_was_cet_applied")}</Typography>
          </CardContent>
        </Card>
      )}
      <Typography variant="h2" sx={{ fontWeight: 400 }}>
        {location.pathname === "/credit"
          ? formatCurrency(
              CalcCetFee(
                Number(newTotalDebits) - Number(selectedAmount),
                cetFee
              )
            )
          : formatCurrency(Number(newTotalDebits))}
      </Typography>
    </Box>
  );
}
