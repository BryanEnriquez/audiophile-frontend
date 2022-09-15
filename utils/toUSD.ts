const usd = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  currency: 'USD',
  maximumFractionDigits: 2,
});

export const toUSD = (n: number) => `$ ${usd.format(n / 100)}`;
