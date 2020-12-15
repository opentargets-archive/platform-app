import React from 'react';

import { decimalPlaces } from '../constants';

function ScientificNotation({ number }) {
  if (!number) return null;

  let mantissa, exponent;

  if (Array.isArray(number)) {
    [mantissa, exponent] = number;
  } else {
    [mantissa, exponent] = number.toExponential().split('e');
    exponent = exponent.charAt(0) === '+' ? exponent.slice(1) : exponent;
  }

  mantissa = parseFloat(parseFloat(mantissa).toFixed(decimalPlaces));

  return (
    <>
      {mantissa}
      {exponent && <>&times;10</>}
      {exponent && <sup>{exponent}</sup>}
    </>
  );
}

export default ScientificNotation;
