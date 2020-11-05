import React from 'react';

import { decimalPlaces } from '../constants';

function ScientificNotation({ number }) {
  if (!number) return null;

  let [mantissa, exponent] = number.toExponential().split('e');

  mantissa = parseFloat(parseFloat(mantissa).toFixed(decimalPlaces));
  exponent = exponent.charAt(0) === '+' ? exponent.slice(1) : exponent;

  return (
    <>
      {mantissa}
      {exponent && <>&times;10</>}
      {exponent && <sup>{exponent}</sup>}
    </>
  );
}

export default ScientificNotation;
