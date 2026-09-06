export function formatPriceCents(cents: number, currency: string) {
  const amount = (cents / 100).toFixed(2).replace(/\.00$/, '');
  return `${currency} ${amount}`;
}
