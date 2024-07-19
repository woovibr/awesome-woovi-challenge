import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface TagProps {
  textBold: {
    key: string;
    options?: Record<string, unknown> | undefined;
  };
  text: string;
}

export function Tag({ text, textBold }: TagProps) {
  const { t } = useTranslation();
  const formattedTextBold =
    typeof textBold === "object"
      ? t(textBold.key, textBold.options)
      : t(textBold);

  return (
    <Box
      sx={{
        width: "100%",
        pl: "0.5rem",
        py: 0.7,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <img
        src="https://iili.io/dBYpQM7.png"
        alt="tag"
        style={{
          height: "32px",
          position: "absolute",
          zIndex: 0,
          flex: 1,
          width: "100%",
          left: 0,
        }}
      />
      <Box sx={{ display: "flex", width: "100%", gap: "0.4rem" }}>
        <Typography
          variant="h3"
          color="common.white"
          sx={{
            textAlign: "left",
            fontWeight: 600,
            whiteSpace: "nowrap",
            zIndex: 1,
          }}
        >
          {formattedTextBold}
        </Typography>
        <Typography
          variant="h3"
          color="common.white"
          sx={{
            width: "15rem",
            mr: "1.875rem",
            textAlign: "left",
            fontWeight: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            zIndex: 1,
          }}
        >
          {t(text)}
        </Typography>
      </Box>
    </Box>
  );
}
