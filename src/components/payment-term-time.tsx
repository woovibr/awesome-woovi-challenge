import { useEffect, useState } from "react";
import { formatEndTime } from "../helper/format-end-time";
import { formatTime } from "../helper/format-time";
import { calculateEndTime } from "../helper/calculate-end-time";
import { LinearProgress, Stack, Typography, useTheme } from "@mui/material";
import { calculateProgress } from "../helper/calculate-progress";
import { useTranslation } from "react-i18next";

export function PaymentTermTime() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(300);
  const [endTime] = useState(calculateEndTime());

  useEffect(() => {
    document.body.style.overflow = "auto";

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Stack sx={{ mt: "1.25rem", textAlign: "center" }}>
      <Typography
        variant="h3"
        color={theme.palette.info.main}
        sx={{ fontWeight: 400 }}
      >
        {t("payment_term_text")}
      </Typography>
      <Typography variant="h3" color={theme.palette.text.primary}>
        {formatEndTime(endTime)} - {formatTime(timeLeft)}
      </Typography>
      <LinearProgress
        sx={{ transform: "rotateX(180deg)" }}
        variant="determinate"
        value={calculateProgress(timeLeft)}
      />
    </Stack>
  );
}
