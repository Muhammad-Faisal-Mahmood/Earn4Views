export function FourDecimalPoints(value) {
  return value !== null && value !== undefined && Number(value).toFixed(4);
}
