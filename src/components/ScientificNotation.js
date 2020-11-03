import React from 'react';

function ScientificNotation({ number }) {
  if (!number) return null;

  let [mantissa, exponent] = number.toString().split('e');

  mantissa = parseFloat(parseFloat(mantissa).toFixed(14));
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
