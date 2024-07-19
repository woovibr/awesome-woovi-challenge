export function CalcCetFee(amount: number, cetFee: number) {
  const cetFeeAmountCalculated = amount * (1 + cetFee);
  return cetFeeAmountCalculated;
}
