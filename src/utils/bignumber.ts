import BigNumber from "bignumber.js";

export function byDecimals(
  number: number | BigNumber | string,
  tokenDecimals = 18,
  decimalPlaces = 18
) {
  const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
  return new BigNumber(number).dividedBy(decimals).decimalPlaces(decimalPlaces);
}

export function formatToFit(number: BigNumber) {
  if (number.isLessThan(new BigNumber(2))) {
    return number.decimalPlaces(12, BigNumber.ROUND_DOWN);
  } else if (number.isLessThan(new BigNumber(10000))) {
    return number.decimalPlaces(6, BigNumber.ROUND_DOWN);
  } else {
    return number.decimalPlaces(3, BigNumber.ROUND_DOWN);
  }
}
