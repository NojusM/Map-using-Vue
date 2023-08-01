export default function truncateFloat(number: number, decimalPlaces: number): number {
    const factor = 10 ** decimalPlaces;
    return Math.trunc(number * factor) / factor;
  }