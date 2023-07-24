import React from 'react';

const MoneyFormat = (money: string | number): string => {
  if(money == null) return '0.00'
  const value = typeof money === 'string' ? money : money.toString();
  const numericValue = value.replace(/[^0-9.]/g, '');

  // Format the numeric value as money (e.g., 1234.56 -> $1,234.56)
  return new Intl.NumberFormat('en-US').format(parseFloat(numericValue));
};

export default MoneyFormat;