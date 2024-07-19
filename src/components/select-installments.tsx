import { Box, Radio, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { AmountContext } from "../context/amount-provider";
import { formatCurrency } from "../helper/format-currency";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { InstallmentWrapper } from "./installment-wrapper";
import { Tag } from "./tag";
import { TagPix } from "./tag-pix";
import { FirstInstallmentWrapper } from "./first-installment-wrapper";
import { ConfirmationModal } from "./confirmation-modal";
import { useTranslation } from "react-i18next";

export function SelectInstallments() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const {
    totalAmount,
    installments,
    updateInstallment,
    updateAmount,
    selectedInstallment,
    interestRate,
  } = useContext(AmountContext);

  function handleRadioChange(numInstallments: number, selectedAmount: number) {
    updateInstallment(numInstallments);
    updateAmount(selectedAmount);

    openConfirmationModal();
  }

  function openConfirmationModal() {
    setIsConfirmationModalOpen(true);
  }

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {installments.map((installment, index) => (
          <Stack key={index}>
            {installment.numInstallments === 1 ? (
              <FirstInstallmentWrapper
                installment={installment}
                selectedInstallment={selectedInstallment}
                onClick={() =>
                  handleRadioChange(
                    installment.numInstallments,
                    installment.amount
                  )
                }
              >
                <TagPix text="Pix" />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Typography variant="h1" color="text.primary">
                        {installment.numInstallments}x
                      </Typography>
                      <Typography
                        variant="h1"
                        color="text.primary"
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {formatCurrency(totalAmount)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="h3"
                        color="primary.main"
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {t("cashback")}
                      </Typography>
                    </Box>
                  </Box>

                  <Radio
                    checked={
                      selectedInstallment === installment.numInstallments
                    }
                    checkedIcon={
                      <CheckCircleIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    }
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: theme.palette.primary.main,
                        fontSize: 28,
                      },
                      padding: 0,
                    }}
                  />
                </Box>

                <Tag
                  textBold={{
                    key: "amount_back_on_pix_value",
                    options: {
                      amount_back: formatCurrency(totalAmount * interestRate),
                    },
                  }}
                  text={"amount_back_on_pix"}
                />
              </FirstInstallmentWrapper>
            ) : (
              <InstallmentWrapper
                index={index}
                selectedInstallment={selectedInstallment}
                installmentLength={installments.length}
                onClick={() =>
                  handleRadioChange(
                    installment.numInstallments,
                    installment.amount
                  )
                }
              >
                {installment.numInstallments === 2 && (
                  <TagPix text={"pix_installments"} />
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                    width: "100%",
                    flex: 1,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Typography variant="h1" color="text.primary">
                        {installment.numInstallments}x
                      </Typography>

                      <Typography
                        variant="h1"
                        color="text.primary"
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {formatCurrency(installment.amount)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Typography variant="h3" color="text.secondary">
                        Total:{" "}
                        {installment.numInstallments === 4
                          ? formatCurrency(
                              (installment.amount - installment.amount * 0.03) *
                                installment.numInstallments
                            )
                          : formatCurrency(
                              installment.amount * installment.numInstallments
                            )}
                      </Typography>
                    </Box>
                  </Box>

                  <Radio
                    checked={
                      selectedInstallment === installment.numInstallments
                    }
                    checkedIcon={<CheckCircleIcon />}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: theme.palette.primary.main,
                      },
                      padding: 0,
                    }}
                  />
                </Box>

                {installment.numInstallments === 4 && (
                  <Tag
                    textBold={{
                      key: "best_installment_option_bold",
                      options: {
                        amount_back: null,
                      },
                    }}
                    text={"best_installment_option"}
                  />
                )}
              </InstallmentWrapper>
            )}
          </Stack>
        ))}
      </Stack>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        />
      )}
    </>
  );
}
