import React from 'react';
import {Check as CheckIcon } from '@material-ui/icons';
import { isEmpty as  _isEmpty} from 'lodash';

export const GreenCheckIcon = () =>{ 
  return <CheckIcon style={{color:"Green"}}/>
}

export const isEmpty = (s) => {
  let str = s.trim()
  if(!str) return true
  return _isEmpty(str)
}
export const inputSanitize = (input) => {
  let result = input
  if (input){
    result = input.toLowerCase()
    // remove whitespace from both ends of the input
    result = result.trim()
  }
  
  return result;
}
/*
 * genericComparator: comparing row1 and row2 using the input keyName.
 * return: -1 if first string is lexicographically less than second property
 *          1 if first string is lexicographically greater than second property
 *          0 if both property are equal
 */
export function genericComparator(row1, row2, keyName) {
  const a =
    typeof row1[keyName] === 'string'
      ? row1[keyName].toLowerCase()
      : row1[keyName];
  const b =
    typeof row2[keyName] === 'string'
      ? row2[keyName].toLowerCase()
      : row2[keyName];

  return a < b ? -1 : a > b ? 1 : 0;
}

