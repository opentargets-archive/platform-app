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