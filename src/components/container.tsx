import { Button, Stack } from "@mui/material";
import { MessageSecurityPayment } from "./message-security-payment";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ChangeLanguageContext } from "../context/change-language-provider";
import TranslateIcon from "@mui/icons-material/Translate";
import { t } from "i18next";

export function Container() {
  const { handleChangeLanguage } = useContext(ChangeLanguageContext);
  return (
    <Stack
      sx={{
        py: 4.5,
        px: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "25rem",
        margin: "auto",
      }}
    >
      <Button
        sx={{
          display: "inline-flex",
          gap: "0.5rem",
        }}
        onClick={handleChangeLanguage}
        title={t("change_language")}
      >
        <TranslateIcon />
        {t("change_language")}
      </Button>
      <Outlet />
      <MessageSecurityPayment />
    </Stack>
  );
}
